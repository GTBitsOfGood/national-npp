import { Email } from "src/utils/types";

// StatusEmail is an example template
export class ChapterRemovalEmail implements Email {
  readonly templateName = "chapter-removal";

  constructor(
    public readonly data: { name: string; chapterName: string; reason: string }
  ) {}
}
