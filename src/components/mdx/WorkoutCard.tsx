import React from 'react';

export function WorkoutCard({ title, exercises, duration, difficulty }: any) {
  // Support both object arrays and simple string arrays from different agent payloads
  const normalizedExercises = exercises?.map((ex: any) => {
    if (typeof ex === 'string') {
      return { name: ex, sets: '-', reps: '-', rpe: '-', rest: '-' };
    }
    return ex;
  });

  return (
    <div className="not-prose my-12 w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050505] shadow-2xl">
      {/* Header */}
      <div className="border-b border-white/[0.05] bg-white/[0.02] px-6 md:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="m-0 text-2xl font-black uppercase tracking-tighter text-white flex items-center gap-3">
          <span className="w-1.5 h-8 bg-emerald-500 rounded-full inline-block"></span>
          {title}
        </h3>
        {duration && (
          <div className="flex gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-md border border-emerald-500/20">{duration}</span>
            {difficulty && <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-white/[0.05] px-3 py-1.5 rounded-md border border-white/[0.05]">{difficulty}</span>}
          </div>
        )}
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
            {normalizedExercises?.map((ex: any, i: number) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors even:bg-white/[0.01]">
                <td className="px-6 md:px-8 py-5 font-bold text-zinc-100 uppercase tracking-wide text-sm">{ex.name}</td>
                <td className="px-6 py-5 font-mono text-zinc-400 font-medium text-sm">{ex.sets}</td>
                <td className="px-6 py-5 font-mono text-zinc-400 font-medium text-sm">{ex.reps}</td>
                <td className="px-6 py-5 font-mono font-bold text-emerald-400 text-sm">{ex.rpe}</td>
                <td className="px-6 py-5 font-mono text-zinc-500 text-sm">{ex.rest}</td>
              </tr>
            ))}
            {(!normalizedExercises || normalizedExercises.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 md:px-8 py-10 text-center text-zinc-500 font-bold uppercase tracking-widest text-xs">
                  No drills defined for this block.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
