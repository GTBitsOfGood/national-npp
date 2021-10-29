import path from "path";
import Email, { NodeMailerTransportOptions } from "email-templates";
import { NextApiRequest, NextApiResponse } from "next";
import { Email as NPPEmail } from "src/utils/types";

const FROM_ADDRESS = `"GT Bits of Good" <${process.env.EMAIL_FROM as string}>`;
const TRANSPORT_CONFIG: NodeMailerTransportOptions = {
  service: "Zoho",
  auth: {
    user: process.env.EMAIL_SERVER_USER as string,
    pass: process.env.EMAIL_SERVER_PASSWORD as string,
  },
};
const EMAIL_DIRECTORY_PATH = `${process.cwd()}/emails`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  /*
  double check this value is actually configured for the application environment
  because we use it to ensure "email requests "only come from lambda functions
  belonging to this application. we don't want anyone to be able to send an
  email through our service.

  if this value is not set for a public environment, the environment is insecure
  */
  if (!process.env.INTERNAL_EMAIL_ENDPOINT_KEY) {
    throw new Error("No internal mail key set");
  }

  if (
    req.headers.authorization !=
    `Bearer ${process.env.INTERNAL_EMAIL_ENDPOINT_KEY}`
  ) {
    res.status(401).json({
      message: "Email authorization key incorrect",
    });
    return;
  }

  const { to, email } = req.body as { to: unknown; email: unknown };

  if (!to || !(typeof to == "string")) {
    res.status(400).json({
      message: "Missing to or invalid syntax for to",
    });
    return;
  }

  if (!isNPPEmail(email)) {
    res.status(400).json({
      message: "Missing config or invalid syntax config",
    });
    return;
  }

  await fillTemplateAndSend(to, email);
  res.status(201).json({
    sent: true,
  });
}

function isNPPEmail(email: unknown): email is NPPEmail {
  return (
    email != null &&
    email instanceof Object &&
    "templateName" in email &&
    "data" in email
  );
}

function fillTemplateAndSend(to: string, config: NPPEmail): Promise<never> {
  const templateFolder = path.join(
    EMAIL_DIRECTORY_PATH,
    `/templates/${config.templateName}`
  );
  const email = new Email({
    message: {
      from: FROM_ADDRESS,
    },
    transport: TRANSPORT_CONFIG,
    send: true, // might want to conditionally send emails based on environment (preview, dev, prod)
    juice: true,
    juiceResources: {
      preserveImportant: true,
      webResources: {
        relativeTo: EMAIL_DIRECTORY_PATH + "/",
      },
    },
  });
  return email.send({
    template: templateFolder,
    message: {
      to: to,
    },
    locals: config.data,
  }) as Promise<never>;
}
