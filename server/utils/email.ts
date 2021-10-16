import { Email } from "src/utils/types";

const APP_BASE_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : `https://${process.env.VERCEL_URL as string}`;

/**
 * Used to send an email from the backend
 * @param to - the recipient of the email
 * @param email - the configuration for the email
 */
export async function sendEmail(to: string, email: Email): Promise<void> {
  return sendEmailThroughMicroservice(
    {
      templateName: email.templateName,
      data: {
        // default locals
        ...{
          baseUrl: APP_BASE_URL,
        },
        // template data
        ...email.data,
      },
    },
    to
  );
}

async function sendEmailThroughMicroservice(
  email: Email,
  to: string
): Promise<void> {
  const fetchResult = await fetch(`${APP_BASE_URL}/api/email`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        process.env.INTERNAL_EMAIL_ENDPOINT_KEY as string
      }`, // ensures request is coming from the backend
    },
    body: JSON.stringify({ to, email }),
  });
  const jsonResult = (await fetchResult.json()) as {
    message?: string;
    sent?: boolean;
  } | null;

  if (jsonResult == null) {
    throw new Error(
      `'Could not connect to e-mail microservice!' (status=${fetchResult.status})`
    );
  }
  if (!fetchResult.ok) {
    if (!jsonResult.message) {
      throw new Error(
        `Received an unkown bad response (status=${
          fetchResult.status
        }): ${JSON.stringify(jsonResult)}`
      );
    }
    throw new Error(
      `Received a bad response (status=${fetchResult.status}): ${jsonResult.message}`
    );
  }
  if (!jsonResult.sent) {
    throw new Error("Failed to send email");
  }
}
