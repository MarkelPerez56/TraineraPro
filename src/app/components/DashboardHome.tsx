import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, Calendar, Flag, Clock, Loader2, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarPage } from './CalendarPage';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string | null;
  lineup_id: string | null;
}

export function DashboardHome() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [rowerCount, setRowerCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nextEvent, setNextEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    if (!user) return;
    setIsLoading(true);
    const [rowersRes, eventsRes] = await Promise.all([
      supabase
        .from('rowers')
        .select('id', { count: 'exact', head: true })
        .eq('coach_id', user.id),
      supabase
        .from('calendar_events')
        .select('id, title, date, time, lineup_id')
        .eq('coach_id', user.id)
        .gte('date', format(new Date(), 'yyyy-MM-dd'))
        .order('date', { ascending: true })
        .limit(1),
    ]);
    setRowerCount(rowersRes.count ?? 0);
    setNextEvent(eventsRes.data && eventsRes.data.length > 0 ? eventsRes.data[0] : null);
    setIsLoading(false);
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
        {/* Total remeros stat — clickable */}
        <Card
          className="cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all"
          onClick={() => navigate('/dashboard/rowers')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle style={{ fontSize: '0.875rem' }} className="text-muted-foreground">
              Total Remeros en Plantilla
            </CardTitle>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-500/10 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p style={{ fontSize: '2rem', fontWeight: 700 }}>
                {isLoading ? '-' : rowerCount}
              </p>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Proximo evento stat */}
        <Card>
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

      {/* Calendario embebido */}
      <CalendarPage />
    </div>
  );
}
