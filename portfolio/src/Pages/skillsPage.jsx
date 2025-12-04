import React from 'react';
import { SKILLS } from '../data';

export default function SkillsPage() {
    return (
        <section >
            <h2 className="text-2xl font-bold mb-6">Skills</h2>
            <div className="space-y-4">
                {SKILLS.map(s => (
                    <div key={s.name} className="space-y-2">
                        <div className="flex justify-between small"><span>{s.name}</span><span>{s.level}%</span></div>
                        <div className="progress-track w-full h-4 rounded overflow-hidden">
                            <div className="h-4" style={{ width: `${s.level}%`, background: 'currentColor', transition: 'width 800ms ease' }} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
