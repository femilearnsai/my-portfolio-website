import React from 'react';
import { HONOURS } from '../data';

export default function HonoursPage(){
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Honours & Achievements</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {HONOURS.map(h => (
          <div key={h.title} className="card">
            <div className="flex justify-between items-center">
              <div>
                <div className="small text-opacity-80">{h.year}</div>
                <div className="font-semibold">{h.title}</div>
              </div>
            </div>
            <p className="mt-2 small text-opacity-80">{h.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
