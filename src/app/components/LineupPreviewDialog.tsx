import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Loader2,
  ArrowLeft,
  ArrowRight,
  Weight,
  Calendar,
  Anchor,
} from 'lucide-react';
import type { Rower } from '../types/rower';

interface WeightEntry {
  id: string;
  rower_id: string;
  date: string;
  weight: number;
}

interface FullLineup {
  id: string;
  name: string;
  date: string;
  estribor: (string | null)[];
  babor: (string | null)[];
  notes: string;
}

const ESTRIBOR_COUNT = 6;
const BABOR_COUNT = 7;

function getWeightAtDate(entries: WeightEntry[], rowerId: string, targetDate: string): number | null {
  let result: number | null = null;
  for (const entry of entries) {
    if (entry.rower_id === rowerId && entry.date <= targetDate) {
      result = entry.weight;
    }
  }
  return result;
}

interface LineupPreviewDialogProps {
  lineupId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LineupPreviewDialog({ lineupId, open, onOpenChange }: LineupPreviewDialogProps) {
  const { user } = useAuth();
  const [lineup, setLineup] = useState<FullLineup | null>(null);
  const [rowers, setRowers] = useState<Rower[]>([]);
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && lineupId && user) {
      loadData();
    }
  }, [open, lineupId, user]);

  const loadData = async () => {
    if (!user || !lineupId) return;
    setIsLoading(true);

    const [lineupRes, rowersRes, weightsRes] = await Promise.all([
      supabase.from('lineups').select('*').eq('id', lineupId).eq('coach_id', user.id).single(),
      supabase.from('rowers').select('*').eq('coach_id', user.id),
      supabase.from('weight_entries').select('id, rower_id, date, weight').eq('coach_id', user.id).order('date', { ascending: true }),
    ]);

    if (lineupRes.data) setLineup(lineupRes.data);
    if (rowersRes.data) setRowers(rowersRes.data);
    if (weightsRes.data) setWeightEntries(weightsRes.data);
    setIsLoading(false);
  };

  const getRower = (id: string | null): Rower | undefined => {
    if (!id) return undefined;
    return rowers.find((r) => r.id === id);
  };

  const getWeight = (id: string | null): number => {
    if (!id || !lineup) return 0;
    return getWeightAtDate(weightEntries, id, lineup.date) ?? 0;
  };

  const getAge = (id: string | null): number => getRower(id)?.age ?? 0;

  if (!lineup && !isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Alineación</DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center text-muted-foreground" style={{ fontSize: '0.85rem' }}>
            Alineación no encontrada
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const computeStats = () => {
    if (!lineup) return { avgWeight: '-', avgAge: '-', totalEstribor: 0, totalBabor: 0 };
    const allIds = [...lineup.estribor, ...lineup.babor].filter(Boolean) as string[];
    const weights = allIds.map((id) => getWeight(id)).filter((w) => w > 0);
    const ages = allIds.map((id) => getAge(id)).filter((a) => a > 0);

    const avgWeight = weights.length > 0
      ? (weights.reduce((s, w) => s + w, 0) / weights.length).toFixed(1)
      : '-';
    const avgAge = ages.length > 0
      ? (ages.reduce((s, a) => s + a, 0) / ages.length).toFixed(1)
      : '-';

    const eWeights = lineup.estribor.map((id) => getWeight(id)).filter((w) => w > 0);
    const totalEstribor = eWeights.reduce((s, w) => s + w, 0);

    const bWeightsForSum = lineup.babor.slice(0, 6).map((id) => getWeight(id)).filter((w) => w > 0);
    const totalBabor = bWeightsForSum.reduce((s, w) => s + w, 0);

    return { avgWeight, avgAge, totalEstribor, totalBabor };
  };

  const computeDiffs = () => {
    if (!lineup) return [];
    const diffs: (number | null)[] = [];
    for (let i = 0; i < ESTRIBOR_COUNT; i++) {
      const eW = getWeight(lineup.estribor[i]);
      const bW = getWeight(lineup.babor[i]);
      if (eW > 0 && bW > 0) diffs.push(bW - eW);
      else diffs.push(null);
    }
    return diffs;
  };

  const stats = computeStats();
  const diffs = computeDiffs();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0" aria-describedby={undefined}>
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <DialogHeader className="sr-only">
              <DialogTitle>Cargando alineación</DialogTitle>
            </DialogHeader>
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : lineup ? (
          <div className="p-5 space-y-4">
            {/* Header */}
            <DialogHeader className="pb-0">
              <DialogTitle className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-primary" />
                {lineup.name || 'Sin nombre'}
              </DialogTitle>
              <p className="text-muted-foreground flex items-center gap-1.5 mt-1" style={{ fontSize: '0.75rem' }}>
                <Calendar className="w-3 h-3" />
                {new Date(lineup.date).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </DialogHeader>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2">
              <div className="border border-border rounded-lg p-2.5 text-center">
                <p className="text-muted-foreground mb-0.5" style={{ fontSize: '0.6rem', fontWeight: 500 }}>Peso Medio</p>
                <p style={{ fontSize: '1rem', fontWeight: 700 }}>{stats.avgWeight} <span className="text-muted-foreground" style={{ fontSize: '0.65rem' }}>kg</span></p>
              </div>
              <div className="border border-border rounded-lg p-2.5 text-center">
                <p className="text-muted-foreground mb-0.5" style={{ fontSize: '0.6rem', fontWeight: 500 }}>Edad Media</p>
                <p style={{ fontSize: '1rem', fontWeight: 700 }}>{stats.avgAge} <span className="text-muted-foreground" style={{ fontSize: '0.65rem' }}>años</span></p>
              </div>
              <div className="border border-green-500/30 rounded-lg p-2.5 text-center">
                <p className="text-green-600 mb-0.5" style={{ fontSize: '0.6rem', fontWeight: 500 }}>Total Estribor</p>
                <p className="text-green-700" style={{ fontSize: '1rem', fontWeight: 700 }}>
                  {stats.totalEstribor > 0 ? stats.totalEstribor.toFixed(1) : '-'} <span style={{ fontSize: '0.65rem' }}>kg</span>
                </p>
              </div>
              <div className="border border-red-500/30 rounded-lg p-2.5 text-center">
                <p className="text-red-600 mb-0.5" style={{ fontSize: '0.6rem', fontWeight: 500 }}>Total Babor</p>
                <p className="text-red-700" style={{ fontSize: '1rem', fontWeight: 700 }}>
                  {stats.totalBabor > 0 ? stats.totalBabor.toFixed(1) : '-'} <span style={{ fontSize: '0.65rem' }}>kg</span>
                </p>
              </div>
            </div>

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
                const eWeight = eId ? getWeight(eId) : 0;
                const bWeight = bId ? getWeight(bId) : 0;
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
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function DiffIndicator({ diff }: { diff: number | null }) {
  if (diff == null) return <span className="text-muted-foreground" style={{ fontSize: '0.7rem' }}>-</span>;

  const absDiff = Math.abs(diff);
  const isHighDiff = absDiff > 3;

  if (diff > 0) {
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
}