import React, { useState } from 'react';
import { SOCIALS } from '../data';

export default function ConnectPage(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
  const [status,setStatus] = useState('idle');
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT; // set this in .env if using Formspree

  async function submit(e){
    e.preventDefault();
    if(!endpoint){ alert('Form not configured (VITE_FORMSPREE_ENDPOINT).'); return; }
    setStatus('sending');
    try{
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type':'application/json','Accept':'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      if(res.ok){ setStatus('success'); setName(''); setEmail(''); setMessage(''); setTimeout(()=>setStatus('idle'),1600); }
      else { setStatus('error'); setTimeout(()=>setStatus('idle'),2000); }
    } catch(err){ setStatus('error'); setTimeout(()=>setStatus('idle'),2000); }
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Connect with me</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <p className="small text-opacity-80">I’m available for product, compliance and AI consulting. Connect on social media or send a short message.</p>

          <div className="space-y-3">
            {SOCIALS.map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="card block small">
                <div className="flex justify-between items-center">
                  <div><div className="font-semibold">{s.name}</div><div className="small text-opacity-80">{s.label}</div></div>
                  <div className="small link-subtle">Open</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <input required placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} className="w-full p-3 border border-black/6 dark:border-white/6 rounded bg-transparent" />
          <input required placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 border border-black/6 dark:border-white/6 rounded bg-transparent" />
          <textarea required placeholder="Message" rows={6} value={message} onChange={e=>setMessage(e.target.value)} className="w-full p-3 border border-black/6 dark:border-white/6 rounded bg-transparent" />
          <div className="flex items-center gap-3">
            <button disabled={status==='sending'} type="submit" className="btn-primary">{status==='sending' ? 'Sending…' : 'Send'}</button>
            {status==='success' && <span className="text-[color:inherit]">Sent — thanks!</span>}
            {status==='error' && <span className="text-[color:inherit]">Failed — try again.</span>}
          </div>
        </form>
      </div>
    </section>
  );
}
