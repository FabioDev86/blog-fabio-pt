import React from 'react';

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rpe: string;
  rest: string;
}

interface WorkoutCardProps {
  title: string;
  exercises?: any;
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export function WorkoutCard(props: any) {
  // 1. Destructure with fallbacks for common aliases to bypass MDX/RSC mapping issues
  const { 
    title = props.title || props.header || 'Workout Routine',
    duration = props.duration || props.time || '',
    difficulty = props.difficulty || props.level || '',
  } = props;

  // 2. Search for the exercise list in all possible prop names (Universal Prop-Net)
  const incomingExercises = props.exercises || props.routine || props.data || props.list || props.workout || props.rows || props.children || [];
  
  // 3. DIAGNOSTIC OVERLAY info
  const arrivingKeys = Object.keys(props).join(', ');
  let debugLength = 0;

  // 4. Super-Resilient Parsing Pipeline
  let rawExercises: any[] = [];
  
  // CASE A: It's an array already (Ideal, but often stripped in MDX v6)
  if (Array.isArray(incomingExercises) && incomingExercises.length > 0) {
    rawExercises = incomingExercises;
  } 
  // CASE B: It's a string (Ultra-Safe in MDX v6)
  else if (typeof incomingExercises === 'string' && incomingExercises.trim().length > 0) {
    const trimmed = incomingExercises.trim();
    
    // B1: Attempt to parse as JSON stringified array
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      try {
        const parsed = JSON.parse(incomingExercises.replace(/'/g, '"')); // Allow single quotes in MDX prop if escaped
        rawExercises = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        // Fallback to pipe parsing
      }
    }
    
    // B2: Parse as Pipe-Delimited text (The "Fabio Format")
    // Format: "Name | Sets | Reps | RPE | Rest ; Name | ..."
    if (rawExercises.length === 0) {
      const rows = incomingExercises.split(/[;\n]/).filter(r => r.trim());
      rawExercises = rows.map(row => {
        const parts = row.split('|').map(p => p.trim());
        if (parts.length > 1) {
          return {
            name: parts[0] || 'Unnamed Drill',
            sets: parts[1] || '-',
            reps: parts[2] || '-',
            rpe: parts[3] || '-',
            rest: parts[4] || '-'
          };
        }
        return { name: row.trim(), sets: '-', reps: '-', rpe: '-', rest: '-' };
      });
    }
  } 
  // CASE C: Single object pass
  else if (incomingExercises && typeof incomingExercises === 'object' && !Array.isArray(incomingExercises)) {
    rawExercises = [incomingExercises];
  }

  debugLength = rawExercises.length;

  // 5. Final Normalization for Table Rendering
  const normalizedExercises: Exercise[] = rawExercises.map(ex => {
    if (!ex) return { name: 'Null Event', sets: '-', reps: '-', rpe: '-', rest: '-' };
    if (typeof ex === 'string') return { name: ex, sets: '-', reps: '-', rpe: '-', rest: '-' };
    
    const e = ex as any;
    const getName = () => e.name || e.Name || e.title || e.exercise || e.Exercise || 'Unnamed Drill';
    const getSets = () => e.sets || e.Sets || e.round || e.rounds || '-';
    const getReps = () => e.reps || e.Reps || e.time || e.Time || e.duration || '-';
    const getRpe = () => e.rpe || e.Rpe || e.RPE || e.intensity || '-';
    const getRest = () => e.rest || e.Rest || '-';

    return {
      name: String(getName()),
      sets: String(getSets()),
      reps: String(getReps()),
      rpe: String(getRpe()),
      rest: String(getRest())
    };
  });

  return (
    <div className="not-prose my-12 w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050505] shadow-2xl">
      {/* Header */}
      <div className="border-b border-white/[0.05] bg-white/[0.02] px-6 md:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center justify-between w-full">
            <h3 className="m-0 text-2xl font-black uppercase tracking-tighter text-white flex items-center gap-3">
              <span className="w-1.5 h-8 bg-emerald-500 rounded-full inline-block"></span>
              {title}
            </h3>
            <div className="flex flex-col items-end opacity-20 font-mono text-[9px] uppercase tracking-widest text-zinc-400">
               <span>Debug count: {debugLength}</span>
               <span className="text-[7px]">Active Props: {arrivingKeys || 'none'}</span>
            </div>
          </div>
          {duration && (
            <div className="flex gap-3 mt-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-md border border-emerald-500/20">{duration}</span>
              {difficulty && <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-white/[0.05] px-3 py-1.5 rounded-md border border-white/[0.05]">{difficulty}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Real Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-[#0a0a0a]">
            <tr>
              <th className="px-6 md:px-8 py-5 text-xs font-black uppercase tracking-widest text-zinc-500 border-b border-white/[0.05]">Exercise / Drill</th>
              <th className="px-6 py-5 w-24 text-xs font-black uppercase tracking-widest text-zinc-500 border-b border-white/[0.05]">Sets</th>
              <th className="px-6 py-5 w-28 text-xs font-black uppercase tracking-widest text-zinc-500 border-b border-white/[0.05]">Reps/Time</th>
              <th className="px-6 py-5 w-20 text-xs font-black uppercase tracking-widest text-emerald-500 border-b border-white/[0.05]">RPE</th>
              <th className="px-6 py-5 w-24 text-xs font-black uppercase tracking-widest text-zinc-500 border-b border-white/[0.05]">Rest</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {normalizedExercises.length > 0 ? (
              normalizedExercises.map((ex, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors even:bg-white/[0.01]">
                  <td className="px-6 md:px-8 py-5 font-bold text-zinc-100 uppercase tracking-wide text-sm">{ex.name}</td>
                  <td className="px-6 py-5 font-mono text-zinc-400 font-medium text-sm">{ex.sets}</td>
                  <td className="px-6 py-5 font-mono text-zinc-400 font-medium text-sm">{ex.reps}</td>
                  <td className="px-6 py-5 font-mono font-bold text-emerald-400 text-sm">{ex.rpe}</td>
                  <td className="px-6 py-5 font-mono text-zinc-500 text-sm">{ex.rest}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 md:px-8 py-10 text-center text-zinc-500 font-mono text-[10px] uppercase tracking-widest bg-white/[0.01]">
                  No data found. Try passing exercises as a string: exercises="Name | Sets | Reps" 🥊
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
