import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
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
  Search,
  Pencil,
  Trash2,
  Loader2,
  Users,
  Weight,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { RowerDialog } from './RowerDialog';
import type { Rower, RowerFormData } from '../types/rower';

const sideLabels: Record<string, string> = {
  babor: 'Babor',
  estribor: 'Estribor',
  ambos: 'Ambos',
};

export function RowersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rowers, setRowers] = useState<Rower[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRower, setEditingRower] = useState<Rower | null>(null);
  const [deleteRower, setDeleteRower] = useState<Rower | null>(null);
  const [sortField, setSortField] = useState<'name' | 'weight'>('name');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    if (user) loadRowers();
  }, [user]);

  const loadRowers = async () => {
    if (!user) return;
    setIsLoading(true);

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

    setIsLoading(false);
  };

  const handleSaveRower = async (formData: RowerFormData) => {
    if (!user) return;

    if (editingRower) {
      const { error } = await supabase
        .from('rowers')
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingRower.id)
        .eq('coach_id', user.id);

      if (error) {
        toast.error('Error al actualizar remero');
        console.error(error);
      } else {
        toast.success('Remero actualizado');
      }
    } else {
      const { error } = await supabase.from('rowers').insert({
        ...formData,
        coach_id: user.id,
      });

      if (error) {
        toast.error('Error al crear remero');
        console.error(error);
      } else {
        toast.success('Remero anadido a la plantilla');
      }
    }

    setEditingRower(null);
    await loadRowers();
  };

  const handleDeleteRower = async () => {
    if (!deleteRower || !user) return;

    const { error } = await supabase
      .from('rowers')
      .delete()
      .eq('id', deleteRower.id)
      .eq('coach_id', user.id);

    if (error) {
      toast.error('Error al eliminar remero');
    } else {
      toast.success('Remero eliminado');
      await loadRowers();
    }

    setDeleteRower(null);
  };

  // Filter & Sort
  let filtered = rowers.filter((r) => {
    return r.first_name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  filtered.sort((a, b) => {
    let cmp = 0;
    switch (sortField) {
      case 'name':
        cmp = a.first_name.localeCompare(b.first_name);
        break;
      case 'weight':
        cmp = (a.weight ?? 0) - (b.weight ?? 0);
        break;
    }
    return sortAsc ? cmp : -cmp;
  });

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field) return null;
    return sortAsc ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Plantilla de Remeros</h1>
          <p className="text-muted-foreground mt-1">
            {rowers.length} remero{rowers.length !== 1 ? 's' : ''} en la plantilla
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingRower(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Anadir Remero
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rowers List */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Remeros</CardTitle>
              <CardDescription>{filtered.length} resultado(s)</CardDescription>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSort('name')}
                className="gap-1 text-xs"
              >
                Nombre <SortIcon field="name" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSort('weight')}
                className="gap-1 text-xs"
              >
                Peso <SortIcon field="weight" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {rowers.length === 0
                  ? 'Aun no has anadido ningun remero'
                  : 'No se encontraron remeros con ese nombre'}
              </p>
              {rowers.length === 0 && (
                <Button
                  className="mt-4"
                  onClick={() => {
                    setEditingRower(null);
                    setDialogOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Anadir tu primer remero
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((rower) => (
                <div
                  key={rower.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors group cursor-pointer"
                  onClick={() => navigate(`/dashboard/rowers/${rower.id}`)}
                >
                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                      {rower.first_name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="truncate" style={{ fontWeight: 500 }}>
                      {rower.first_name}
                    </p>
                    <div
                      className="flex items-center gap-3 mt-1 text-muted-foreground flex-wrap"
                      style={{ fontSize: '0.8rem' }}
                    >
                      {rower.age != null && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {rower.age} anos
                        </span>
                      )}
                      {rower.weight && (
                        <span className="flex items-center gap-1">
                          <Weight className="w-3 h-3" />
                          {rower.weight} kg
                        </span>
                      )}
                      {rower.side && (
                        <span>{sideLabels[rower.side]}</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingRower(rower);
                        setDialogOpen(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteRower(rower);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <RowerDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingRower(null);
        }}
        rower={editingRower}
        onSave={handleSaveRower}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteRower} onOpenChange={(open) => !open && setDeleteRower(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar remero</AlertDialogTitle>
            <AlertDialogDescription>
              Vas a eliminar a{' '}
              <strong>{deleteRower?.first_name}</strong>{' '}
              de tu plantilla. Esta accion no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRower}
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
