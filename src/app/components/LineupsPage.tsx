import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
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
  Plus,
  Loader2,
  Trash2,
  Save,
  Users,
  Weight,
  Calendar,
  Pencil,
  ChevronDown,
  ChevronRight,
  Anchor,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import type { Rower } from '../types/rower';

interface Lineup {
  id: string;
  coach_id: string;
  name: string;
  date: string;
  estribor: (string | null)[];
  babor: (string | null)[];
  notes: string;
  created_at: string;
}

interface WeightEntry {
  id: string;
  rower_id: string;
  date: string;
  weight: number;
}

const ESTRIBOR_COUNT = 6;
const BABOR_COUNT = 7;

/** Get the weight in effect for a rower at a given date (most recent entry on or before that date) */
function getWeightAtDate(
  weightEntries: WeightEntry[],
  rowerId: string,
  targetDate: string
): number | null {
  // weightEntries sorted ascending by date, may contain entries for multiple rowers
  let result: number | null = null;
  for (const entry of weightEntries) {
    if (entry.rower_id === rowerId && entry.date <= targetDate) {
      result = entry.weight;
    }
  }
  return result;
}

export function LineupsPage() {
  const { user } = useAuth();

  const [rowers, setRowers] = useState<Rower[]>([]);
  const [lineups, setLineups] = useState<Lineup[]>([]);
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLineup, setEditingLineup] = useState<Lineup | null>(null);
  const [deleteLineup, setDeleteLineup] = useState<Lineup | null>(null);
  const [expandedLineups, setExpandedLineups] = useState<Set<string>>(new Set());

  const [formName, setFormName] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formNotes, setFormNotes] = useState('');
  const [formEstribor, setFormEstribor] = useState<(string | null)[]>(
    Array(ESTRIBOR_COUNT).fill(null)
  );
  const [formBabor, setFormBabor] = useState<(string | null)[]>(
    Array(BABOR_COUNT).fill(null)
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      loadRowers();
      loadLineups();
      loadWeightEntries();
    }
  }, [user]);

  const loadRowers = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('rowers')
      .select('*')
      .eq('coach_id', user.id)
      .order('first_name', { ascending: true });
    if (error) console.error('Error loading rowers:', error);
    else setRowers(data ?? []);
  };

  const loadLineups = async () => {
    if (!user) return;
    setIsLoading(true);
    const { data, error } = await supabase
      .from('lineups')
      .select('*')
      .eq('coach_id', user.id)
      .order('date', { ascending: false });
    if (error) console.error('Error loading lineups:', error);
    else setLineups(data ?? []);
    setIsLoading(false);
  };

  const loadWeightEntries = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('weight_entries')
      .select('*')
      .eq('coach_id', user.id)
      .order('date', { ascending: true });
    if (error) console.error('Error loading weight entries:', error);
    else setWeightEntries(data ?? []);
  };

  const openNewDialog = () => {
    setEditingLineup(null);
    setFormName('');
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormNotes('');
    setFormEstribor(Array(ESTRIBOR_COUNT).fill(null));
    setFormBabor(Array(BABOR_COUNT).fill(null));
    setDialogOpen(true);
  };

  const openEditDialog = (lineup: Lineup) => {
    setEditingLineup(lineup);
    setFormName(lineup.name);
    setFormDate(lineup.date);
    setFormNotes(lineup.notes || '');
    setFormEstribor([...lineup.estribor]);
    setFormBabor([...lineup.babor]);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    const payload = {
      name: formName,
      date: formDate,
      notes: formNotes,
      estribor: formEstribor,
      babor: formBabor,
    };

    if (editingLineup) {
      const { error } = await supabase
        .from('lineups')
        .update(payload)
        .eq('id', editingLineup.id)
        .eq('coach_id', user.id);
      if (error) { toast.error('Error al actualizar la alineacion'); console.error(error); }
      else toast.success('Alineacion actualizada');
    } else {
      const { error } = await supabase.from('lineups').insert({ ...payload, coach_id: user.id });
      if (error) { toast.error('Error al crear la alineacion'); console.error(error); }
      else toast.success('Alineacion creada');
    }
    setIsSaving(false);
    setDialogOpen(false);
    await loadLineups();
  };

  const handleDelete = async () => {
    if (!deleteLineup || !user) return;
    const { error } = await supabase.from('lineups').delete().eq('id', deleteLineup.id).eq('coach_id', user.id);
    if (error) toast.error('Error al eliminar la alineacion');
    else { toast.success('Alineacion eliminada'); await loadLineups(); }
    setDeleteLineup(null);
  };

  const getRower = (id: string | null): Rower | undefined => {
    if (!id) return undefined;
    return rowers.find((r) => r.id === id);
  };
  const getWeightForId = (id: string | null, date: string): number =>
    getWeightAtDate(weightEntries, id ?? '', date) ?? 0;
  const getRowerAge = (id: string | null): number => getRower(id)?.age ?? 0;

  const selectedRowerIds = useMemo(() => {
    const ids = new Set<string>();
    formEstribor.forEach((id) => id && ids.add(id));
    formBabor.forEach((id) => id && ids.add(id));
    return ids;
  }, [formEstribor, formBabor]);

  const estriborRowers = useMemo(
    () => rowers.filter((r) => r.side === 'estribor' || r.side === 'ambos' || r.side === ''),
    [rowers]
  );
  const baborRowers = useMemo(
    () => rowers.filter((r) => r.side === 'babor' || r.side === 'ambos' || r.side === ''),
    [rowers]
  );

  const toggleLineup = (id: string) => {
    setExpandedLineups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const computeStats = (estribor: (string | null)[], babor: (string | null)[], date: string) => {
    const allIds = [...estribor, ...babor].filter(Boolean) as string[];
    const weights = allIds.map((id) => getWeightForId(id, date)).filter((w) => w > 0);
    const ages = allIds.map((id) => getRowerAge(id)).filter((a) => a > 0);

    const avgWeight = weights.length > 0
      ? (weights.reduce((s, w) => s + w, 0) / weights.length).toFixed(1)
      : '-';
    const avgAge = ages.length > 0
      ? (ages.reduce((s, a) => s + a, 0) / ages.length).toFixed(1)
      : '-';

    // Total estribor (all 6)
    const eWeights = estribor.map((id) => getWeightForId(id, date)).filter((w) => w > 0);
    const totalEstribor = eWeights.reduce((s, w) => s + w, 0);

    // Total babor (only first 6, not position 7)
    const bWeightsForSum = babor.slice(0, 6).map((id) => getWeightForId(id, date)).filter((w) => w > 0);
    const totalBabor = bWeightsForSum.reduce((s, w) => s + w, 0);

    return { avgWeight, avgAge, totalRowers: allIds.length, totalEstribor, totalBabor };
  };

  const computePositionDiffs = (estribor: (string | null)[], babor: (string | null)[], date: string) => {
    const diffs: (number | null)[] = [];
    for (let i = 0; i < ESTRIBOR_COUNT; i++) {
      const eW = getWeightForId(estribor[i], date);
      const bW = getWeightForId(babor[i], date);
      if (eW > 0 && bW > 0) diffs.push(bW - eW);
      else diffs.push(null);
    }
    return diffs;
  };

  /** Render the 4 stat cards for a lineup */
  const StatsCards = ({ estribor, babor, date }: { estribor: (string | null)[]; babor: (string | null)[]; date: string }) => {
    const stats = computeStats(estribor, babor, date);
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1" style={{ fontSize: '0.7rem' }}>
              <Weight className="w-3.5 h-3.5" />
              Peso Medio
            </div>
            <p style={{ fontSize: '1.4rem', fontWeight: 700 }}>{stats.avgWeight} <span className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>kg</span></p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1" style={{ fontSize: '0.7rem' }}>
              <Calendar className="w-3.5 h-3.5" />
              Edad Media
            </div>
            <p style={{ fontSize: '1.4rem', fontWeight: 700 }}>{stats.avgAge} <span className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>anos</span></p>
          </CardContent>
        </Card>
        <Card className="border-green-500/30">
          <CardContent className="pt-4 pb-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-green-600 mb-1" style={{ fontSize: '0.7rem' }}>
              <Weight className="w-3.5 h-3.5" />
              Total Estribor
            </div>
            <p className="text-green-700" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              {stats.totalEstribor > 0 ? stats.totalEstribor.toFixed(1) : '-'} <span style={{ fontSize: '0.8rem' }}>kg</span>
            </p>
          </CardContent>
        </Card>
        <Card className="border-red-500/30">
          <CardContent className="pt-4 pb-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-red-600 mb-1" style={{ fontSize: '0.7rem' }}>
              <Weight className="w-3.5 h-3.5" />
              Total Babor
            </div>
            <p className="text-red-700" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              {stats.totalBabor > 0 ? stats.totalBabor.toFixed(1) : '-'} <span style={{ fontSize: '0.8rem' }}>kg</span>
            </p>
            <p className="text-muted-foreground mt-0.5" style={{ fontSize: '0.65rem' }}>Pos. 1-6</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  /** Render a diff indicator for a position */
  const DiffIndicator = ({ diff }: { diff: number | null }) => {
    if (diff == null) return <span className="text-muted-foreground" style={{ fontSize: '0.7rem' }}>-</span>;

    const absDiff = Math.abs(diff);
    const isHighDiff = absDiff > 3;

    if (diff > 0) {
      // Babor weighs more → arrow points right (toward babor)
      return (
        <div className="flex flex-col items-center gap-0.5">
          <div className={`flex items-center gap-0.5 ${isHighDiff ? 'text-red-500' : 'text-red-400'}`}>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
          <span
            className={`${isHighDiff ? 'text-red-500' : 'text-muted-foreground'}`}
            style={{ fontSize: '0.65rem', fontWeight: 600 }}
          >
            {absDiff.toFixed(1)}
          </span>
        </div>
      );
    } else if (diff < 0) {
      // Estribor weighs more → arrow points left (toward estribor)
      return (
        <div className="flex flex-col items-center gap-0.5">
          <div className={`flex items-center gap-0.5 ${isHighDiff ? 'text-green-600' : 'text-green-500'}`}>
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
          <span
            className={`${isHighDiff ? 'text-green-600' : 'text-muted-foreground'}`}
            style={{ fontSize: '0.65rem', fontWeight: 600 }}
          >
            {absDiff.toFixed(1)}
          </span>
        </div>
      );
    } else {
      return (
        <span className="text-muted-foreground" style={{ fontSize: '0.65rem', fontWeight: 600 }}>
          =
        </span>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Alineaciones</h1>
          <p className="text-muted-foreground mt-1">
            Crea y gestiona las alineaciones de tu equipo
          </p>
        </div>
        <Button onClick={openNewDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Alineacion
        </Button>
      </div>

      {/* Lineups list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : lineups.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Anchor className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
              No hay alineaciones creadas
            </p>
            <Button className="mt-4" size="sm" onClick={openNewDialog}>
              <Plus className="w-4 h-4 mr-1" />
              Crear primera alineacion
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {lineups.map((lineup) => {
            const isExpanded = expandedLineups.has(lineup.id);
            const stats = computeStats(lineup.estribor, lineup.babor, lineup.date);
            const diffs = computePositionDiffs(lineup.estribor, lineup.babor, lineup.date);

            return (
              <Card key={lineup.id} className="overflow-hidden">
                {/* Collapsed header */}
                <div
                  onClick={() => toggleLineup(lineup.id)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-accent/30 transition-colors text-left cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLineup(lineup.id); } }}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  <Anchor className="w-4 h-4 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p style={{ fontWeight: 600 }}>{lineup.name || 'Sin nombre'}</p>
                    <div className="flex items-center gap-3 mt-0.5 text-muted-foreground flex-wrap" style={{ fontSize: '0.75rem' }}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(lineup.date).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {stats.totalRowers}/13
                      </span>
                      <span className="flex items-center gap-1">
                        <Weight className="w-3 h-3" />
                        {stats.avgWeight} kg med.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => openEditDialog(lineup)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive hover:text-destructive" onClick={() => setDeleteLineup(lineup)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Expanded */}
                {isExpanded && (
                  <div className="border-t border-border p-4 space-y-4">
                    {/* Stats cards */}
                    <StatsCards estribor={lineup.estribor} babor={lineup.babor} date={lineup.date} />

                    {/* Positions grid */}
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-x-2 gap-y-1.5">
                      {/* Column headers */}
                      <div className="text-center pb-1">
                        <Badge className="bg-green-500/15 text-green-700 border-green-500/30 hover:bg-green-500/15">Estribor</Badge>
                      </div>
                      <div className="text-center pb-1 flex items-center justify-center">
                        <span className="text-muted-foreground" style={{ fontSize: '0.65rem' }}>Dif. kg</span>
                      </div>
                      <div className="text-center pb-1">
                        <Badge className="bg-red-500/15 text-red-700 border-red-500/30 hover:bg-red-500/15">Babor</Badge>
                      </div>

                      {/* Rows */}
                      {Array.from({ length: BABOR_COUNT }).map((_, i) => {
                        const eId = i < ESTRIBOR_COUNT ? lineup.estribor[i] : null;
                        const bId = lineup.babor[i];
                        const eRower = getRower(eId);
                        const bRower = getRower(bId);
                        const eWeight = eId ? getWeightForId(eId, lineup.date) : 0;
                        const bWeight = bId ? getWeightForId(bId, lineup.date) : 0;
                        const diff = i < ESTRIBOR_COUNT ? diffs[i] : null;
                        const isLast = i === BABOR_COUNT - 1;

                        return (
                          <div key={i} className="contents">
                            {/* Estribor */}
                            <div className={`p-2 rounded-lg text-center border ${
                              eRower
                                ? 'bg-green-500/8 border-green-500/20'
                                : i < ESTRIBOR_COUNT
                                ? 'bg-muted/30 border-transparent'
                                : 'bg-muted/10 border-transparent'
                            }`}>
                              {eRower ? (
                                <>
                                  <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>{eRower.first_name}</p>
                                  <p className="text-green-700" style={{ fontSize: '0.7rem', fontWeight: 500 }}>
                                    {eWeight > 0 ? `${eWeight} kg` : '-'}
                                  </p>
                                </>
                              ) : i < ESTRIBOR_COUNT ? (
                                <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                                  Pos. {i + 1}
                                </p>
                              ) : (
                                <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>—</p>
                              )}
                            </div>

                            {/* Diff */}
                            <div className="flex items-center justify-center px-1 min-w-[40px]">
                              {i < ESTRIBOR_COUNT ? (
                                <DiffIndicator diff={diff} />
                              ) : (
                                <span className="text-muted-foreground" style={{ fontSize: '0.65rem' }}>—</span>
                              )}
                            </div>

                            {/* Babor */}
                            <div className={`p-2 rounded-lg text-center border ${
                              bRower
                                ? 'bg-red-500/8 border-red-500/20'
                                : 'bg-muted/30 border-transparent'
                            }`}>
                              {bRower ? (
                                <>
                                  <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>{bRower.first_name}</p>
                                  <p className="text-red-700" style={{ fontSize: '0.7rem', fontWeight: 500 }}>
                                    {bWeight > 0 ? `${bWeight} kg` : '-'}
                                  </p>
                                  {isLast && (
                                    <p className="text-muted-foreground mt-0.5" style={{ fontSize: '0.55rem' }}>Proel</p>
                                  )}
                                </>
                              ) : (
                                <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                                  Pos. {i + 1}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {lineup.notes && (
                      <p className="text-muted-foreground pt-2 border-t border-border" style={{ fontSize: '0.8rem' }}>
                        {lineup.notes}
                      </p>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingLineup ? 'Editar Alineacion' : 'Nueva Alineacion'}
            </DialogTitle>
            <DialogDescription>
              Selecciona 6 estribores y 7 babores para la alineacion
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Name & Date */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="lineup-name">Nombre</Label>
                <Input
                  id="lineup-name"
                  placeholder="Ej: Alineacion regata"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lineup-date">Fecha</Label>
                <Input
                  id="lineup-date"
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Positions grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Estribor column */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-green-500/15 text-green-700 border-green-500/30 hover:bg-green-500/15">Estribor</Badge>
                  <span className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                    ({formEstribor.filter(Boolean).length}/{ESTRIBOR_COUNT})
                  </span>
                </div>
                <div className="space-y-2">
                  {formEstribor.map((rowerId, i) => (
                    <div key={i} className="space-y-1">
                      <Label style={{ fontSize: '0.7rem' }} className="text-green-700">
                        Posicion {i + 1}
                      </Label>
                      <Select
                        value={rowerId ?? '_empty'}
                        onValueChange={(val) => {
                          const updated = [...formEstribor];
                          updated[i] = val === '_empty' ? null : val;
                          setFormEstribor(updated);
                        }}
                      >
                        <SelectTrigger className="h-9 border-green-500/20 focus:ring-green-500/30">
                          <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="_empty">— Vacio —</SelectItem>
                          {estriborRowers
                            .filter((r) => !selectedRowerIds.has(r.id) || r.id === rowerId)
                            .map((r) => (
                              <SelectItem key={r.id} value={r.id}>
                                {r.first_name}
                                {r.weight ? ` (${r.weight} kg)` : ''}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Babor column */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-red-500/15 text-red-700 border-red-500/30 hover:bg-red-500/15">Babor</Badge>
                  <span className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                    ({formBabor.filter(Boolean).length}/{BABOR_COUNT})
                  </span>
                </div>
                <div className="space-y-2">
                  {formBabor.map((rowerId, i) => (
                    <div key={i} className="space-y-1">
                      <Label style={{ fontSize: '0.7rem' }} className="text-red-700">
                        Posicion {i + 1}{i === BABOR_COUNT - 1 ? ' (Proel)' : ''}
                      </Label>
                      <Select
                        value={rowerId ?? '_empty'}
                        onValueChange={(val) => {
                          const updated = [...formBabor];
                          updated[i] = val === '_empty' ? null : val;
                          setFormBabor(updated);
                        }}
                      >
                        <SelectTrigger className="h-9 border-red-500/20 focus:ring-red-500/30">
                          <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="_empty">— Vacio —</SelectItem>
                          {baborRowers
                            .filter((r) => !selectedRowerIds.has(r.id) || r.id === rowerId)
                            .map((r) => (
                              <SelectItem key={r.id} value={r.id}>
                                {r.first_name}
                                {r.weight ? ` (${r.weight} kg)` : ''}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live stats & diffs preview */}
            {(() => {
              const formStats = computeStats(formEstribor, formBabor, formDate);
              const formDiffs = computePositionDiffs(formEstribor, formBabor, formDate);
              const hasDiffs = formDiffs.some((d) => d != null);

              return (
                <div className="space-y-3">
                  {/* Stat cards */}
                  <StatsCards estribor={formEstribor} babor={formBabor} date={formDate} />

                  {/* Position diffs */}
                  {hasDiffs && (
                    <div className="p-3 rounded-lg bg-muted/50 border border-border">
                      <p className="text-muted-foreground mb-2" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                        Diferencia de peso por puesto:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {formDiffs.map((d, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="text-muted-foreground" style={{ fontSize: '0.7rem', fontWeight: 500 }}>P{i + 1}:</span>
                            {d != null ? (
                              <div className="flex items-center gap-0.5">
                                {d > 0 ? (
                                  <ArrowRight className={`w-3 h-3 ${Math.abs(d) > 3 ? 'text-red-500' : 'text-red-400'}`} />
                                ) : d < 0 ? (
                                  <ArrowLeft className={`w-3 h-3 ${Math.abs(d) > 3 ? 'text-green-600' : 'text-green-500'}`} />
                                ) : null}
                                <Badge
                                  variant="secondary"
                                  className={`text-xs ${
                                    d > 0
                                      ? Math.abs(d) > 3 ? 'bg-red-500/15 text-red-700' : 'bg-red-500/10 text-red-600'
                                      : d < 0
                                      ? Math.abs(d) > 3 ? 'bg-green-500/15 text-green-700' : 'bg-green-500/10 text-green-600'
                                      : ''
                                  }`}
                                >
                                  {Math.abs(d).toFixed(1)} kg
                                </Badge>
                              </div>
                            ) : (
                              <span className="text-muted-foreground" style={{ fontSize: '0.7rem' }}>-</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="lineup-notes">Notas</Label>
              <Input
                id="lineup-notes"
                placeholder="Observaciones..."
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {editingLineup ? 'Guardar Cambios' : 'Crear Alineacion'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteLineup} onOpenChange={(open) => !open && setDeleteLineup(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar alineacion</AlertDialogTitle>
            <AlertDialogDescription>
              Vas a eliminar la alineacion{' '}
              <strong>{deleteLineup?.name || 'Sin nombre'}</strong>. Esta accion no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
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