# Next.js + Resend Examples (JavaScript)

A focused collection of examples demonstrating how to send emails with
[Resend](https://resend.com) using Next.js, JavaScript, and React components

This project was forked from next-js-resend-examples/javascript within this official repo:
https://github.com/resend/resend-examples

## Features

This project shrinks down the number of examples to focus on learning. It also customizes
and combines a number of components and provides some further explanations near the bottom
of the Readme.

As such there are 3 types of emails included:

### Sending Emails
- **Basic Send** - Simple HTML email sending via API route
- **Billing Failure** - A new straightforward Billing Failure example email using React components.
- **Regular Email** - An email using React components and quite a few user-editable fields.

## Quick Start

### Prerequisites

- Node.js 22+ (LTS)
- pnpm (recommended) or npm
- A [Resend](https://resend.com) account

### Installation

To set up, first go to a command line.
```bash
# Clone the repository
git clone https://github.com/mg-6502/nextjs-resend-billing-failure.git
cd nextjs-resend-billing-failure

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
```

### Configuration

Edit `.env` with your Resend API key in order to be able to send:

```env
RESEND_API_KEY=re_xxxxxxxxx
```

Get your API key from [resend.com/api-keys](https://resend.com/api-keys).

Edit remaining `.env` variables as explained in file.

### Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the examples.

### Preview Email Templates

```bash
pnpm email:dev
```

## Project Structure

```
src/
├── app/
│   ├── api/                  # API route
│   ├── billing-failure/      # Simple React Email
│   ├── regular-email/        # Full-Featured React Email
│   └── send-email/           # Basic send UI
├── components/               # Shared UI components
├── emails/                   # React Email templates
└── lib/
    └── resend.js             # Resend client
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (with JSDoc)
- **Email**: Resend + React Email
- **Styling**: Tailwind CSS 4

## How to use, and Further Explanations
### Getting Started
The quickest path to sending an email is to follow the instructions above to:
	1. Install the application
	2. Create your .env file and edit your .env variables
	3. Run the Development Server
	4. Open the localhost application instance in your web browser
Then, to send your first test:
	1. Go into the "Basic Send Email" and send your first test. 

In order to understand what's happening and send via code of your own, below are
explanations of how the three types of emails work, in order of increasing complexity.
Additionally you'll find notes further explaining the app architecture and where to
make changes if desired.

The application's main page source is at `src/app/page.jsx`.

### Basic Send Email
Page source: `src/app/send-email/page.jsx`

On this page you can quickly set To, Subject, and Message fields plus a quick send.
Beneath is an example of the basic code example it uses to send, showing how
the resend API can be passed data , including a simple html message.

The displayed example code changes dynamically based on what is typed into the form
fields and environment variables set in `.env`

The code example indicates the simplest way to send email via the Resend sending API,
but this page does its actual sending via a similar call within the Send Email API Route
(to be discussed below).

For reference, after you install/add the Resend Node.js SDK into your project
basic example code to send is:
```
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
const { data, error } = await resend.emails.send({
  from: from,
  to: to,
  subject: subject,
  html: '<p>${message}</p>',
});
```

### Billing Failure Email
Page source: `src/app/send-email/page.jsx`
Template: `src/emails/billing-failure.jsx`

The simpler form with only To and Recipient Name fields results in a more complex email.

At first glance it looks similar to the Basic Send Email, but the resulting email indicates
more. This email triggers the Send Email API Route to send a React email instead of simple
HTML. More details below after the emails.

Within the Send Email API Route is logic which detects if the Billing Failure Email is
being sent and brings in the appropriate React Email template.

### Regular Email
Page source: `src/app/regular-email/page.jsx`
Template: `src/emails/regular-email.jsx`
This email is a more complex form with a range of input fields.

Among many other fields it includes an optional attachment field for adding a .txt file.
This involves loading the file and converting it to base64 so it can be passed to the server
from the initial client page.

This email also uses the Send Email API Route, and the Route
then pulls in the relevant React Email template.

### Email API Route
Source: `src/app/api/send/route.js`

When any of the three email forms submits, they POST to this Route.

This handles the more complex sending logic coming from either the Billing Failure Email
or the Regular Email. 

The Route conditionally checks if an attachment is present for the send before defining
emailOptions appropriately. It then proceeds to determine which email is being sent based
on variables present, calls the appropriate template function, and then finally submits
the complete React Email content to the Resend send API.

In the event it doesn't find evidence of either React Email, it falls back to the plain
html email sending needed for the Basic Send Email.

## Resources

- [Resend Documentation](https://resend.com/docs)
- [React Email Documentation](https://react.email)
- [Next.js Documentation](https://nextjs.org/docs)
- [Resend Next.js](https://resend.com/docs/send-with-nextjs)

## Contributing

See something that could be improved? We welcome contributions! [Open an issue](https://github.com/resend/resend-examples/issues) to report a bug or suggest an improvement, or [submit a pull request](https://github.com/resend/resend-examples/pulls) with your changes.

## License

MIT
