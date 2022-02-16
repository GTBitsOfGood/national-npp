import { Email } from "src/utils/types";

// StatusEmail is an example template
export class NonprofitRemovalEmail implements Email {
  readonly templateName = "nonprofit-removal";

  constructor(
    public readonly data: {
      name: string;
      nonprofitName: string;
      reason: string;
    }
  ) {}
}
