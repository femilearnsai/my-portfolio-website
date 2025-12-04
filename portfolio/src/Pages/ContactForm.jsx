import React, { useState } from 'react'
// If you prefer Netlify Forms or a serverless function, see notes after the component.
function ContactForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('idle') // idle | sending | success | error
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT


    async function submit(e) {
        e.preventDefault()
        if (!endpoint) {
            // Fallback: client-side validation and console log
            console.error('No Formspree endpoint configured. Set VITE_FORMSPREE_ENDPOINT in .env')
            alert('Contact form is not configured. Please set the VITE_FORMSPREE_ENDPOINT environment variable.')
            return
        }


        setStatus('sending')
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            })


            if (res.ok) {
                setStatus('success')
                setName(''); setEmail(''); setMessage('')
                // brief success indicator then back to idle
                setTimeout(() => setStatus('idle'), 1800)
            } else {
                const data = await res.json().catch(() => ({}))
                console.error('Formspree error', data)
                setStatus('error')
                setTimeout(() => setStatus('idle'), 2200)
            }
        } catch (err) {
            console.error('Network error', err)
            setStatus('error')
            setTimeout(() => setStatus('idle'), 2200)
        }
    }


    return (
        <form onSubmit={submit} className="mt-4 space-y-3">
            <input required placeholder="Your name" className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} />
            <input required placeholder="Your email" type="email" className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
            <textarea required placeholder="Short message" className="w-full border rounded px-3 py-2" rows={4} value={message} onChange={e => setMessage(e.target.value)} />
            <div className="flex items-center gap-3">
                <button disabled={status === 'sending'} type="submit" className="px-4 py-2 bg-slate-800 text-white rounded">
                    {status === 'sending' ? 'Sending…' : 'Send'}
                </button>
                {status === 'success' && <span className="text-green-600">Sent — thanks!</span>}
                {status === 'error' && <span className="text-red-600">Failed to send. Try again.</span>}
            </div>
        </form>
    )
}
export default ContactForm