import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
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
  Weight,
  Plus,
  Loader2,
  Trash2,
  Calendar,
  Scale,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Pencil,
  Check,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import type { Rower } from '../types/rower';

interface WeightEntry {
  id: string;
  coach_id: string;
  rower_id: string;
  date: string;
  weight: number;
  created_at: string;
}

export function WeighInsPage() {
  const { user } = useAuth();

  const [rowers, setRowers] = useState<Rower[]>([]);
  const [allEntries, setAllEntries] = useState<WeightEntry[]>([]);
  const [selectedRowerId, setSelectedRowerId] = useState<string>('');
  const [isLoadingRowers, setIsLoadingRowers] = useState(true);
  const [isLoadingEntries, setIsLoadingEntries] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newWeight, setNewWeight] = useState('');

  // Delete state
  const [deleteEntry, setDeleteEntry] = useState<WeightEntry | null>(null);

  // Edit state
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editWeight, setEditWeight] = useState('');

  // Expanded dates
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user) {
      loadRowers();
      loadAllEntries();
    }
  }, [user]);

  const loadRowers = async () => {
    if (!user) return;
    setIsLoadingRowers(true);
    const { data, error } = await supabase
      .from('rowers')
      .select('*')
      .eq('coach_id', user.id)
      .order('first_name', { ascending: true });

    if (error) {
      console.error('Error loading rowers:', error);
      toast.error('Error al cargar los remeros');
    } else {
      setRowers(data ?? []);
    }
    setIsLoadingRowers(false);
  };

  const loadAllEntries = async () => {
    if (!user) return;
    setIsLoadingEntries(true);
    const { data, error } = await supabase
      .from('weight_entries')
      .select('*')
      .eq('coach_id', user.id)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error loading weight entries:', error);
      toast.error('Error al cargar los pesajes');
    } else {
      setAllEntries(data ?? []);
    }
    setIsLoadingEntries(false);
  };

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedRowerId || !newWeight) return;

    setIsSaving(true);
    const weightValue = parseFloat(newWeight);

    const { error: insertError } = await supabase.from('weight_entries').insert({
      coach_id: user.id,
      rower_id: selectedRowerId,
      date: newDate,
      weight: weightValue,
    });

    if (insertError) {
      console.error('Error creating weight entry:', insertError);
      toast.error('Error al registrar el pesaje');
      setIsSaving(false);
      return;
    }

    // Update rower's current weight
    await supabase
      .from('rowers')
      .update({ weight: weightValue, updated_at: new Date().toISOString() })
      .eq('id', selectedRowerId)
      .eq('coach_id', user.id);

    toast.success('Pesaje registrado');
    setNewWeight('');
    setNewDate(new Date().toISOString().split('T')[0]);
    setExpandedDates((prev) => new Set(prev).add(newDate));
    await loadAllEntries();
    await loadRowers();
    setIsSaving(false);
  };

  const handleDeleteEntry = async () => {
    if (!deleteEntry || !user) return;
    const { error } = await supabase
      .from('weight_entries')
      .delete()
      .eq('id', deleteEntry.id)
      .eq('coach_id', user.id);

    if (error) {
      console.error('Error deleting weight entry:', error);
      toast.error('Error al eliminar el pesaje');
    } else {
      toast.success('Pesaje eliminado');
      await loadAllEntries();
    }
    setDeleteEntry(null);
  };

  const handleStartEdit = (entry: WeightEntry) => {
    setEditingEntryId(entry.id);
    setEditWeight(String(entry.weight));
  };

  const handleCancelEdit = () => {
    setEditingEntryId(null);
    setEditWeight('');
  };

  const handleSaveEdit = async (entry: WeightEntry) => {
    if (!user || !editWeight) return;
    const weightValue = parseFloat(editWeight);
    if (isNaN(weightValue)) return;

    const { error } = await supabase
      .from('weight_entries')
      .update({ weight: weightValue })
      .eq('id', entry.id)
      .eq('coach_id', user.id);

    if (error) {
      console.error('Error updating weight entry:', error);
      toast.error('Error al actualizar el pesaje');
    } else {
      toast.success('Pesaje actualizado');

      // If this is the most recent entry for this rower, update rower weight
      const rowerEntries = allEntries
        .filter((e) => e.rower_id === entry.rower_id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      if (rowerEntries[0]?.id === entry.id) {
        await supabase
          .from('rowers')
          .update({ weight: weightValue, updated_at: new Date().toISOString() })
          .eq('id', entry.rower_id)
          .eq('coach_id', user.id);
        await loadRowers();
      }

      await loadAllEntries();
    }
    setEditingEntryId(null);
    setEditWeight('');
  };

  const getRowerName = (rowerId: string) => {
    const r = rowers.find((rw) => rw.id === rowerId);
    return r ? r.first_name : 'Desconocido';
  };

  const getRowerInitials = (rowerId: string) => {
    const r = rowers.find((rw) => rw.id === rowerId);
    return r ? r.first_name.slice(0, 2).toUpperCase() : '??';
  };

  // Get previous weight for a rower before a given date
  const getPreviousWeight = (rowerId: string, currentDate: string): number | null => {
    for (const e of allEntries) {
      if (e.rower_id === rowerId && e.date < currentDate) {
        return e.weight;
      }
    }
    return null;
  };

  // Entries grouped by date
  const entriesByDate = useMemo(() => {
    const map = new Map<string, WeightEntry[]>();
    for (const entry of allEntries) {
      const existing = map.get(entry.date) ?? [];
      existing.push(entry);
      map.set(entry.date, existing);
    }
    return Array.from(map.entries()).map(([date, entries]) => ({ date, entries }));
  }, [allEntries]);

  const toggleDate = (date: string) => {
    setExpandedDates((prev) => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Pesajes</h1>
        <p className="text-muted-foreground mt-1">
          Registra y controla el peso de tus remeros
        </p>
      </div>

      {/* Add form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5" />
            Registrar Pesaje
          </CardTitle>
          <CardDescription>Selecciona un remero y registra su peso</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddEntry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Remero</Label>
                <Select value={selectedRowerId} onValueChange={setSelectedRowerId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar remero..." />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingRowers ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : rowers.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                        No hay remeros
                      </div>
                    ) : (
                      rowers.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.first_name}
                          {r.weight ? ` (${r.weight} kg)` : ''}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weigh-date">Fecha</Label>
                <Input
                  id="weigh-date"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weigh-weight">Peso (kg)</Label>
                <div className="flex gap-2">
                  <Input
                    id="weigh-weight"
                    type="number"
                    step="0.1"
                    min="30"
                    max="200"
                    placeholder="Ej: 82.5"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    disabled={!selectedRowerId || !newWeight || isSaving}
                    className="shrink-0"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-1" />
                        Anotar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Weigh-ins grouped by date – collapsible */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontSize: '1rem' }}>Pesajes por Fecha</CardTitle>
          <CardDescription>
            Pulsa en una fecha para ver los pesajes de ese dia
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingEntries ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : entriesByDate.length === 0 ? (
            <div className="text-center py-8">
              <Scale className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                No hay pesajes registrados
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {entriesByDate.map(({ date, entries }) => {
                const isExpanded = expandedDates.has(date);
                return (
                  <div key={date} className="border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleDate(date)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-accent/40 transition-colors text-left"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      )}
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 500 }} className="flex-1">
                        {new Date(date).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {entries.length} pesaje{entries.length !== 1 ? 's' : ''}
                      </Badge>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-border px-3 pb-3 pt-2 space-y-2">
                        {entries.map((entry) => {
                          const prevWeight = getPreviousWeight(entry.rower_id, entry.date);
                          const diff = prevWeight != null ? entry.weight - prevWeight : null;
                          const isEditing = editingEntryId === entry.id;

                          return (
                            <div
                              key={entry.id}
                              className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40"
                            >
                              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <span className="text-primary" style={{ fontSize: '0.7rem', fontWeight: 600 }}>
                                  {getRowerInitials(entry.rower_id)}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="truncate" style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                                  {getRowerName(entry.rower_id)}
                                </p>
                                {isEditing ? (
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <Input
                                      type="number"
                                      step="0.1"
                                      className="h-7 w-24"
                                      style={{ fontSize: '0.85rem' }}
                                      value={editWeight}
                                      onChange={(e) => setEditWeight(e.target.value)}
                                      autoFocus
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault();
                                          handleSaveEdit(entry);
                                        }
                                        if (e.key === 'Escape') handleCancelEdit();
                                      }}
                                    />
                                    <span className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>kg</span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="w-6 h-6 text-green-600 hover:text-green-700"
                                      onClick={() => handleSaveEdit(entry)}
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="w-6 h-6 text-muted-foreground"
                                      onClick={handleCancelEdit}
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </Button>
                                  </div>
                                ) : (
                                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                                    {entry.weight} kg
                                  </p>
                                )}
                              </div>
                              {!isEditing && diff != null && (
                                <div className="flex items-center gap-1 shrink-0">
                                  {diff > 0 ? (
                                    <TrendingUp className="w-3.5 h-3.5 text-red-500" />
                                  ) : diff < 0 ? (
                                    <TrendingDown className="w-3.5 h-3.5 text-green-500" />
                                  ) : null}
                                  <Badge
                                    variant={
                                      diff > 0
                                        ? 'destructive'
                                        : diff < 0
                                        ? 'default'
                                        : 'secondary'
                                    }
                                    className="text-xs"
                                  >
                                    {diff > 0 ? '+' : ''}
                                    {diff.toFixed(1)} kg
                                  </Badge>
                                </div>
                              )}
                              {!isEditing && (
                                <div className="flex items-center gap-0.5 shrink-0">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-7 h-7 text-muted-foreground hover:text-foreground"
                                    onClick={() => handleStartEdit(entry)}
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-7 h-7 text-muted-foreground hover:text-destructive"
                                    onClick={() => setDeleteEntry(entry)}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteEntry}
        onOpenChange={(open) => !open && setDeleteEntry(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar pesaje</AlertDialogTitle>
            <AlertDialogDescription>
              Vas a eliminar el registro de{' '}
              <strong>{deleteEntry?.weight} kg</strong> de{' '}
              <strong>{deleteEntry ? getRowerName(deleteEntry.rower_id) : ''}</strong> del dia{' '}
              {deleteEntry &&
                new Date(deleteEntry.date).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              . Esta accion no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEntry}
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
