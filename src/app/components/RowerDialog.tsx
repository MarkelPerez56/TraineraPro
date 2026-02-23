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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Loader2, Save } from 'lucide-react';
import type { Rower, RowerFormData } from '../types/rower';
import { SIDES } from '../types/rower';

interface RowerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rower?: Rower | null;
  onSave: (data: RowerFormData) => Promise<void>;
}

const emptyForm: RowerFormData = {
  first_name: '',
  age: null,
  weight: null,
  side: '',
  notes: '',
};

export function RowerDialog({ open, onOpenChange, rower, onSave }: RowerDialogProps) {
  const [form, setForm] = useState<RowerFormData>(emptyForm);
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!rower;

  useEffect(() => {
    if (rower) {
      setForm({
        first_name: rower.first_name,
        age: rower.age,
        weight: rower.weight,
        side: rower.side,
        notes: rower.notes,
      });
    } else {
      setForm(emptyForm);
    }
  }, [rower, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onSave(form);
    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Remero' : 'Nuevo Remero'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifica los datos del remero'
              : 'Anade un nuevo remero a tu plantilla'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="first_name">Nombre</Label>
            <Input
              id="first_name"
              placeholder="Nombre del remero"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              required
            />
          </div>

          {/* Age & Weight */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="age">Edad</Label>
              <Input
                id="age"
                type="number"
                min="10"
                max="99"
                placeholder="25"
                value={form.age ?? ''}
                onChange={(e) =>
                  setForm({ ...form, age: e.target.value ? parseInt(e.target.value) : null })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="75.0"
                value={form.weight ?? ''}
                onChange={(e) =>
                  setForm({ ...form, weight: e.target.value ? parseFloat(e.target.value) : null })
                }
              />
            </div>
          </div>

          {/* Side */}
          <div className="space-y-2">
            <Label>Lado preferido</Label>
            <Select
              value={form.side}
              onValueChange={(val) =>
                setForm({ ...form, side: val as RowerFormData['side'] })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {SIDES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              placeholder="Observaciones sobre el remero..."
              className="min-h-[80px]"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
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
                  {isEditing ? 'Guardar Cambios' : 'Anadir Remero'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
