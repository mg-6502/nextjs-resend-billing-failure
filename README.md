# Next.js + Resend Examples (JavaScript)

A focused collection of examples demonstrating how to send emails with
[Resend](https://resend.com) using Next.js, JavaScript, and React components

This project was forked from next-js-resend-examples/javascript within this official repo:
https://github.com/resend/resend-examples

## Features

This project shrinks down the number of examples to focus on learning.

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

## Further Explanations
Below are explanations of how the three types of emails work, in order of
increasing complexity. Additionally you'll find notes further explaining the app
architecture and where to make changes if desired.

The main page is at `src/app/page.jsx`.

### Basic Send Email
Page source: `src/app/send-email/page.jsx`

On this page you can quickly set To, Subject, and Message fields plus a quick send.
Beneath is an example of the basic code example it uses to send, showing how
the resend API can be passed data directly, including the primary html message.

The displayed example code changes dynamically based on what is typed into the form
fields and environment variables set in `.env`

This includes direct interaction with the Resend sending API.

### Billing Failure Email
Page source: `src/app/send-email/page.jsx`
Template: `src/emails/billing-failure.jsx`

The simpler form with only To and Recipient Name fields results in a more complex email.

At first glance it looks similar to the Basic Send Email, but instead of doing its own
sending it sends a POST action to the Send Email API Route within the app allowing for more
complex sending handling. This will be addressed below after the emails.

Within the Send Email API Route is logic which detects if the Billing Failure Email is
being sent and brings in the appropriate template.

### Regular Email
Page source: `src/app/regular-email/page.jsx`
Template: `src/emails/regular-email.jsx`
This email is a more complex form with a range of input fields.

Among many other fields it includes an optional attachment field for adding a .txt file.
This involves loading the file and converting it to base64 so it can be passed to the server
from the initial client page.

This email uses the same Send Email API Route as the Billing Failure Email, and the Route
then pulls in the relevant template.

### Email API Route
Source: `src/app/api/send/route.js`

This handles the more complex sending logic coming from either the Billing Failure Email
or the Regular Email. When either of those forms submits, they POST to this Route.

The Route conditionally checks if an attachment is present for the send before defining
emailOptions appropriately. It then proceeds to determine which email is being sent based
on variables present, calls the appropriate template function, and then finally submits
the complete email content to the Resend send API.

## Resources

- [Resend Documentation](https://resend.com/docs)
- [React Email Documentation](https://react.email)
- [Next.js Documentation](https://nextjs.org/docs)

## Contributing

See something that could be improved? We welcome contributions! [Open an issue](https://github.com/resend/resend-examples/issues) to report a bug or suggest an improvement, or [submit a pull request](https://github.com/resend/resend-examples/pulls) with your changes.

## License

MIT
