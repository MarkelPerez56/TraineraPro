export interface Rower {
  id: string;
  coach_id: string;
  first_name: string;
  age: number | null;
  weight: number | null;
  side: 'babor' | 'estribor' | 'ambos' | '';
  notes: string;
  created_at: string;
  updated_at: string;
}

export type RowerFormData = Omit<Rower, 'id' | 'coach_id' | 'created_at' | 'updated_at'>;

export const SIDES: { value: Rower['side']; label: string }[] = [
  { value: 'babor', label: 'Babor' },
  { value: 'estribor', label: 'Estribor' },
  { value: 'ambos', label: 'Ambos' },
];

// Ergometer training types
export interface ErgSeries {
  watts: number;
  minutes: number;
  meters?: number | null;
  spm?: number | null;
}

export interface ErgTraining {
  id: string;
  rower_id: string;
  coach_id: string;
  date: string;
  title: string;
  notes: string;
  series: ErgSeries[];
  created_at: string;
}

export type ErgTrainingFormData = Omit<ErgTraining, 'id' | 'coach_id' | 'created_at'>;