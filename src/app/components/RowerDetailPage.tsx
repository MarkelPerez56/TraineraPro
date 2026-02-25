import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Plus,
  Loader2,
  Calendar,
  Weight,
  Zap,
  Clock,
  Dumbbell,
  Search,
  Scale,
  TrendingUp,
  TrendingDown,
  Ruler,
  Gauge,
} from 'lucide-react';
import { toast } from 'sonner';
import { RowerDialog } from './RowerDialog';
import { TrainingDialog } from './TrainingDialog';
import { Input } from './ui/input';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { Rower, RowerFormData, ErgTraining, ErgSeries } from '../types/rower';

const sideLabels: Record<string, string> = {
  babor: 'Babor',
  estribor: 'Estribor',
  ambos: 'Ambos',
};

interface WeightEntry {
  id: string;
  date: string;
  weight: number;
}

function getWeightForDate(
  weightEntries: WeightEntry[],
  trainingDate: string
): number | null {
  let result: number | null = null;
  for (const entry of weightEntries) {
    if (entry.date <= trainingDate) {
      result = entry.weight;
    } else {
      break;
    }
  }
  return result;
}

export function RowerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [rower, setRower] = useState<Rower | null>(null);
  const [trainings, setTrainings] = useState<ErgTraining[]>([]);
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [trainingDialogOpen, setTrainingDialogOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState<ErgTraining | null>(null);
  const [deleteTraining, setDeleteTraining] = useState<ErgTraining | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user && id) {
      loadRower();
      loadTrainings();
      loadWeightEntries();
    }
  }, [user, id]);

  const loadRower = async () => {
    if (!user || !id) return;
    const { data, error } = await supabase
      .from('rowers')
      .select('*')
      .eq('id', id)
      .eq('coach_id', user.id)
      .single();

    if (error || !data) {
      toast.error('Remero no encontrado');
      navigate('/dashboard/rowers');
      return;
    }
    setRower(data);
    setIsLoading(false);
  };

  const loadTrainings = async () => {
    if (!user || !id) return;
    const { data, error } = await supabase
      .from('erg_trainings')
      .select('*')
      .eq('rower_id', id)
      .eq('coach_id', user.id)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error loading trainings:', error);
    } else {
      setTrainings(data ?? []);
    }
  };

  const loadWeightEntries = async () => {
    if (!user || !id) return;
    const { data, error } = await supabase
      .from('weight_entries')
      .select('id, date, weight')
      .eq('rower_id', id)
      .eq('coach_id', user.id)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error loading weight entries:', error);
    } else {
      setWeightEntries(data ?? []);
    }
  };

  const handleSaveRower = async (formData: RowerFormData) => {
    if (!user || !rower) return;
    const { error } = await supabase
      .from('rowers')
      .update({ ...formData, updated_at: new Date().toISOString() })
      .eq('id', rower.id)
      .eq('coach_id', user.id);

    if (error) {
      toast.error('Error al actualizar remero');
    } else {
      toast.success('Remero actualizado');
      await loadRower();
    }
  };

  const handleSaveTraining = async (data: {
    rower_id: string;
    date: string;
    notes: string;
    series: ErgSeries[];
  }) => {
    if (!user) return;

    if (editingTraining) {
      const { error } = await supabase
        .from('erg_trainings')
        .update({
          date: data.date,
          title: '',
          notes: data.notes,
          series: data.series,
        })
        .eq('id', editingTraining.id)
        .eq('coach_id', user.id);

      if (error) {
        toast.error('Error al actualizar entrenamiento');
        console.error(error);
      } else {
        toast.success('Entrenamiento actualizado');
      }
    } else {
      const { error } = await supabase.from('erg_trainings').insert({
        ...data,
        title: '',
        coach_id: user.id,
      });

      if (error) {
        toast.error('Error al crear entrenamiento');
        console.error(error);
      } else {
        toast.success('Entrenamiento registrado');
      }
    }

    setEditingTraining(null);
    await loadTrainings();
  };

  const handleDeleteTraining = async () => {
    if (!deleteTraining || !user) return;
    const { error } = await supabase
      .from('erg_trainings')
      .delete()
      .eq('id', deleteTraining.id)
      .eq('coach_id', user.id);

    if (error) {
      toast.error('Error al eliminar entrenamiento');
    } else {
      toast.success('Entrenamiento eliminado');
      await loadTrainings();
    }
    setDeleteTraining(null);
  };

  const computeWkg = (watts: number, trainingDate: string): string | null => {
    if (watts <= 0) return null;
    const w = getWeightForDate(weightEntries, trainingDate);
    if (!w || w <= 0) return null;
    return (watts / w).toFixed(2);
  };

  // Weight chart data (ascending)
  const weightChartData = useMemo(() => {
    return weightEntries.map((e) => ({
      date: new Date(e.date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
      }),
      peso: e.weight,
    }));
  }, [weightEntries]);

  // Weight stats
  const weightStats = useMemo(() => {
    if (weightEntries.length === 0) return null;
    const weights = weightEntries.map((e) => e.weight);
    const latest = weightEntries[weightEntries.length - 1]?.weight ?? 0;
    const min = Math.min(...weights);
    const max = Math.max(...weights);
    return { latest, min, max, count: weightEntries.length };
  }, [weightEntries]);

  // Weight history (descending for display)
  const weightHistoryDesc = useMemo(() => {
    return [...weightEntries].reverse();
  }, [weightEntries]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!rower) return null;

  // Training stats
  const totalTrainings = trainings.length;
  const allSeriesWithDate = trainings.flatMap((t) =>
    (t.series ?? []).map((s) => ({ ...s, date: t.date }))
  );
  const seriesWithWatts = allSeriesWithDate.filter((s) => s.watts > 0);
  const avgWatts =
    seriesWithWatts.length > 0
      ? Math.round(seriesWithWatts.reduce((sum, s) => sum + s.watts, 0) / seriesWithWatts.length)
      : 0;
  const totalMinutes = allSeriesWithDate.reduce((sum, s) => sum + (s.minutes ?? 0), 0);

  const wkgValues = seriesWithWatts
    .map((s) => {
      const w = getWeightForDate(weightEntries, s.date);
      return w && w > 0 ? s.watts / w : null;
    })
    .filter((v): v is number => v !== null);
  const avgWkg =
    wkgValues.length > 0
      ? (wkgValues.reduce((sum, v) => sum + v, 0) / wkgValues.length).toFixed(2)
      : null;

  const filteredTrainings = trainings.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const dateStr = new Date(t.date)
      .toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
      .toLowerCase();
    return dateStr.includes(q) || t.date.includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard/rowers')}
          className="mb-3 -ml-2 gap-1 text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la plantilla
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              {rower.first_name.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h1>{rower.first_name}</h1>
            <div
              className="flex items-center gap-4 mt-1 text-muted-foreground flex-wrap"
              style={{ fontSize: '0.875rem' }}
            >
              {rower.age != null && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {rower.age} anos
                </span>
              )}
              {rower.weight && (
                <span className="flex items-center gap-1">
                  <Weight className="w-3.5 h-3.5" />
                  {rower.weight} kg
                </span>
              )}
              {rower.side && <span>Lado: {sideLabels[rower.side]}</span>}
            </div>
          </div>
          <Button variant="outline" onClick={() => setEditDialogOpen(true)}>
            <Pencil className="w-4 h-4 mr-2" />
            Editar
          </Button>
        </div>
      </div>

      {/* Ergo Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1" style={{ fontSize: '0.75rem' }}>
              <Dumbbell className="w-3.5 h-3.5" />
              Entrenamientos
            </div>
            <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{totalTrainings}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1" style={{ fontSize: '0.75rem' }}>
              <Weight className="w-3.5 h-3.5" />
              Peso Actual
            </div>
            <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{rower.weight ? `${rower.weight} kg` : '-'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1" style={{ fontSize: '0.75rem' }}>
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              Min. Totales
            </div>
            <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{totalMinutes || '-'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      {rower.notes && (
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
              Notas del remero
            </p>
            <p style={{ fontSize: '0.875rem' }}>{rower.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Trainings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5" />
                Entrenamientos Ergometro
              </CardTitle>
              <CardDescription>Historial de sesiones en el ergometro</CardDescription>
            </div>
            <Button
              onClick={() => {
                setEditingTraining(null);
                setTrainingDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {trainings.length === 0 ? (
            <div className="text-center py-10">
              <Dumbbell className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                No hay entrenamientos registrados
              </p>
              <Button
                className="mt-3"
                size="sm"
                onClick={() => {
                  setEditingTraining(null);
                  setTrainingDialogOpen(true);
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Registrar primer entrenamiento
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por fecha..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {filteredTrainings.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                    No se encontraron entrenamientos
                  </p>
                </div>
              ) : (
                filteredTrainings.map((training) => {
                  const tSeries = training.series ?? [];
                  const tSeriesWithWatts = tSeries.filter((s) => s.watts > 0);
                  const tAvg =
                    tSeriesWithWatts.length > 0
                      ? Math.round(
                          tSeriesWithWatts.reduce((sum, s) => sum + s.watts, 0) /
                            tSeriesWithWatts.length
                        )
                      : 0;
                  const tMin = tSeries.reduce((sum, s) => sum + (s.minutes ?? 0), 0);

                  const tWkgValues = tSeriesWithWatts
                    .map((s) => {
                      const w = getWeightForDate(weightEntries, training.date);
                      return w && w > 0 ? s.watts / w : null;
                    })
                    .filter((v): v is number => v !== null);
                  const tAvgWkg =
                    tWkgValues.length > 0
                      ? (tWkgValues.reduce((sum, v) => sum + v, 0) / tWkgValues.length).toFixed(2)
                      : null;

                  return (
                    <div
                      key={training.id}
                      className="p-4 rounded-lg border border-border hover:bg-accent/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                              {new Date(training.date).toLocaleDateString('es-ES', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            {tSeries.map((s, i) => {
                              const sWkg = computeWkg(s.watts, training.date);
                              return (
                                <div
                                  key={i}
                                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted"
                                  style={{ fontSize: '0.75rem' }}
                                >
                                  <span className="text-muted-foreground" style={{ fontWeight: 600 }}>
                                    S{i + 1}
                                  </span>
                                  <Clock className="w-3 h-3 text-blue-500" />
                                  <span style={{ fontWeight: 500 }}>{s.minutes}'</span>
                                  <Zap className="w-3 h-3 text-yellow-500" />
                                  <span style={{ fontWeight: 500 }}>{s.watts}W</span>
                                  {s.meters != null && s.meters > 0 && (
                                    <>
                                      <Ruler className="w-3 h-3 text-green-500" />
                                      <span style={{ fontWeight: 500 }}>{s.meters}m</span>
                                    </>
                                  )}
                                  {s.spm != null && s.spm > 0 && (
                                    <>
                                      <Gauge className="w-3 h-3 text-purple-500" />
                                      <span style={{ fontWeight: 500 }}>{s.spm} s/m</span>
                                    </>
                                  )}
                                  {sWkg && (
                                    <>
                                      <span className="text-muted-foreground">·</span>
                                      <span style={{ fontWeight: 500 }} className="text-orange-500">
                                        {sWkg} W/kg
                                      </span>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          <div
                            className="flex items-center gap-4 mt-2 text-muted-foreground"
                            style={{ fontSize: '0.75rem' }}
                          >
                            <span>
                              Tiempo: <strong className="text-foreground">{tMin} min</strong>
                            </span>
                            <span>
                              Media: <strong className="text-foreground">{tAvg}W</strong>
                            </span>
                            {tAvgWkg && (
                              <span>
                                W/kg: <strong className="text-foreground">{tAvgWkg}</strong>
                              </span>
                            )}
                          </div>

                          {training.notes && (
                            <p className="text-muted-foreground mt-2" style={{ fontSize: '0.8rem' }}>
                              {training.notes}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => {
                              setEditingTraining(training);
                              setTrainingDialogOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-destructive hover:text-destructive"
                            onClick={() => setDeleteTraining(training)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ===== WEIGHT SECTION ===== */}
      {weightEntries.length > 0 && (
        <>
          {/* Weight Stats */}
          {weightStats && (
            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1" style={{ fontSize: '0.75rem' }}>
                    <Weight className="w-3.5 h-3.5" />
                    Peso Actual
                  </div>
                  <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{weightStats.latest} kg</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1" style={{ fontSize: '0.75rem' }}>
                    <TrendingDown className="w-3.5 h-3.5 text-blue-500" />
                    Peso Min.
                  </div>
                  <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{weightStats.min} kg</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1" style={{ fontSize: '0.75rem' }}>
                    <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                    Peso Max.
                  </div>
                  <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{weightStats.max} kg</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Weight Chart */}
          {weightChartData.length >= 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5" />
                  Progresion de Peso
                </CardTitle>
                <CardDescription>Evolucion del peso a lo largo del tiempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightChartData}>
                      <CartesianGrid
                        strokeDasharray="none"
                        stroke="var(--border)"
                        strokeOpacity={0.5}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        className="fill-muted-foreground"
                        axisLine={{ stroke: 'var(--border)' }}
                        tickLine={{ stroke: 'var(--border)' }}
                      />
                      <YAxis
                        domain={['dataMin - 1', 'dataMax + 1']}
                        tick={{ fontSize: 12 }}
                        className="fill-muted-foreground"
                        unit=" kg"
                        axisLine={{ stroke: 'var(--border)' }}
                        tickLine={{ stroke: 'var(--border)' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                        }}
                        formatter={(value: number) => [`${value} kg`, 'Peso']}
                      />
                      <Line
                        type="linear"
                        dataKey="peso"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        dot={{ r: 3, fill: 'var(--primary)', stroke: 'var(--primary)', strokeWidth: 2 }}
                        activeDot={{ r: 5, fill: 'var(--primary)', stroke: 'white', strokeWidth: 2 }}
                        connectNulls={true}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Weight History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ fontSize: '1rem' }}>
                <Scale className="w-4 h-4" />
                Historial de Pesajes
              </CardTitle>
              <CardDescription>
                {weightEntries.length} registro{weightEntries.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weightHistoryDesc.map((entry, index) => {
                  // Next in desc order = previous chronologically
                  const nextEntry = weightHistoryDesc[index + 1];
                  const diff = nextEntry ? entry.weight - nextEntry.weight : null;

                  return (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Weight className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p style={{ fontWeight: 600 }}>{entry.weight} kg</p>
                          <p
                            className="text-muted-foreground flex items-center gap-1"
                            style={{ fontSize: '0.8rem' }}
                          >
                            <Calendar className="w-3 h-3" />
                            {new Date(entry.date).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {diff != null && (
                          <div className="flex items-center gap-1">
                            {diff > 0 ? (
                              <TrendingUp className="w-3.5 h-3.5 text-red-500" />
                            ) : diff < 0 ? (
                              <TrendingDown className="w-3.5 h-3.5 text-green-500" />
                            ) : null}
                            <Badge
                              variant={
                                diff > 0
                                  ? 'destructive'
                                  : 'secondary'
                              }
                              className={`text-xs ${diff < 0 ? 'bg-green-500/15 text-green-600 border-green-500/30' : ''}`}
                            >
                              {diff > 0 ? '+' : ''}
                              {diff.toFixed(1)} kg
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Edit Rower Dialog */}
      <RowerDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        rower={rower}
        onSave={handleSaveRower}
      />

      {/* Training Dialog */}
      <TrainingDialog
        open={trainingDialogOpen}
        onOpenChange={(open) => {
          setTrainingDialogOpen(open);
          if (!open) setEditingTraining(null);
        }}
        training={editingTraining}
        rowerId={rower.id}
        onSave={handleSaveTraining}
      />

      {/* Delete Training Confirmation */}
      <AlertDialog
        open={!!deleteTraining}
        onOpenChange={(open) => !open && setDeleteTraining(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar entrenamiento</AlertDialogTitle>
            <AlertDialogDescription>
              Vas a eliminar el entrenamiento del{' '}
              {deleteTraining
                ? new Date(deleteTraining.date).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : ''}
              . Esta accion no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTraining}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}