import React, { useState } from 'react';
import PaystackPop from '@paystack/inline-js';

export default function BookingPage() {
  const [form, setForm] = useState({ name:'', email:'', company:'', topic:'', duration:'30min', currency:'NGN', files:[] });
  const [status, setStatus] = useState('idle');

  const prices = { '30min': 30000, '1hr': 50000, '3hr': 130000 };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, files });
    else setForm({ ...form, [name]: value });
  };

  const payAndBook = () => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: 'pk_test_xxx', // placeholder
      email: form.email,
      amount: prices[form.duration] * 100,
      currency: form.currency,
      onSuccess: async transaction => {
        setStatus('sending');
        const data = new FormData();
        Object.entries(form).forEach(([k,v]) => {
          if(k==='files') Array.from(v).forEach(f=>data.append('files', f));
          else data.append(k,v);
        });
        data.append('paystackReference', transaction.reference);

        const res = await fetch('http://localhost:5000/api/book', { method:'POST', body:data });
        const result = await res.json();
        if(result.success) setStatus('success');
        else setStatus('error');
      },
      onCancel: () => alert('Payment cancelled')
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold">Book a Consultation</h2>
      <input placeholder="Name" name="name" value={form.name} onChange={handleChange} className="w-full p-3 border rounded"/>
      <input placeholder="Email" name="email" value={form.email} onChange={handleChange} className="w-full p-3 border rounded"/>
      <input placeholder="Company" name="company" value={form.company} onChange={handleChange} className="w-full p-3 border rounded"/>
      <input placeholder="Topic" name="topic" value={form.topic} onChange={handleChange} className="w-full p-3 border rounded"/>
      <label>Upload files (optional)</label>
      <input type="file" multiple name="files" onChange={handleChange}/>
      <select name="duration" value={form.duration} onChange={handleChange} className="p-2 border rounded">
        <option value="30min">30 minutes - ₦30,000</option>
        <option value="1hr">1 hour - ₦50,000</option>
        <option value="3hr">3 hours - ₦130,000</option>
      </select>
      <select name="currency" value={form.currency} onChange={handleChange} className="p-2 border rounded">
        <option value="NGN">NGN</option>
        <option value="USD">USD</option>
      </select>
      <button onClick={payAndBook} className="btn-primary">{status==='sending'?'Processing…':'Pay & Book'}</button>
      {status==='success' && <p className="text-green-600">Booking confirmed!</p>}
      {status==='error' && <p className="text-red-600">Error occurred. Try again.</p>}
    </div>
  );
}
