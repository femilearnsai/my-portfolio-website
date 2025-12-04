import React from 'react';
import { PROJECTS } from '../data';

export default function ProjectsPage(){
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map(p => (
          <a key={p.id} href={p.link} className="card hover:translate-y-[-4px] transition-transform">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{p.title}</h3>
              <span className="small">{p.status}</span>
            </div>
            <p className="mt-2 small text-opacity-80">{p.summary}</p>
            <div className="mt-3 small link-subtle">Visit →</div>
          </a>
        ))}
      </div>
    </section>
  );
}
