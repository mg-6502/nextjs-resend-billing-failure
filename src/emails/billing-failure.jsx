/**
 * Billing Failure Email Template
 *
 * A React Email template for Billing Failure Notifications.
 *
 * @param {{ name: string, orgname: string, actionUrl?: string }} props
 */

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';

export function BillingFailure({
  name,
  orgname,
  actionUrl = 'https://example.com/dashboard',
}) {
  return (
    <Html lang="en">
      <Head />
      <Preview>We ran into a Billing Problem!</Preview>

      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-12 px-4 max-w-xl">
            <Text className="text-2xl font-bold text-black">{orgname}</Text>

            <Heading className="text-2xl font-bold text-gray-900 mt-8">
              Uh oh, {name}!
            </Heading>

            <Text className="text-base text-gray-700 leading-6">
              We love having you as a customer. Unfortunately there
              has been an issue with your billing information. To keep using
              our service you will need to log in to your account and update
              your payment method.
            </Text>

            <Text className="text-base text-gray-700 leading-6">
              Click the button below to jump to the main page, then update
              your information so you can keep using {orgname}.
            </Text>

            <Button
              href={actionUrl}
              className="bg-black text-white px-6 py-3 rounded-md font-medium mt-4 inline-block box-border"
            >
              Go to {orgname}
            </Button>

            <Hr className="border-gray-200 my-8" />

            <Text className="text-sm text-gray-500">
              If you didn&apos;t create an account with {orgname}, you can safely
              ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

// Preview props for React Email dev server
BillingFailure.PreviewProps = {
  name: 'John Doe',
  orgname: 'Acme',
  actionUrl: 'https://example.com/dashboard',
};

export default BillingFailure;
