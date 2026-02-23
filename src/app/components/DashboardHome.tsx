import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, Calendar, Weight, ChevronRight, Loader2, Plus, Flag, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router';
import { Button } from './ui/button';
import type { Rower } from '../types/rower';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string | null;
  lineup_id: string | null;
}

const sideLabels: Record<string, string> = {
  babor: 'Babor',
  estribor: 'Estribor',
  ambos: 'Ambos',
};

export function DashboardHome() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [rowers, setRowers] = useState<Rower[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextEvent, setNextEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    if (user) {
      loadRowers();
      loadNextEvent();
    }
  }, [user]);

  const loadRowers = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('rowers')
      .select('*')
      .eq('coach_id', user.id)
      .order('first_name', { ascending: true });
    setRowers(data ?? []);
    setIsLoading(false);
  };

  const loadNextEvent = async () => {
    if (!user) return;
    const today = format(new Date(), 'yyyy-MM-dd');
    const { data } = await supabase
      .from('calendar_events')
      .select('id, title, date, time, lineup_id')
      .eq('coach_id', user.id)
      .gte('date', today)
      .order('date', { ascending: true })
      .limit(1);
    setNextEvent(data && data.length > 0 ? data[0] : null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Hola, {profile?.full_name?.split(' ')[0] || 'Entrenador'}</h1>
        <p className="text-muted-foreground mt-1">
          Resumen de tu equipo de remo
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Total remeros stat */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle style={{ fontSize: '0.875rem' }} className="text-muted-foreground">
              Total Remeros en Plantilla
            </CardTitle>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-500/10 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: '2rem', fontWeight: 700 }}>
              {isLoading ? '-' : rowers.length}
            </p>
          </CardContent>
        </Card>

        {/* Proximo evento stat */}
        <Card
          className="cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all"
          onClick={() => navigate('/dashboard/calendar')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle style={{ fontSize: '0.875rem' }} className="text-muted-foreground">
              Proximo Evento
            </CardTitle>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-orange-500/10 text-orange-600">
              <Flag className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p style={{ fontSize: '2rem', fontWeight: 700 }}>-</p>
            ) : nextEvent ? (
              <div>
                <p className="truncate" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                  {nextEvent.title}
                </p>
                <div className="flex items-center gap-2 mt-1 text-muted-foreground" style={{ fontSize: '0.8rem' }}>
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="capitalize">
                    {format(new Date(nextEvent.date + 'T12:00:00'), "d 'de' MMMM, yyyy", { locale: es })}
                  </span>
                  {nextEvent.time && (
                    <>
                      <Clock className="w-3.5 h-3.5 ml-1" />
                      <span>{nextEvent.time.slice(0, 5)}</span>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground" style={{ fontSize: '0.9rem' }}>
                Sin eventos programados
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Rower cards */}
      <div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }} className="mb-4">Plantilla</h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : rowers.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                Aun no has anadido ningun remero
              </p>
              <Link to="/dashboard/rowers">
                <Button className="mt-4" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Anadir tu primer remero
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rowers.map((rower) => (
              <Card
                key={rower.id}
                className="cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all"
                onClick={() => navigate(`/dashboard/rowers/${rower.id}`)}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary" style={{ fontSize: '1rem', fontWeight: 700 }}>
                        {rower.first_name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate" style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                        {rower.first_name}
                      </p>
                      <div
                        className="flex items-center gap-2 mt-0.5 text-muted-foreground flex-wrap"
                        style={{ fontSize: '0.75rem' }}
                      >
                        {rower.age != null && (
                          <span className="flex items-center gap-0.5">
                            <Calendar className="w-3 h-3" />
                            {rower.age} a.
                          </span>
                        )}
                        {rower.weight && (
                          <span className="flex items-center gap-0.5">
                            <Weight className="w-3 h-3" />
                            {rower.weight} kg
                          </span>
                        )}
                      </div>
                      {rower.side && (
                        <p className="text-muted-foreground mt-0.5" style={{ fontSize: '0.7rem' }}>
                          {sideLabels[rower.side]}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}