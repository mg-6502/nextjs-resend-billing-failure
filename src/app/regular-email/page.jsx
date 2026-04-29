'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/page-header';
import { ResultDisplay } from '@/components/result-display';

export default function RegularEmailPage() {
  const [to, setTo] = useState('delivered@resend.dev');
  const [name, setName] = useState('John Doe');
  const [subject, setSubject] = useState('Hello there!');
  const [message, setMessage] = useState(
	'This is main body text for a regular email from the Resend examples app.'
  );
  const [linkText, setLinkText] = useState(
	'Click Here!'
  );
  const [linkUrl, setLinkUrl] = useState(
	'https://example.com/dashboard'
  );  
  const [buttonText, setButtonText] = useState(
	'Click Here!'
  );
  const [buttonUrl, setButtonUrl] = useState(
	'https://example.com/dashboard'
  );  

 // This section gets file content into fileContent variable
 // Then converts to base64
 // Also marks there is no attachment by default. Sets to true when added.
 const [fileContent, setFileContent] = useState('');
 const [fileName, setFileName] = useState('');
 const [hasAttachment, setAttachment] = useState(false);
 console.log(hasAttachment)
 const b64Content = fileContent.split(',')[1];
  let fileReader;
  const handleFileRead = (e) => {
    setFileContent(e.target.result.toString());
  };
  const handleFileChosen = (file) => {
	setFileName(file.name);
	setAttachment(true);
	console.log(hasAttachment)
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsDataURL(file);
  };

  
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
          linkText,
          linkUrl,
		  fileName,
		  attachment: b64Content,
		  hasAttachment,
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
          <label htmlFor="linkText" className="block text-sm font-medium mb-1">
            (Optional) Link
          </label>
          <input
            id="linkText"
            type="text"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            className="w-full px-3 py-2 border border-[var(--border)] rounded-md bg-[var(--background)]"
          />
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            If you want, put text a supplemental link's text here.
          </p>
          <input
            id="linkUrl"
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="w-full px-3 py-2 border border-[var(--border)] rounded-md bg-[var(--background)]"
          />
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Put the optional link's destination URL here.
          </p>                      
        </div>
        
		<div>
			<label htmlFor="file" className="block text-sm font-medium mb-1">
			  (Optional) File Attachment
			</label>
			<input
			  id="file"
			  type="file"
			  className="input-file"
			  accept=".txt"
			  onChange={e => handleFileChosen(e.target.files[0])}
			/>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Click above to attach a .txt file.
          </p> 			
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
