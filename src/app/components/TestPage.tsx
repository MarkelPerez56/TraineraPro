import { useState, useEffect } from 'react';
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
  Target,
  Pencil,
  Clock,
  Ruler,
  Droplets,
  ChevronDown,
  ChevronUp,
  UserPlus,
  X,
  Zap,
  TrendingUp,
  BarChart3,
  GitCompareArrows,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

type TestType = 'lactato' | 'tiempo' | 'metros';

interface Escalon {
  watts: number;
  lactato: number;
}

interface Test {
  id: string;
  coach_id: string;
  name: string;
  date: string;
  type: TestType;
  serie_value: number | null;
  descanso_value: number | null;
  notes: string;
  created_at: string;
}

interface TestResult {
  id: string;
  test_id: string;
  coach_id: string;
  rower_id: string;
  lactato: number | null;
  tiempo_seconds: number | null;
  metros: number | null;
  watts: number | null;
  escalones: Escalon[] | null;
  created_at: string;
}

interface Rower {
  id: string;
  first_name: string;
  weight: number | null;
}

const TYPE_CONFIG: Record<TestType, { label: string; color: string; icon: typeof Clock }> = {
  lactato: { label: 'Lactato', color: 'text-red-500', icon: Droplets },
  tiempo: { label: 'Tiempo', color: 'text-blue-500', icon: Clock },
  metros: { label: 'Metros', color: 'text-green-500', icon: Ruler },
};

export function TestPage() {
  const { user } = useAuth();

  const [tests, setTests] = useState<Test[]>([]);
  const [results, setResults] = useState<TestResult[]>([]);
  const [rowers, setRowers] = useState<Rower[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const [deleteTest, setDeleteTest] = useState<Test | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formType, setFormType] = useState<TestType>('lactato');
  const [formSerieValue, setFormSerieValue] = useState<string>('');
  const [formDescansoValue, setFormDescansoValue] = useState<string>('');

  // Expanded tests
  const [expandedTests, setExpandedTests] = useState<Set<string>>(new Set());

  // Results editing (for tiempo/metros)
  const [editingResults, setEditingResults] = useState<Record<string, Record<string, string>>>({});
  const [addingRowerToTest, setAddingRowerToTest] = useState<string | null>(null);
  const [selectedRowerForTest, setSelectedRowerForTest] = useState<string>('');

  // Lactato chart dialog
  const [chartResult, setChartResult] = useState<TestResult | null>(null);

  // Expanded rower cards (for lactato collapsible)
  const [expandedRowers, setExpandedRowers] = useState<Set<string>>(new Set());

  // Compare dialog state
  const [compareTestId, setCompareTestId] = useState<string | null>(null);
  const [compareSelectedRowers, setCompareSelectedRowers] = useState<Set<string>>(new Set());

  const COMPARE_COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#14b8a6', '#6366f1'];

  // Helper to compute nice rounded axis domains
  const niceYDomain = (dataMin: number, dataMax: number): [number, number] => {
    const min = Math.floor((dataMin - 0.5) * 2) / 2;
    const max = Math.ceil((dataMax + 0.5) * 2) / 2;
    return [Math.max(0, min), max];
  };

  const niceXDomain = (dataMin: number, dataMax: number): [number, number] => {
    const step = 10;
    return [Math.floor(dataMin / step) * step, Math.ceil(dataMax / step) * step];
  };

  const roundTick = (value: number) =>
    Number.isInteger(value) ? value.toString() : parseFloat(value.toFixed(1)).toString();

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setIsLoading(true);
    const [testsRes, resultsRes, rowersRes] = await Promise.all([
      supabase.from('tests').select('*').eq('coach_id', user.id).order('date', { ascending: false }),
      supabase.from('test_results').select('*').eq('coach_id', user.id),
      supabase.from('rowers').select('id, first_name, weight').eq('coach_id', user.id).order('first_name'),
    ]);
    if (testsRes.data) setTests(testsRes.data);
    if (resultsRes.data) setResults(resultsRes.data);
    if (rowersRes.data) setRowers(rowersRes.data);
    setIsLoading(false);
  };

  // ── Dialog handlers ──
  const openNewDialog = () => {
    setEditingTest(null);
    setFormName('');
    setFormDate(format(new Date(), 'yyyy-MM-dd'));
    setFormType('lactato');
    setFormSerieValue('');
    setFormDescansoValue('');
    setDialogOpen(true);
  };

  const openEditDialog = (test: Test) => {
    setEditingTest(test);
    setFormName(test.name);
    setFormDate(test.date);
    setFormType(test.type);
    setFormSerieValue(test.serie_value?.toString() || '');
    setFormDescansoValue(test.descanso_value?.toString() || '');
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!user || !formName.trim()) { toast.error('El nombre es obligatorio'); return; }
    if (!formSerieValue) {
      toast.error(formType === 'metros' ? 'Los metros son obligatorios' : 'Los minutos son obligatorios');
      return;
    }
    if (formType === 'lactato' && !formDescansoValue) {
      toast.error('El descanso es obligatorio para test de lactato');
      return;
    }
    setIsSaving(true);
    const payload = {
      name: formName.trim(),
      date: formDate,
      type: formType,
      serie_value: parseFloat(formSerieValue),
      descanso_value: formType === 'lactato' ? parseFloat(formDescansoValue) : null,
      notes: '',
    };
    if (editingTest) {
      const { error } = await supabase.from('tests').update(payload).eq('id', editingTest.id).eq('coach_id', user.id);
      if (error) { toast.error('Error al actualizar'); console.error(error); }
      else toast.success('Test actualizado');
    } else {
      const { error } = await supabase.from('tests').insert({ ...payload, coach_id: user.id });
      if (error) { toast.error('Error al crear'); console.error(error); }
      else toast.success('Test creado');
    }
    setIsSaving(false);
    setDialogOpen(false);
    await loadData();
  };

  const handleDelete = async () => {
    if (!deleteTest || !user) return;
    const { error } = await supabase.from('tests').delete().eq('id', deleteTest.id).eq('coach_id', user.id);
    if (error) toast.error('Error al eliminar');
    else { toast.success('Test eliminado'); await loadData(); }
    setDeleteTest(null);
  };

  // ── Helpers ──
  const toggleExpand = (id: string) => {
    setExpandedTests((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const getTestResults = (testId: string) => results.filter((r) => r.test_id === testId);
  const getRower = (id: string) => rowers.find((r) => r.id === id);

  const getSerieLabel = (test: Test) => test.type === 'metros' ? `${test.serie_value} m` : `${test.serie_value} min`;

  const formatSeconds = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const parseTimeInput = (v: string): number | null => {
    if (v.includes(':')) { const p = v.split(':'); return (parseInt(p[0]) || 0) * 60 + (parseInt(p[1]) || 0); }
    const n = parseFloat(v);
    return isNaN(n) ? null : n;
  };

  const getResultValue = (result: TestResult, type: TestType): string => {
    if (type === 'tiempo') return result.tiempo_seconds != null ? formatSeconds(result.tiempo_seconds) : '';
    if (type === 'metros') return result.metros != null ? result.metros.toString() : '';
    return '';
  };

  // ── Add rower ──
  const handleAddRowerResult = async (testId: string, test: Test) => {
    if (!user || !selectedRowerForTest) return;
    const insertData: Record<string, unknown> = {
      test_id: testId,
      coach_id: user.id,
      rower_id: selectedRowerForTest,
      lactato: null,
      tiempo_seconds: null,
      metros: null,
      watts: null,
    };
    if (test.type === 'lactato') {
      insertData.escalones = [];
    }
    const { error } = await supabase.from('test_results').insert(insertData);
    if (error) {
      if (error.code === '23505') toast.error('Este remero ya esta en el test');
      else toast.error('Error al añadir remero');
    } else {
      toast.success('Remero añadido');
      await loadData();
    }
    setAddingRowerToTest(null);
    setSelectedRowerForTest('');
  };

  // ── Field-level save for result (watts, metros, tiempo_seconds) ──
  const handleSaveField = async (resultId: string, field: 'watts' | 'metros' | 'tiempo_seconds', value: string) => {
    if (!user) return;
    const updateData: Record<string, number | null> = {};
    if (field === 'tiempo_seconds') updateData.tiempo_seconds = value ? parseTimeInput(value) : null;
    else if (field === 'metros') updateData.metros = value ? parseFloat(value) : null;
    else if (field === 'watts') updateData.watts = value ? parseFloat(value) : null;
    const { error } = await supabase.from('test_results').update(updateData).eq('id', resultId).eq('coach_id', user.id);
    if (error) toast.error('Error al guardar');
    else { toast.success('Guardado'); await loadData(); }
  };

  const handleDeleteResult = async (resultId: string) => {
    if (!user) return;
    const { error } = await supabase.from('test_results').delete().eq('id', resultId).eq('coach_id', user.id);
    if (error) toast.error('Error al eliminar');
    else { toast.success('Eliminado'); await loadData(); }
  };

  // ── Escalones (lactato) ──
  const handleAddEscalon = async (result: TestResult) => {
    if (!user) return;
    const current: Escalon[] = result.escalones || [];
    const updated = [...current, { watts: 0, lactato: 0 }];
    const { error } = await supabase.from('test_results').update({ escalones: updated }).eq('id', result.id).eq('coach_id', user.id);
    if (error) toast.error('Error al añadir escalon');
    else await loadData();
  };

  const handleUpdateEscalon = async (result: TestResult, index: number, field: 'watts' | 'lactato', value: number) => {
    if (!user) return;
    const current: Escalon[] = [...(result.escalones || [])];
    current[index] = { ...current[index], [field]: value };
    const { error } = await supabase.from('test_results').update({ escalones: current }).eq('id', result.id).eq('coach_id', user.id);
    if (error) toast.error('Error al guardar');
    else await loadData();
  };

  const handleDeleteEscalon = async (result: TestResult, index: number) => {
    if (!user) return;
    const current: Escalon[] = [...(result.escalones || [])];
    current.splice(index, 1);
    const { error } = await supabase.from('test_results').update({ escalones: current }).eq('id', result.id).eq('coach_id', user.id);
    if (error) toast.error('Error al eliminar escalon');
    else await loadData();
  };

  // ── Threshold calculation ──
  const calcThreshold = (data: Escalon[], rowerWeight: number | null): { watts: number | null; wPerKg: string | null; allBelow?: boolean; allAbove?: boolean } | null => {
    const sorted = [...data].filter((e) => e.watts > 0).sort((a, b) => a.watts - b.watts);
    if (sorted.length < 2) return null;
    for (let i = 0; i < sorted.length - 1; i++) {
      const a = sorted[i];
      const b = sorted[i + 1];
      if (a.lactato <= 4 && b.lactato >= 4) {
        const ratio = (4 - a.lactato) / (b.lactato - a.lactato);
        const thresholdWatts = Math.round(a.watts + ratio * (b.watts - a.watts));
        const wPerKg = rowerWeight && rowerWeight > 0 ? (thresholdWatts / rowerWeight).toFixed(2) : null;
        return { watts: thresholdWatts, wPerKg };
      }
    }
    if (sorted[sorted.length - 1].lactato < 4) return { watts: null, wPerKg: null, allBelow: true };
    if (sorted[0].lactato > 4) return { watts: null, wPerKg: null, allAbove: true };
    return null;
  };

  const toggleRowerExpand = (resultId: string) => {
    setExpandedRowers((prev) => { const n = new Set(prev); n.has(resultId) ? n.delete(resultId) : n.add(resultId); return n; });
  };

  // ── Render: Lactato rower card ──
  const LactatoRowerCard = ({ result, test }: { result: TestResult; test: Test }) => {
    const rower = getRower(result.rower_id);
    const escalones: Escalon[] = result.escalones || [];
    const [localEscalones, setLocalEscalones] = useState<Escalon[]>(escalones);
    const [dirty, setDirty] = useState(false);
    const isRowerExpanded = expandedRowers.has(result.id);

    useEffect(() => {
      setLocalEscalones(result.escalones || []);
      setDirty(false);
    }, [result.escalones]);

    const updateLocal = (idx: number, field: 'watts' | 'lactato', val: string) => {
      setLocalEscalones((prev) => {
        const next = [...prev];
        next[idx] = { ...next[idx], [field]: parseFloat(val) || 0 };
        return next;
      });
      setDirty(true);
    };

    const saveAll = async () => {
      if (!user) return;
      const { error } = await supabase
        .from('test_results')
        .update({ escalones: localEscalones })
        .eq('id', result.id)
        .eq('coach_id', user.id);
      if (error) toast.error('Error al guardar');
      else {
        toast.success('Escalones guardados');
        setDirty(false);
        await loadData();
      }
    };

    const addLocal = () => {
      setLocalEscalones((prev) => [...prev, { watts: 0, lactato: 0 }]);
      setDirty(true);
    };

    const removeLocal = (idx: number) => {
      setLocalEscalones((prev) => prev.filter((_, i) => i !== idx));
      setDirty(true);
    };

    const chartData = localEscalones
      .filter((e) => e.watts > 0)
      .sort((a, b) => a.watts - b.watts)
      .map((e) => ({ watts: e.watts, lactato: e.lactato }));

    const threshold = calcThreshold(localEscalones, rower?.weight ?? null);

    return (
      <div className="border border-border rounded-lg overflow-hidden">
        {/* Rower header — collapsible */}
        <div
          className="flex items-center justify-between px-3 py-2.5 bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors"
          onClick={() => toggleRowerExpand(result.id)}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
              <Droplets className="w-3 h-3 text-red-500" />
            </div>
            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>
              {rower?.first_name || 'Remero eliminado'}
            </p>
            {localEscalones.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {localEscalones.length} escalon{localEscalones.length !== 1 ? 'es' : ''}
              </Badge>
            )}
            {threshold?.watts && (
              <Badge className="text-xs bg-amber-500/15 text-amber-600 border-amber-500/30">
                Umbral: {threshold.watts} W
                {threshold.wPerKg && ` · ${threshold.wPerKg} W/kg`}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {chartData.length >= 2 && (
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 text-red-500 hover:text-red-600"
                onClick={(e) => { e.stopPropagation(); setChartResult(result); }}
                title="Ver curva de lactato"
              >
                <TrendingUp className="w-3.5 h-3.5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 text-destructive hover:text-destructive"
              onClick={(e) => { e.stopPropagation(); handleDeleteResult(result.id); }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
            {isRowerExpanded
              ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
              : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </div>

        {/* Collapsible body */}
        {isRowerExpanded && (
          <>
            {/* Escalones list */}
            <div className="px-3 py-2 space-y-1.5">
              {localEscalones.length > 0 && (
                <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center px-1 pb-1">
                  <span className="text-muted-foreground w-6" style={{ fontSize: '0.65rem', fontWeight: 600 }}>#</span>
                  <span className="text-muted-foreground" style={{ fontSize: '0.65rem', fontWeight: 600 }}>
                    <Zap className="w-3 h-3 inline mr-0.5 -mt-0.5" />Watts
                  </span>
                  <span className="text-muted-foreground" style={{ fontSize: '0.65rem', fontWeight: 600 }}>
                    <Droplets className="w-3 h-3 inline mr-0.5 -mt-0.5" />Lactato (mmol/L)
                  </span>
                  <span className="w-7" />
                </div>
              )}

              {localEscalones.map((esc, idx) => (
                <div key={idx} className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center group">
                  <span
                    className="w-6 h-6 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center shrink-0"
                    style={{ fontSize: '0.65rem', fontWeight: 700 }}
                  >
                    {idx + 1}
                  </span>
                  <Input className="h-7" type="number" min="0" placeholder="Watts"
                    value={esc.watts || ''} onChange={(e) => updateLocal(idx, 'watts', e.target.value)} style={{ fontSize: '0.8rem' }} />
                  <Input className="h-7" type="number" min="0" step="0.1" placeholder="mmol/L"
                    value={esc.lactato || ''} onChange={(e) => updateLocal(idx, 'lactato', e.target.value)} style={{ fontSize: '0.8rem' }} />
                  <Button variant="ghost" size="icon"
                    className="w-7 h-7 text-destructive hover:text-destructive"
                    onClick={() => removeLocal(idx)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}

              <div className="flex items-center gap-2 pt-1">
                <Button variant="outline" size="sm" className="gap-1" onClick={addLocal}>
                  <Plus className="w-3 h-3" />Escalon
                </Button>
                {dirty && (
                  <Button size="sm" className="gap-1" onClick={saveAll}>
                    <Save className="w-3 h-3" />Guardar
                  </Button>
                )}
              </div>
            </div>

            {/* Inline chart */}
            {chartData.length >= 2 && (
              <div className="px-3 pb-3 pt-1">
                <div className="bg-muted/20 border border-border rounded-lg p-3">
                  <p className="text-muted-foreground mb-2 flex items-center gap-1" style={{ fontSize: '0.7rem', fontWeight: 600 }}>
                    <BarChart3 className="w-3 h-3" /> Curva de lactato
                  </p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="watts" type="number" domain={[(min: number) => niceXDomain(min, min)[0], (max: number) => niceXDomain(max, max)[1]]} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" tickFormatter={roundTick}
                        label={{ value: 'Watts', position: 'insideBottomRight', offset: -2, fontSize: 10, fill: 'var(--muted-foreground)' }} />
                      <YAxis domain={[(min: number) => niceYDomain(min, min)[0], (max: number) => niceYDomain(max, max)[1]]} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" tickFormatter={roundTick}
                        label={{ value: 'mmol/L', angle: -90, position: 'insideLeft', offset: 15, fontSize: 10, fill: 'var(--muted-foreground)' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11 }}
                        formatter={(value: number) => [`${parseFloat(value.toFixed(2))} mmol/L`, 'Lactato']}
                        labelFormatter={(label: number) => `${Math.round(label)} W`}
                      />
                      <ReferenceLine y={4} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth={1} />
                      {threshold?.watts && (
                        <ReferenceLine x={threshold.watts} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth={1} />
                      )}
                      <Line type="monotone" dataKey="lactato" stroke="#ef4444" strokeWidth={2}
                        dot={{ r: 3, fill: '#ef4444' }} activeDot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  {/* Legend + threshold info */}
                  <div className="mt-2 pt-2 border-t border-border/60 flex flex-wrap items-center justify-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-0.5 bg-red-500 rounded" />
                      <span className="text-muted-foreground" style={{ fontSize: '0.65rem' }}>Lactato</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-0.5 rounded" style={{ background: 'repeating-linear-gradient(90deg, #f59e0b 0, #f59e0b 2px, transparent 2px, transparent 4px)' }} />
                      <span className="text-muted-foreground" style={{ fontSize: '0.65rem' }}>Umbral 4 mmol/L</span>
                    </div>
                  </div>
                  {threshold?.watts ? (
                    <div className="mt-2 bg-amber-500/10 border border-amber-500/20 rounded-md px-3 py-2 flex items-center justify-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }} className="text-amber-700">
                          Umbral: {threshold.watts} W
                        </span>
                      </div>
                      {threshold.wPerKg && (
                        <>
                          <span className="text-amber-500/50">|</span>
                          <div className="flex items-center gap-1.5">
                            <span style={{ fontSize: '0.8rem', fontWeight: 600 }} className="text-amber-700">
                              {threshold.wPerKg} W/kg
                            </span>
                            {rower?.weight && (
                              <span className="text-amber-600/60" style={{ fontSize: '0.65rem' }}>
                                ({rower.weight} kg)
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ) : threshold?.allBelow ? (
                    <div className="mt-2 bg-green-500/10 border border-green-500/20 rounded-md px-3 py-1.5 text-center">
                      <span className="text-green-700" style={{ fontSize: '0.75rem' }}>
                        Todos los escalones por debajo del umbral de 4 mmol/L
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Test</h1>
          <p className="text-muted-foreground mt-1">Registra los test de tus remeros</p>
        </div>
        <Button onClick={openNewDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Test
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : tests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Target className="w-12 h-12 text-muted-foreground mb-3 opacity-40" />
            <p className="text-muted-foreground mb-4" style={{ fontSize: '0.875rem' }}>No hay test creados</p>
            <Button onClick={openNewDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Crear primer test
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {tests.map((test) => {
            const testResults = getTestResults(test.id);
            const isExpanded = expandedTests.has(test.id);
            const config = TYPE_CONFIG[test.type];
            const TypeIcon = config.icon;
            const availableRowers = rowers.filter(
              (r) => !testResults.some((tr) => tr.rower_id === r.id)
            );
            const isLactato = test.type === 'lactato';

            return (
              <Card key={test.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Test header */}
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-accent/30 transition-colors"
                    onClick={() => toggleExpand(test.id)}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isLactato ? 'bg-red-500/10' :
                        test.type === 'tiempo' ? 'bg-blue-500/10' : 'bg-green-500/10'
                      }`}>
                        <TypeIcon className={`w-4 h-4 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate" style={{ fontWeight: 600 }}>{test.name}</p>
                          <Badge variant="secondary" className="text-xs shrink-0">{config.label}</Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                          <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                            {new Date(test.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                          <span className="text-muted-foreground" style={{ fontSize: '0.7rem' }}>
                            Serie: {getSerieLabel(test)}
                            {isLactato && test.descanso_value && ` · Desc: ${test.descanso_value}s`}
                          </span>
                          <span className="text-muted-foreground" style={{ fontSize: '0.7rem' }}>
                            · {testResults.length} remero{testResults.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button variant="ghost" size="icon" className="w-7 h-7"
                        onClick={(e) => { e.stopPropagation(); openEditDialog(test); }}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-7 h-7 text-destructive hover:text-destructive"
                        onClick={(e) => { e.stopPropagation(); setDeleteTest(test); }}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="border-t border-border px-4 pb-4 pt-3 space-y-3">
                      {/* Add rower */}
                      {addingRowerToTest === test.id ? (
                        <div className="flex items-center gap-2 mb-1">
                          <Select value={selectedRowerForTest} onValueChange={setSelectedRowerForTest}>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Selecciona un remero" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableRowers.map((r) => (
                                <SelectItem key={r.id} value={r.id}>{r.first_name}</SelectItem>
                              ))}
                              {availableRowers.length === 0 && (
                                <SelectItem value="_none" disabled>Todos los remeros ya estan</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <Button size="sm" onClick={() => handleAddRowerResult(test.id, test)} disabled={!selectedRowerForTest}>
                            Añadir
                          </Button>
                          <Button variant="ghost" size="icon" className="w-7 h-7"
                            onClick={() => { setAddingRowerToTest(null); setSelectedRowerForTest(''); }}>
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => setAddingRowerToTest(test.id)}>
                          <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                          Añadir remero
                        </Button>
                      )}

                      {/* Lactato: cards with escalones */}
                      {isLactato ? (
                        testResults.length > 0 ? (
                          <div className="space-y-3">
                            {/* Compare button */}
                            {testResults.filter((r) => (r.escalones || []).filter((e) => e.watts > 0).length >= 2).length >= 2 && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1.5"
                                onClick={() => {
                                  setCompareTestId(test.id);
                                  setCompareSelectedRowers(new Set(
                                    testResults
                                      .filter((r) => (r.escalones || []).filter((e) => e.watts > 0).length >= 2)
                                      .map((r) => r.rower_id)
                                  ));
                                }}
                              >
                                <GitCompareArrows className="w-3.5 h-3.5" />
                                Comparar curvas
                              </Button>
                            )}
                            {testResults.map((result) => (
                              <LactatoRowerCard key={result.id} result={result} test={test} />
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-center py-4" style={{ fontSize: '0.8rem' }}>
                            Añade remeros para registrar sus escalones de lactato
                          </p>
                        )
                      ) : (
                        /* Tiempo / Metros: table with two data columns */
                        testResults.length > 0 ? (
                          <div className="border border-border rounded-lg overflow-hidden">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-muted/30">
                                  <th className="text-left px-3 py-2 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                                    Remero
                                  </th>
                                  {test.type === 'tiempo' ? (
                                    <>
                                      <th className="text-left px-3 py-2 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Watts</th>
                                      <th className="text-left px-3 py-2 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Metros</th>
                                    </>
                                  ) : (
                                    <>
                                      <th className="text-left px-3 py-2 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Tiempo (mm:ss)</th>
                                      <th className="text-left px-3 py-2 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Watts</th>
                                    </>
                                  )}
                                  <th className="w-12" />
                                </tr>
                              </thead>
                              <tbody>
                                {testResults.map((result) => {
                                  const rower = getRower(result.rower_id);
                                  const editing = editingResults[result.id] || {};

                                  const makeFP = (
                                    field: 'watts' | 'metros' | 'tiempo_seconds',
                                    dbValue: string,
                                    placeholder: string,
                                  ) => {
                                    const cur = editing[field];
                                    const dv = cur !== undefined ? cur : dbValue;
                                    return {
                                      value: dv,
                                      placeholder,
                                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                                        setEditingResults((prev) => ({
                                          ...prev,
                                          [result.id]: { ...prev[result.id], [field]: e.target.value },
                                        })),
                                      onBlur: () => {
                                        if (cur !== undefined) {
                                          handleSaveField(result.id, field, cur);
                                          setEditingResults((prev) => {
                                            const n = { ...prev };
                                            if (n[result.id]) { const { [field]: _, ...rest } = n[result.id]; Object.keys(rest).length === 0 ? delete n[result.id] : n[result.id] = rest; }
                                            return n;
                                          });
                                        }
                                      },
                                      onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                                        if (e.key === 'Enter' && cur !== undefined) {
                                          handleSaveField(result.id, field, cur);
                                          setEditingResults((prev) => {
                                            const n = { ...prev };
                                            if (n[result.id]) { const { [field]: _, ...rest } = n[result.id]; Object.keys(rest).length === 0 ? delete n[result.id] : n[result.id] = rest; }
                                            return n;
                                          });
                                        }
                                      },
                                    };
                                  };

                                  return (
                                    <tr key={result.id} className="border-t border-border">
                                      <td className="px-3 py-2" style={{ fontSize: '0.85rem' }}>
                                        {rower?.first_name || 'Remero eliminado'}
                                      </td>
                                      {test.type === 'tiempo' ? (
                                        <>
                                          <td className="px-3 py-2">
                                            <Input className="h-8 w-28" type="number" min="0" style={{ fontSize: '0.8rem' }}
                                              {...makeFP('watts', result.watts != null ? result.watts.toString() : '', 'Ej: 250')} />
                                          </td>
                                          <td className="px-3 py-2">
                                            <Input className="h-8 w-28" type="number" min="0" style={{ fontSize: '0.8rem' }}
                                              {...makeFP('metros', result.metros != null ? result.metros.toString() : '', 'Ej: 6000')} />
                                          </td>
                                        </>
                                      ) : (
                                        <>
                                          <td className="px-3 py-2">
                                            <Input className="h-8 w-28" style={{ fontSize: '0.8rem' }}
                                              {...makeFP('tiempo_seconds', result.tiempo_seconds != null ? formatSeconds(result.tiempo_seconds) : '', 'Ej: 7:30')} />
                                          </td>
                                          <td className="px-3 py-2">
                                            <Input className="h-8 w-28" type="number" min="0" style={{ fontSize: '0.8rem' }}
                                              {...makeFP('watts', result.watts != null ? result.watts.toString() : '', 'Ej: 250')} />
                                          </td>
                                        </>
                                      )}
                                      <td className="px-3 py-2">
                                        <Button variant="ghost" size="icon" className="w-7 h-7 text-destructive hover:text-destructive"
                                          onClick={() => handleDeleteResult(result.id)}>
                                          <Trash2 className="w-3 h-3" />
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-center py-4" style={{ fontSize: '0.8rem' }}>
                            Añade remeros para registrar sus resultados
                          </p>
                        )
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* ── Lactato Curve Dialog ── */}
      <Dialog open={!!chartResult} onOpenChange={(open) => !open && setChartResult(null)}>
        <DialogContent className="sm:max-w-xl" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-500" />
              Curva de Lactato — {getRower(chartResult?.rower_id ?? '')?.first_name || ''}
            </DialogTitle>
          </DialogHeader>
          {chartResult && (() => {
            const rower = getRower(chartResult.rower_id);
            const data = (chartResult.escalones || [])
              .filter((e) => e.watts > 0)
              .sort((a, b) => a.watts - b.watts)
              .map((e) => ({ watts: e.watts, lactato: e.lactato }));
            const threshold = calcThreshold(chartResult.escalones || [], rower?.weight ?? null);
            return (
              <div className="space-y-3">
                <ResponsiveContainer width="100%" height={360}>
                  <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="watts" type="number" domain={[(min: number) => niceXDomain(min, min)[0], (max: number) => niceXDomain(max, max)[1]]} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" tickFormatter={roundTick}
                      label={{ value: 'Watts', position: 'insideBottomRight', offset: -5, fontSize: 11, fill: 'var(--muted-foreground)' }} />
                    <YAxis domain={[(min: number) => niceYDomain(min, min)[0], (max: number) => niceYDomain(max, max)[1]]} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" tickFormatter={roundTick}
                      label={{ value: 'Lactato (mmol/L)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 11, fill: 'var(--muted-foreground)' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                      formatter={(value: number) => [`${parseFloat(value.toFixed(2))} mmol/L`, 'Lactato']}
                      labelFormatter={(label: number) => `${Math.round(label)} W`}
                    />
                    <ReferenceLine y={4} stroke="#f59e0b" strokeDasharray="5 5" strokeWidth={1.5} />
                    {threshold?.watts && (
                      <ReferenceLine x={threshold.watts} stroke="#f59e0b" strokeDasharray="5 5" strokeWidth={1.5} />
                    )}
                    <Line type="monotone" dataKey="lactato" stroke="#ef4444" strokeWidth={2.5}
                      dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center gap-4 justify-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-0.5 bg-red-500 rounded" />
                    <span className="text-muted-foreground" style={{ fontSize: '0.7rem' }}>Lactato</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-0.5 rounded" style={{ background: 'repeating-linear-gradient(90deg, #f59e0b 0, #f59e0b 3px, transparent 3px, transparent 6px)' }} />
                    <span className="text-muted-foreground" style={{ fontSize: '0.7rem' }}>Umbral 4 mmol/L</span>
                  </div>
                </div>
                {/* Threshold box */}
                {threshold?.watts ? (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-2.5 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span style={{ fontSize: '0.9rem', fontWeight: 700 }} className="text-amber-700">
                        Umbral: {threshold.watts} W
                      </span>
                    </div>
                    {threshold.wPerKg && (
                      <>
                        <span className="text-amber-500/40">|</span>
                        <div className="flex items-center gap-1.5">
                          <span style={{ fontSize: '0.9rem', fontWeight: 700 }} className="text-amber-700">
                            {threshold.wPerKg} W/kg
                          </span>
                          {rower?.weight && (
                            <span className="text-amber-600/60" style={{ fontSize: '0.7rem' }}>
                              ({rower.weight} kg)
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ) : threshold?.allBelow ? (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2 text-center">
                    <span className="text-green-700" style={{ fontSize: '0.8rem' }}>
                      Todos los escalones por debajo del umbral de 4 mmol/L
                    </span>
                  </div>
                ) : threshold?.allAbove ? (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 text-center">
                    <span className="text-red-700" style={{ fontSize: '0.8rem' }}>
                      Todos los escalones por encima del umbral de 4 mmol/L
                    </span>
                  </div>
                ) : null}
                {/* Data table */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="text-center px-3 py-1.5 text-muted-foreground" style={{ fontSize: '0.7rem', fontWeight: 600 }}>Escalon</th>
                        <th className="text-center px-3 py-1.5 text-muted-foreground" style={{ fontSize: '0.7rem', fontWeight: 600 }}>Watts</th>
                        <th className="text-center px-3 py-1.5 text-muted-foreground" style={{ fontSize: '0.7rem', fontWeight: 600 }}>Lactato</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((d, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="text-center px-3 py-1.5" style={{ fontSize: '0.8rem' }}>{i + 1}</td>
                          <td className="text-center px-3 py-1.5" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{d.watts} W</td>
                          <td className={`text-center px-3 py-1.5 ${d.lactato >= 4 ? 'text-red-500' : ''}`} style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                            {d.lactato} mmol/L
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* ── Create/Edit Test Dialog ── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingTest ? 'Editar Test' : 'Nuevo Test de Ergometro'}</DialogTitle>
            <DialogDescription>
              {editingTest ? 'Modifica los datos del test' : 'Configura un nuevo test para tus remeros'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="test-name">Nombre</Label>
              <Input id="test-name" placeholder="Ej: Test 2000m febrero" value={formName} onChange={(e) => setFormName(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="test-date">Fecha</Label>
                <Input id="test-date" type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={formType} onValueChange={(val) => setFormType(val as TestType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lactato">
                      <span className="flex items-center gap-2"><Droplets className="w-3.5 h-3.5 text-red-500" />Lactato</span>
                    </SelectItem>
                    <SelectItem value="tiempo">
                      <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-blue-500" />Tiempo</span>
                    </SelectItem>
                    <SelectItem value="metros">
                      <span className="flex items-center gap-2"><Ruler className="w-3.5 h-3.5 text-green-500" />Metros</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Format */}
            <div className="space-y-2">
              <Label>Formato</Label>
              <div className="bg-muted/30 border border-border rounded-lg p-3 space-y-3">
                {formType === 'lactato' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <p className="text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Serie</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <Input className="h-8" placeholder="Min *" type="number" step="0.5" min="0"
                          value={formSerieValue} onChange={(e) => setFormSerieValue(e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Descanso</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <Input className="h-8" placeholder="Seg *" type="number" step="1" min="0"
                          value={formDescansoValue} onChange={(e) => setFormDescansoValue(e.target.value)} />
                      </div>
                    </div>
                  </div>
                ) : formType === 'tiempo' ? (
                  <div className="space-y-1.5">
                    <p className="text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Serie</p>
                    <div className="flex items-center gap-2 max-w-[200px]">
                      <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <Input className="h-8" placeholder="Min *" type="number" step="0.5" min="0"
                        value={formSerieValue} onChange={(e) => setFormSerieValue(e.target.value)} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <p className="text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Serie</p>
                    <div className="flex items-center gap-2 max-w-[200px]">
                      <Ruler className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      <Input className="h-8" placeholder="Metros *" type="number" step="100" min="0"
                        value={formSerieValue} onChange={(e) => setFormSerieValue(e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Guardando...</>
              ) : (
                <><Save className="w-4 h-4 mr-2" />{editingTest ? 'Guardar Cambios' : 'Guardar Test'}</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTest} onOpenChange={(open) => !open && setDeleteTest(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar test</AlertDialogTitle>
            <AlertDialogDescription>
              Vas a eliminar el test <strong>{deleteTest?.name}</strong> y todos sus resultados. Esta accion no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Compare Lactato Dialog ── */}
      <Dialog open={!!compareTestId} onOpenChange={(open) => { if (!open) setCompareTestId(null); }}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitCompareArrows className="w-4 h-4 text-purple-500" />
              Comparar curvas de lactato
            </DialogTitle>
          </DialogHeader>
          {compareTestId && (() => {
            const compareResults = getTestResults(compareTestId)
              .filter((r) => (r.escalones || []).filter((e) => e.watts > 0).length >= 2);

            const toggleCompareRower = (rowerId: string) => {
              setCompareSelectedRowers((prev) => {
                const n = new Set(prev);
                n.has(rowerId) ? n.delete(rowerId) : n.add(rowerId);
                return n;
              });
            };

            const selectedResults = compareResults.filter((r) => compareSelectedRowers.has(r.rower_id));

            // Build merged data: unique watts values, each rower as separate key
            const allWattsSet = new Set<number>();
            const rowerDataMap: Record<string, { watts: number; lactato: number }[]> = {};
            selectedResults.forEach((r) => {
              const data = (r.escalones || [])
                .filter((e) => e.watts > 0)
                .sort((a, b) => a.watts - b.watts);
              rowerDataMap[r.rower_id] = data;
              data.forEach((d) => allWattsSet.add(d.watts));
            });

            const allWatts = Array.from(allWattsSet).sort((a, b) => a - b);
            const mergedData = allWatts.map((w) => {
              const point: Record<string, number | null> = { watts: w };
              selectedResults.forEach((r) => {
                const match = rowerDataMap[r.rower_id]?.find((d) => d.watts === w);
                point[r.rower_id] = match ? match.lactato : null;
              });
              return point;
            });

            return (
              <div className="space-y-4">
                {/* Rower selection */}
                <div className="space-y-2">
                  <p className="text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                    Selecciona remeros ({compareSelectedRowers.size} seleccionado{compareSelectedRowers.size !== 1 ? 's' : ''})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {compareResults.map((r, idx) => {
                      const rower = getRower(r.rower_id);
                      const isSelected = compareSelectedRowers.has(r.rower_id);
                      const color = COMPARE_COLORS[idx % COMPARE_COLORS.length];
                      return (
                        <button
                          key={r.id}
                          onClick={() => toggleCompareRower(r.rower_id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                            isSelected
                              ? 'border-transparent shadow-sm'
                              : 'border-border bg-muted/30 opacity-50 hover:opacity-80'
                          }`}
                          style={isSelected ? { backgroundColor: color + '18', borderColor: color + '40' } : {}}
                        >
                          <div
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: isSelected ? color : 'var(--muted-foreground)' }}
                          />
                          <span style={{ fontSize: '0.8rem', fontWeight: isSelected ? 600 : 400 }}>
                            {rower?.first_name || 'Remero'}
                          </span>
                          {isSelected && <Check className="w-3 h-3" style={{ color }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Chart */}
                {selectedResults.length >= 2 ? (
                  <div className="bg-muted/20 border border-border rounded-lg p-4">
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={mergedData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis
                          dataKey="watts"
                          type="number"
                          domain={[(min: number) => niceXDomain(min, min)[0], (max: number) => niceXDomain(max, max)[1]]}
                          tick={{ fontSize: 11 }}
                          stroke="var(--muted-foreground)"
                          tickFormatter={roundTick}
                          label={{ value: 'Watts', position: 'insideBottomRight', offset: -5, fontSize: 11, fill: 'var(--muted-foreground)' }}
                        />
                        <YAxis
                          domain={[(min: number) => niceYDomain(min, min)[0], (max: number) => niceYDomain(max, max)[1]]}
                          tick={{ fontSize: 11 }}
                          stroke="var(--muted-foreground)"
                          tickFormatter={roundTick}
                          label={{ value: 'Lactato (mmol/L)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 11, fill: 'var(--muted-foreground)' }}
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                          labelFormatter={(label: number) => `${Math.round(label)} W`}
                          formatter={(value: number | null, name: string) => {
                            if (value == null) return ['-', name];
                            const rower = getRower(name);
                            return [`${parseFloat(Number(value).toFixed(2))} mmol/L`, rower?.first_name || 'Remero'];
                          }}
                        />
                        <ReferenceLine y={4} stroke="#f59e0b" strokeDasharray="5 5" strokeWidth={1.5} />
                        {selectedResults.map((r) => {
                          const color = COMPARE_COLORS[compareResults.findIndex((cr) => cr.rower_id === r.rower_id) % COMPARE_COLORS.length];
                          return (
                            <Line
                              key={r.rower_id}
                              type="monotone"
                              dataKey={r.rower_id}
                              stroke={color}
                              strokeWidth={2.5}
                              dot={{ r: 4, fill: color, strokeWidth: 2, stroke: '#fff' }}
                              activeDot={{ r: 6 }}
                              connectNulls={false}
                              name={r.rower_id}
                            />
                          );
                        })}
                      </LineChart>
                    </ResponsiveContainer>

                    {/* Legend */}
                    <div className="mt-3 pt-3 border-t border-border/60 flex flex-wrap items-center justify-center gap-3">
                      {selectedResults.map((r) => {
                        const rower = getRower(r.rower_id);
                        const color = COMPARE_COLORS[compareResults.findIndex((cr) => cr.rower_id === r.rower_id) % COMPARE_COLORS.length];
                        return (
                          <div key={r.rower_id} className="flex items-center gap-1.5">
                            <div className="w-4 h-0.5 rounded" style={{ backgroundColor: color }} />
                            <span className="text-muted-foreground" style={{ fontSize: '0.7rem' }}>
                              {rower?.first_name || 'Remero'}
                            </span>
                          </div>
                        );
                      })}
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-0.5 rounded" style={{ background: 'repeating-linear-gradient(90deg, #f59e0b 0, #f59e0b 3px, transparent 3px, transparent 6px)' }} />
                        <span className="text-muted-foreground" style={{ fontSize: '0.7rem' }}>Umbral 4 mmol/L</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-border rounded-lg">
                    <GitCompareArrows className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-40" />
                    <p className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>
                      Selecciona al menos 2 remeros para comparar
                    </p>
                  </div>
                )}

                {/* Threshold summary table */}
                {selectedResults.length >= 2 && (
                  <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/30">
                          <th className="text-left px-3 py-2 text-muted-foreground" style={{ fontSize: '0.7rem', fontWeight: 600 }}>Remero</th>
                          <th className="text-center px-3 py-2 text-muted-foreground" style={{ fontSize: '0.7rem', fontWeight: 600 }}>Umbral (W)</th>
                          <th className="text-center px-3 py-2 text-muted-foreground" style={{ fontSize: '0.7rem', fontWeight: 600 }}>W/kg</th>
                          <th className="text-center px-3 py-2 text-muted-foreground" style={{ fontSize: '0.7rem', fontWeight: 600 }}>Peso</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedResults.map((r) => {
                          const rower = getRower(r.rower_id);
                          const color = COMPARE_COLORS[compareResults.findIndex((cr) => cr.rower_id === r.rower_id) % COMPARE_COLORS.length];
                          const threshold = calcThreshold(r.escalones || [], rower?.weight ?? null);
                          return (
                            <tr key={r.rower_id} className="border-t border-border">
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{rower?.first_name || 'Remero'}</span>
                                </div>
                              </td>
                              <td className="text-center px-3 py-2" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                                {threshold?.watts ? `${threshold.watts} W` : '-'}
                              </td>
                              <td className="text-center px-3 py-2" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                                {threshold?.wPerKg || '-'}
                              </td>
                              <td className="text-center px-3 py-2 text-muted-foreground" style={{ fontSize: '0.8rem' }}>
                                {rower?.weight ? `${rower.weight} kg` : '-'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}