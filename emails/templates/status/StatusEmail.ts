import { Email } from "src/utils/types";
import urls from "src/utils/urls";

// StatusEmail is an example template
export class StatusEmail implements Email {
  readonly templateName = "status";

  get data() {
    return {
      ...this.templateData,
      urlString: urls.baseUrl, // TODO: Change to homepage URL
    };
  }

  constructor(private templateData: { name: string; status: number }) {}
}
