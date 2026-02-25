import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
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
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Anchor,
  Pencil,
  Flag,
  Clock,
} from 'lucide-react';
import { toast } from 'sonner';
import { LineupPreviewDialog } from './LineupPreviewDialog';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
} from 'date-fns';
import { es } from 'date-fns/locale';

interface CalendarEvent {
  id: string;
  coach_id: string;
  title: string;
  date: string;
  time: string | null;
  lineup_id: string | null;
  notes: string;
  created_at: string;
}

interface LineupOption {
  id: string;
  name: string;
  date: string;
}

export function CalendarPage() {
  const { user } = useAuth();

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [lineups, setLineups] = useState<LineupOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [deleteEvent, setDeleteEvent] = useState<CalendarEvent | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState<string | null>(null);
  const [formLineupId, setFormLineupId] = useState<string | null>(null);
  const [formNotes, setFormNotes] = useState('');

  // Detail view for selected day
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Lineup preview
  const [previewLineupId, setPreviewLineupId] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (user) {
      loadEvents();
      loadLineups();
    }
  }, [user]);

  const loadEvents = async () => {
    if (!user) return;
    setIsLoading(true);
    const { data, error } = await supabase
      .from('calendar_events')
      .select('*')
      .eq('coach_id', user.id)
      .order('date', { ascending: true });
    if (error) {
      console.error('Error loading events:', error);
      toast.error('Error al cargar eventos');
    } else {
      setEvents(data ?? []);
    }
    setIsLoading(false);
  };

  const loadLineups = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('lineups')
      .select('id, name, date')
      .eq('coach_id', user.id)
      .order('date', { ascending: false });
    if (error) console.error('Error loading lineups:', error);
    else setLineups(data ?? []);
  };

  const openNewDialog = (date?: string) => {
    setEditingEvent(null);
    setFormTitle('');
    setFormDate(date || format(new Date(), 'yyyy-MM-dd'));
    setFormTime(null);
    setFormLineupId(null);
    setFormNotes('');
    setDialogOpen(true);
  };

  const openEditDialog = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormTitle(event.title);
    setFormDate(event.date);
    setFormTime(event.time);
    setFormLineupId(event.lineup_id);
    setFormNotes(event.notes || '');
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!user || !formTitle.trim()) {
      toast.error('El titulo es obligatorio');
      return;
    }
    setIsSaving(true);

    const payload = {
      title: formTitle.trim(),
      date: formDate,
      time: formTime,
      lineup_id: formLineupId,
      notes: formNotes,
    };

    if (editingEvent) {
      const { error } = await supabase
        .from('calendar_events')
        .update(payload)
        .eq('id', editingEvent.id)
        .eq('coach_id', user.id);
      if (error) {
        toast.error('Error al actualizar el evento');
        console.error(error);
      } else {
        toast.success('Evento actualizado');
      }
    } else {
      const { error } = await supabase
        .from('calendar_events')
        .insert({ ...payload, coach_id: user.id });
      if (error) {
        toast.error('Error al crear el evento');
        console.error(error);
      } else {
        toast.success('Evento creado');
      }
    }

    setIsSaving(false);
    setDialogOpen(false);
    await loadEvents();
  };

  const handleDelete = async () => {
    if (!deleteEvent || !user) return;
    const { error } = await supabase
      .from('calendar_events')
      .delete()
      .eq('id', deleteEvent.id)
      .eq('coach_id', user.id);
    if (error) {
      toast.error('Error al eliminar el evento');
    } else {
      toast.success('Evento eliminado');
      await loadEvents();
    }
    setDeleteEvent(null);
  };

  // Calendar grid computation
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { locale: es, weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { locale: es, weekStartsOn: 1 });
    return eachDayOfInterval({ start: calStart, end: calEnd });
  }, [currentMonth]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((ev) => {
      const key = ev.date;
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    });
    return map;
  }, [events]);

  const getLineupName = (id: string | null) => {
    if (!id) return null;
    return lineups.find((l) => l.id === id)?.name || 'Alineacion eliminada';
  };

  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    const key = format(selectedDate, 'yyyy-MM-dd');
    return eventsByDate[key] || [];
  }, [selectedDate, eventsByDate]);

  const dayNames = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Calendario</h1>
          <p className="text-muted-foreground mt-1">
            Planifica las fechas de regata y asigna alineaciones
          </p>
        </div>
        <Button onClick={() => openNewDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Evento
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Calendar grid */}
          <Card>
            <CardContent className="p-4">
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-9 h-9"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="capitalize" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  {format(currentMonth, 'MMMM yyyy', { locale: es })}
                </h2>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-9 h-9"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-1">
                {dayNames.map((d) => (
                  <div
                    key={d}
                    className="text-center text-muted-foreground py-2"
                    style={{ fontSize: '0.75rem', fontWeight: 500 }}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7">
                {calendarDays.map((day) => {
                  const dateKey = format(day, 'yyyy-MM-dd');
                  const dayEvents = eventsByDate[dateKey] || [];
                  const inMonth = isSameMonth(day, currentMonth);
                  const today = isToday(day);
                  const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;

                  return (
                    <div
                      key={dateKey}
                      onClick={() => setSelectedDate(day)}
                      className={`min-h-[72px] sm:min-h-[88px] p-1 border border-border/50 cursor-pointer transition-colors relative ${
                        !inMonth ? 'bg-muted/20 text-muted-foreground/50' : 'hover:bg-accent/30'
                      } ${isSelected ? 'ring-2 ring-primary ring-inset bg-primary/5' : ''}`}
                    >
                      <div
                        className={`w-6 h-6 flex items-center justify-center rounded-full mb-0.5 ${
                          today
                            ? 'bg-primary text-primary-foreground'
                            : ''
                        }`}
                        style={{ fontSize: '0.75rem', fontWeight: today ? 700 : 400 }}
                      >
                        {format(day, 'd')}
                      </div>

                      {/* Event dots */}
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map((ev) => (
                          <div
                            key={ev.id}
                            className="flex items-center gap-1 px-1 py-0.5 rounded bg-primary/10 border border-primary/20"
                            title={ev.title}
                          >
                            <Flag className="w-2.5 h-2.5 text-primary shrink-0" />
                            <span
                              className="truncate text-primary"
                              style={{ fontSize: '0.6rem', fontWeight: 500 }}
                            >
                              {ev.title}
                            </span>
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <span
                            className="text-muted-foreground pl-1"
                            style={{ fontSize: '0.55rem' }}
                          >
                            +{dayEvents.length - 2} mas
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Right panel - selected day detail */}
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                {selectedDate ? (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="capitalize" style={{ fontWeight: 600 }}>
                          {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                          {selectedDateEvents.length === 0
                            ? 'Sin eventos'
                            : `${selectedDateEvents.length} evento${selectedDateEvents.length > 1 ? 's' : ''}`}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() =>
                          openNewDialog(format(selectedDate, 'yyyy-MM-dd'))
                        }
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        Anadir
                      </Button>
                    </div>

                    {selectedDateEvents.length === 0 ? (
                      <div className="py-8 text-center">
                        <CalendarDays className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-40" />
                        <p
                          className="text-muted-foreground"
                          style={{ fontSize: '0.8rem' }}
                        >
                          No hay regatas este dia
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {selectedDateEvents.map((ev) => (
                          <div
                            key={ev.id}
                            className="p-3 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <Flag className="w-3.5 h-3.5 text-primary shrink-0" />
                                  <p
                                    className="truncate"
                                    style={{ fontWeight: 600, fontSize: '0.9rem' }}
                                  >
                                    {ev.title}
                                  </p>
                                </div>
                                {ev.time && (
                                  <div className="flex items-center gap-1.5 mt-1 ml-5 text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    <span style={{ fontSize: '0.75rem' }}>{ev.time.slice(0, 5)}</span>
                                  </div>
                                )}
                                {ev.lineup_id && (
                                  <div className="flex items-center gap-1.5 mt-1.5 ml-5">
                                    <Anchor className="w-3 h-3 text-muted-foreground" />
                                    <Badge
                                      variant="secondary"
                                      className="text-xs cursor-pointer hover:bg-primary/15 hover:text-primary transition-colors"
                                      onClick={() => {
                                        setPreviewLineupId(ev.lineup_id);
                                        setPreviewOpen(true);
                                      }}
                                    >
                                      {getLineupName(ev.lineup_id)}
                                    </Badge>
                                  </div>
                                )}
                                {ev.notes && (
                                  <p
                                    className="text-muted-foreground mt-1.5 ml-5"
                                    style={{ fontSize: '0.75rem' }}
                                  >
                                    {ev.notes}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-0.5 shrink-0">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-7 h-7"
                                  onClick={() => openEditDialog(ev)}
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-7 h-7 text-destructive hover:text-destructive"
                                  onClick={() => setDeleteEvent(ev)}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-10 text-center">
                    <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: '0.85rem' }}
                    >
                      Selecciona un dia en el calendario
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming events */}
            {events.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <p
                    className="text-muted-foreground mb-3"
                    style={{ fontSize: '0.8rem', fontWeight: 600 }}
                  >
                    Proximas regatas
                  </p>
                  <div className="space-y-2">
                    {events
                      .filter((ev) => ev.date >= format(new Date(), 'yyyy-MM-dd'))
                      .slice(0, 5)
                      .map((ev) => (
                        <div
                          key={ev.id}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/30 cursor-pointer transition-colors"
                          onClick={() => {
                            const d = new Date(ev.date + 'T12:00:00');
                            setCurrentMonth(d);
                            setSelectedDate(d);
                          }}
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Flag className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className="truncate"
                              style={{ fontWeight: 500, fontSize: '0.8rem' }}
                            >
                              {ev.title}
                            </p>
                            <p
                              className="text-muted-foreground"
                              style={{ fontSize: '0.7rem' }}
                            >
                              {new Date(ev.date).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'short',
                              })}
                              {ev.lineup_id && (
                                <>
                                  {' · '}
                                  <span className="text-primary">
                                    {getLineupName(ev.lineup_id)}
                                  </span>
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    {events.filter(
                      (ev) => ev.date >= format(new Date(), 'yyyy-MM-dd')
                    ).length === 0 && (
                      <p
                        className="text-muted-foreground text-center py-2"
                        style={{ fontSize: '0.75rem' }}
                      >
                        No hay regatas programadas
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? 'Editar Evento' : 'Nuevo Evento de Regata'}
            </DialogTitle>
            <DialogDescription>
              {editingEvent
                ? 'Modifica los datos del evento'
                : 'Anade una fecha de regata al calendario'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event-title">Titulo *</Label>
              <Input
                id="event-title"
                placeholder="Ej: Regata de la Concha"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-date">Fecha *</Label>
              <Input
                id="event-date"
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-time">Hora</Label>
              <Input
                id="event-time"
                type="time"
                value={formTime || ''}
                onChange={(e) => setFormTime(e.target.value || null)}
              />
            </div>

            <div className="space-y-2">
              <Label>Alineacion asignada</Label>
              <Select
                value={formLineupId ?? '_none'}
                onValueChange={(val) =>
                  setFormLineupId(val === '_none' ? null : val)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sin alineacion asignada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_none">— Sin alineacion —</SelectItem>
                  {lineups.map((l) => (
                    <SelectItem key={l.id} value={l.id}>
                      <div className="flex items-center gap-2">
                        <Anchor className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{l.name || 'Sin nombre'}</span>
                        <span
                          className="text-muted-foreground"
                          style={{ fontSize: '0.7rem' }}
                        >
                          ({new Date(l.date).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                          })})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {lineups.length === 0 && (
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: '0.7rem' }}
                >
                  No tienes alineaciones creadas. Crea una en la seccion de
                  Alineaciones.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-notes">Notas</Label>
              <Textarea
                id="event-notes"
                placeholder="Observaciones, lugar, horarios..."
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                rows={3}
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
                  {editingEvent ? 'Guardar Cambios' : 'Crear Evento'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteEvent}
        onOpenChange={(open) => !open && setDeleteEvent(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar evento</AlertDialogTitle>
            <AlertDialogDescription>
              Vas a eliminar el evento{' '}
              <strong>{deleteEvent?.title}</strong>. Esta accion no se puede
              deshacer.
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

      {/* Lineup Preview */}
      <LineupPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        lineupId={previewLineupId}
      />
    </div>
  );
}