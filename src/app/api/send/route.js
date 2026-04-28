/**
 * Send Email API Route
 *
 * POST /api/send
 *
 * A versatile email sending endpoint that supports:
 * - Basic HTML emails
 * - React Email templates
 * - Preventing Gmail threading
 *
 * @see https://resend.com/docs/send-with-nodejs
 */

import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { WelcomeEmail } from '@/emails/welcome';
import { BillingFailure } from '@/emails/billing-failure';
import { resend } from '@/lib/resend';

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, from, subject, message, orgname, useReactEmail, useBillingFailure, name, preventThreading } =
      body;

    if (!to || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject' },
        { status: 400 },
      );
    }

    // Build the email options
    const emailOptions = {
      from: process.env.EMAIL_FROM,
      to: [to],
      subject: subject,
    };

	// Option 1: Use Billing Failure React Email template
	if (useBillingFailure && name) {
      emailOptions.react = BillingFailure({
        name,
        orgname: process.env.ORG_NAME,
        actionUrl: 'https://example.com/dashboard',
      });
    // Original Option 1: Use React Email template
    } else if (useReactEmail && name) {
      emailOptions.react = WelcomeEmail({
        name,
        actionUrl: 'https://example.com/dashboard',
      });
    } else if (message) {
      // Option 2: Use plain HTML
      emailOptions.html = `<p>${message}</p>`;
    } else {
      return NextResponse.json(
        { error: 'Missing message content' },
        { status: 400 },
      );
    }

    // Option 3: Prevent Gmail threading
    if (preventThreading) {
      emailOptions.headers = {
        'X-Entity-Ref-ID': randomUUID(),
      };
    }

    const { data, error } = await resend.emails.send(emailOptions);

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
      message: 'Email sent successfully',
      preventedThreading: preventThreading || false,
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 },
    );
  }
}
