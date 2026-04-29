import Link from 'next/link';

/**
 * All available examples organized by category
 */
const examples = [
  {
    category: 'Send Emails',
    items: [
      {
        title: 'Basic Send',
        description: 'Send a simple email with HTML content',
        href: '/send-email',
        type: 'page',
      },
      {
        title: 'Billing Failure',
        description: 'Send a billing failure email to a customer',
        href: '/billing-failure',
        type: 'page',
      },          
      {
        title: 'Regular Email',
        description: 'Send a regular email with several components',
        href: '/regular-email',
        type: 'page',
      },
    ],
  },
];

/**
 * Home Page
 *
 * Displays a navigation grid of all available examples.
 * Each example links to its dedicated page with a working demo.
 */
export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Resend Examples</h1>
        <p className="text-lg text-[var(--muted-foreground)]">
          Limited examples for sending emails with{' '}
          <a
            href="https://resend.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--foreground)] underline hover:no-underline"
          >
            Resend
          </a>{' '}
          and Next.js. Each example includes commented code to help you
          learn.
        </p>
      </div>

      {/* Setup Instructions */}
      <div className="mb-12 p-4 rounded-lg bg-[var(--muted)] border border-[var(--border)]">
        <h2 className="font-semibold mb-2">Quick Setup</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm text-[var(--muted-foreground)]">
          <li>
            Copy{' '}
            <code className="bg-[var(--background)] px-1 rounded">
              .env.example
            </code>{' '}
            to <code className="bg-[var(--background)] px-1 rounded">.env</code>
          </li>
          <li>
            Add your Resend API key from{' '}
            <a
              href="https://resend.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              resend.com/api-keys
            </a>
          </li>
          <li>
            Run{' '}
            <code className="bg-[var(--background)] px-1 rounded">
              pnpm dev
            </code>{' '}
            and explore!
          </li>
        </ol>
      </div>

      {/* Examples Grid */}
      {examples.map((section) => (
        <div key={section.category} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-[var(--muted-foreground)]">
            {section.category}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block p-4 rounded-lg border border-[var(--border)] hover:border-[var(--foreground)] transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{item.title}</h3>
                  {item.type === 'api' && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--muted)] text-[var(--muted-foreground)]">
                      API
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--muted-foreground)]">
        <p>
          View the source on{' '}
          <a
            href="https://github.com/mg-6502/nextjs-resend-billing-failure"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            GitHub
          </a>{' '}
          &middot; Built with{' '}
          <a
            href="https://resend.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            Resend
          </a>
        </p>
      </footer>
    </main>
  );
}
