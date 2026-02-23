import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Loader2, Save, Plus, Trash2, Zap, Clock, Ruler, Gauge } from 'lucide-react';
import type { ErgTraining, ErgSeries } from '../types/rower';

interface TrainingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  training?: ErgTraining | null;
  rowerId: string;
  onSave: (data: {
    rower_id: string;
    date: string;
    notes: string;
    series: ErgSeries[];
  }) => Promise<void>;
}

export function TrainingDialog({
  open,
  onOpenChange,
  training,
  rowerId,
  onSave,
}: TrainingDialogProps) {
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [series, setSeries] = useState<ErgSeries[]>([{ watts: 0, minutes: 0, meters: null, spm: null }]);
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!training;

  useEffect(() => {
    if (training) {
      setDate(training.date);
      setNotes(training.notes);
      setSeries(training.series.length > 0 ? training.series : [{ watts: 0, minutes: 0, meters: null, spm: null }]);
    } else {
      setDate(new Date().toISOString().split('T')[0]);
      setNotes('');
      setSeries([{ watts: 0, minutes: 0, meters: null, spm: null }]);
    }
  }, [training, open]);

  const addSeries = () => {
    setSeries([...series, { watts: 0, minutes: 0, meters: null, spm: null }]);
  };

  const removeSeries = (index: number) => {
    if (series.length <= 1) return;
    setSeries(series.filter((_, i) => i !== index));
  };

  const updateSeries = (index: number, field: keyof ErgSeries, value: number | null) => {
    const updated = [...series];
    updated[index] = { ...updated[index], [field]: value };
    setSeries(updated);
  };

  const totalMinutes = series.reduce((s, r) => s + r.minutes, 0);
  const avgWatts =
    series.filter((s) => s.watts > 0).length > 0
      ? Math.round(
          series.filter((s) => s.watts > 0).reduce((s, r) => s + r.watts, 0) /
            series.filter((s) => s.watts > 0).length
        )
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields in series
    const hasInvalidSeries = series.some((s) => !s.minutes || !s.watts);
    if (hasInvalidSeries) {
      return; // HTML required will show validation
    }

    setIsLoading(true);
    await onSave({
      rower_id: rowerId,
      date,
      notes,
      series: series.filter((s) => s.watts > 0 || s.minutes > 0),
    });
    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Entrenamiento' : 'Nuevo Entrenamiento de Ergometro'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifica los datos del entrenamiento'
              : 'Registra las series del ergometro'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="training-date">Fecha</Label>
            <Input
              id="training-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Series */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Series</Label>
              <Button type="button" variant="outline" size="sm" onClick={addSeries}>
                <Plus className="w-3 h-3 mr-1" />
                Anadir serie
              </Button>
            </div>

            <div className="space-y-2">
              {series.map((s, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border border-border bg-muted/30 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: '0.75rem', fontWeight: 600 }}
                    >
                      Serie {index + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="w-7 h-7 shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeSeries(index)}
                      disabled={series.length <= 1}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  {/* Required: Minutes & Watts */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <Input
                        type="number"
                        step="0.5"
                        placeholder="Min *"
                        className="h-8"
                        required
                        value={s.minutes || ''}
                        onChange={(e) =>
                          updateSeries(index, 'minutes', parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                      <Input
                        type="number"
                        placeholder="Watts *"
                        className="h-8"
                        required
                        value={s.watts || ''}
                        onChange={(e) =>
                          updateSeries(index, 'watts', parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                  </div>
                  {/* Optional: Meters & SPM */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      <Input
                        type="number"
                        placeholder="Metros"
                        className="h-8"
                        value={s.meters ?? ''}
                        onChange={(e) =>
                          updateSeries(
                            index,
                            'meters',
                            e.target.value ? parseFloat(e.target.value) : null
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <Input
                        type="number"
                        placeholder="s/m"
                        className="h-8"
                        value={s.spm ?? ''}
                        onChange={(e) =>
                          updateSeries(
                            index,
                            'spm',
                            e.target.value ? parseFloat(e.target.value) : null
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Series Summary */}
            {series.some((s) => s.watts > 0 || s.minutes > 0) && (
              <div className="flex items-center gap-4 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
                <span className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                  Resumen:
                </span>
                <span className="flex items-center gap-1" style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                  <Clock className="w-3 h-3 text-blue-500" />
                  {totalMinutes} min total
                </span>
                <span className="flex items-center gap-1" style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                  <Zap className="w-3 h-3 text-yellow-500" />
                  {avgWatts}W media
                </span>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="training-notes">Notas</Label>
            <Textarea
              id="training-notes"
              placeholder="Observaciones del entrenamiento..."
              className="min-h-[60px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Guardar Cambios' : 'Guardar Entrenamiento'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}