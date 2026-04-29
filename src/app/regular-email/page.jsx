'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { ResultDisplay } from '@/components/result-display';

export default function RegularEmailPage() {
  const [to, setTo] = useState('delivered@resend.dev');
  const [name, setName] = useState('John Doe');
  const [subject, setSubject] = useState('Hello there!');
  const [message, setMessage] = useState(
	'This is main body text for a regular email from the Resend examples app.'
  );
  const [buttonText, setButtonText] = useState(
	'Click Here!'
  );
  const [buttonUrl, setButtonUrl] = useState(
	'https://example.com/dashboard'
  );  
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          subject,
          useReactEmail: true,
          name,
          message,
          buttonText,
          buttonUrl,
        }),
      });
      const data = await response.json();
      setResult(response.ok ? { data } : { error: data.error });
    } catch (err) {
      setResult({ error: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <PageHeader
        title="Regular Email"
        description="Build functional emails, enhanced with React components."
        sourcePath="src/app/regular-email/page.jsx"
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="to" className="block text-sm font-medium mb-1">
            To
          </label>
          <input
            id="to"
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            className="w-full px-3 py-2 border border-[var(--border)] rounded-md bg-[var(--background)]"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full px-3 py-2 border border-[var(--border)] rounded-md bg-[var(--background)]"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Recipient Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-[var(--border)] rounded-md bg-[var(--background)]"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full px-3 py-2 border border-[var(--border)] rounded-md bg-[var(--background)]"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Main Button
          </label>
          <input
            id="buttonText"
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            required
            className="w-full px-3 py-2 border border-[var(--border)] rounded-md bg-[var(--background)]"
          />
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Put your main button text here.
          </p>
          <input
            id="buttonUrl"
            type="url"
            value={buttonUrl}
            onChange={(e) => setButtonUrl(e.target.value)}
            required
            className="w-full px-3 py-2 border border-[var(--border)] rounded-md bg-[var(--background)]"
          />
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Put the button's destination URL here.
          </p>                      
        </div>        

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-md font-medium hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Email'}
        </button>
      </form>
      <ResultDisplay
        data={result?.data}
        error={result?.error}
        loading={loading}
      />
    </main>
  );
}
