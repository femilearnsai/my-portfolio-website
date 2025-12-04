import React from 'react';
import StatCard from '../shared/StatCard';
import { PROJECTS, SKILLS } from '../data';
import ContactForm from '../Pages/ContactForm'
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <section className="space-y-12">
            {/* HERO */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Left: text */}
                <div className="space-y-6">
                    <div className="fade-in-up">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">Hi — I’m Oluwapelumi.</h1>
                        <p >
                            <h3 className="mt-2 text-s md:text-m font-bold leading-tight">Lawyer. Builder. Writer.</h3>

                            <p className="mt-2 small text-opacity-80">I build global legally-compliant products and systems at the intersection of law, finance and AI.</p>
                            <p className="mt-2 small text-opacity-80">I help startups and institutions build and integrate&nbsp;<strong>ethical, compliant, and investor-ready</strong> technology.</p>
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">
                        <Link to="/projects" className="btn-primary">View projects</Link>
                        <Link to="/connect" className="card btn-primary">Get in touch</Link>
                    </div>

                    <div className="mt-8 grid sm:grid-cols-2 gap-4">
                        <StatCard label="Years entrepreneurship" value={16} suffix="+" duration={3000} />
                        <StatCard label="Compliance experience (yrs)" value={2} suffix="+ yrs" duration={900} />
                        <StatCard label="Presentations" value={10} duration={2000} />
                        <StatCard label="Awards" value={15} duration={3000} />
                    </div>
                </div>


                <div className="space-y-6">
                    <div className="card p-6 fade-in-up float-slow flex flex-col md:flex-row items-center gap-6">
                        <div className="flex justify-center items-center">
                            <img
                                src="https://media.licdn.com/dms/image/v2/D4D22AQEX4iysl8FEdA/feedshare-shrink_800/B4DZmuRqTtHwAg-/0/1759565516505?e=2147483647&v=beta&t=OiX9My7tTDlwUpBm9KFgDfnWFT_-2xp8Lp5ZZulD5ZE"
                                alt="Oluwapelumi Awoyale"
                                className="w-full h-full object-cover max-w-xs rounded-xl"
                            />

                            <div className="mt-4 flex-1 gap-5 space-16">
                                <Link to="/honours" className="small link-subtle space-16 border-2"> Honours</Link>
                                {/* <Link to="/skills" className="small link-subtle border-2">Skills</Link> */}
                            </div>
                        </div>
                    </div>

                    {/* Highlight mini-features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="card p-4 fade-in-up">
                            <div className="font-semibold">Product Strategy</div>
                            <div className="small text-opacity-80 mt-2">Roadmaps, product-market fit, and investor narratives.</div>
                        </div>
                        <div className="card p-4 fade-in-up">
                            <div className="font-semibold">Compliance & IP</div>
                            <div className="small text-opacity-80 mt-2">Contracts, IP strategy, and regulatory alignment.</div>
                        </div>
                    </div>
                </div>
            </div>

            
            <div>
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Selected projects</h2>
                    <Link to="/projects" className="small link-subtle">See all →</Link>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-6">
                    {PROJECTS.slice(0, 6).map(p => (
                        <a key={p.id} href={p.link} target="_blank" rel="noreferrer" className="card p-4 hover:translate-y-[-6px] transition-transform">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold">{p.title}</h3>
                                <span className="small text-opacity-80">{p.status}</span>
                            </div>
                            <p className="mt-2 small text-opacity-80">{p.summary}</p>
                            <div className="mt-3 small link-subtle">Visit →</div>
                        </a>
                    ))}
                </div>
            </div>

            {/* SKILLS PREVIEW */}
            <div>
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Skills</h2>
                    <Link to="/skills" className="small link-subtle">See all →</Link>
                </div>

                <div className="mt-6 space-y-4">
                    {SKILLS.slice(0, 4).map(s => (
                        <div key={s.name} className="space-y-2">
                            <div className="flex justify-between small"><span>{s.name}</span><span>{s.level}%</span></div>
                            <div className="w-full h-3 progress-track rounded overflow-hidden">
                                <div className="h-3" style={{ width: `${s.level}%`, background: 'currentColor', transition: 'width 800ms ease' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CONTACT PREVIEW (small inline) */}
            <div>
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Let’s work together</h2>
                    <Link to="/connect" className="small link-subtle">Contact →</Link>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div className="card p-4">
                        <div className="font-semibold">Available for:</div>
                        <ul className="mt-3 small text-opacity-80 list-disc list-inside space-y-1">
                            <li>Litigation and Legal Research</li>
                            <li>Transactions & compliance advisory</li>
                            <li>Product Advisory and Fundraising prep </li>
                        </ul>
                    </div>

                    <div className="card p-4">
                        
                        <div className="font-semibold">Quick message</div>
                        <p className="small text-opacity-80 mt-2">Prefer to send a short note that reaches me directly?</p>
                        <div className="mt-4">
                            <Link to="/connect" className="btn-primary">Send a message</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
