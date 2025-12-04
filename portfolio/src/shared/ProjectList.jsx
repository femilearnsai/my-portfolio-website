import React, { useState } from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'


function ProjectsList({ projects, openProject }) {
    const [filter, setFilter] = useState('all')
    const filtered = projects.filter(p => filter === 'all' ? true : p.status === filter)


    
    function trackClick(evt, action, label) {
        console.log('track', { action, label })
        if (window.dataLayer) window.dataLayer.push({ event: 'click', action, label })
    }


    return (
        <section className="max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold">Projects</h2>


            <div className="mt-4 flex gap-2">
                <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-slate-800 text-white' : 'border'}`}>All</button>
                <button onClick={() => setFilter('completed')} className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-slate-800 text-white' : 'border'}`}>Completed</button>
                <button onClick={() => setFilter('ongoing')} className={`px-3 py-1 rounded ${filter === 'ongoing' ? 'bg-slate-800 text-white' : 'border'}`}>Ongoing</button>
            </div>


            <div className="mt-6 grid sm:grid-cols-2 gap-6">
                {filtered.map(p => (
                    <article key={p.id} className="p-4 border rounded hover:shadow cursor-pointer" onClick={() => openProject(p)}>
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold">{p.title}</h3>
                            <span className={`text-sm px-2 py-1 rounded ${p.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{p.status}</span>
                        </div>


                        <p className="mt-2 text-gray-300">{p.summary}</p>


                        <div className="mt-3 flex gap-2 flex-wrap">
                            {p.tags.map(t => <span key={t} className="text-xs border rounded px-2 py-0.5">{t}</span>)}
                        </div>


                        <div className="mt-4 flex gap-2">
                            {p.link && (
                                <a href={p.link} target="_blank" rel="noreferrer" onClick={(e) => { e.stopPropagation(); trackClick(e, 'visit_project', p.title) }} className="px-3 py-1 border rounded text-sm flex items-center gap-2">
                                    Visit <ArrowTopRightOnSquareIcon className="w-4 h-4 inline-block" />
                                </a>
                            )}


                            <button onClick={(e) => { e.stopPropagation(); trackClick(e, 'open_details', p.title); openProject(p) }} className="px-3 py-1 bg-slate-800 text-white rounded text-sm">Details</button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
export default ProjectsList