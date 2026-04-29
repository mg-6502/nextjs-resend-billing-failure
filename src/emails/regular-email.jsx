/**
 * Welcome Email Template
 *
 * A React Email template for welcoming new users.
 *
 * @param {{ name: string, orgname: string, message: string, buttonText: string, buttonURL: string }} props
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

export function RegularEmail({
  name,
  orgname,
  message,
  buttonText,
  buttonUrl,
}) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Hello, {name}!</Preview>

      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-12 px-4 max-w-xl">
            <Text className="text-2xl font-bold text-black">{orgname}</Text>

            <Heading className="text-2xl font-bold text-gray-900 mt-8">
              Hi, {name}!
            </Heading>

            <Text className="text-base text-gray-700 leading-6">
              {message}
            </Text>

            <Button
              href={buttonUrl}
              className="bg-black text-white px-6 py-3 rounded-md font-medium mt-4 inline-block box-border"
            >
              {buttonText}
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
RegularEmail.PreviewProps = {
  name: 'John Doe',
  orgname: 'Acme',
  message: 'Sample body message',
  buttonText: 'Click Here',
  buttonUrl: 'https://example.com/dashboard',
};

export default RegularEmail;
