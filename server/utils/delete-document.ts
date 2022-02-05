import { FilterQuery, Model, Types } from "mongoose";
import NonprofitModel from "server/mongodb/models/Nonprofit";

/**
 * Used to cascade deletes through the "remove" hook defined on documents
 * Make sure the "remove" hook is defined on all relevant documents.
 *
 * If you add the "hasNoDependencies" to the statics of the schema, the
 * removal will be optimized (just a delete query instead of fetching all documents
 * and removing each one with its own delete query).
 *
 * @param model - the model of the document
 * @param filter - the filter that selects the documents to be deleted
 *
 * @return - the number deleted
 */
export async function deleteDocumentAndDependencies<T>(
  model: Model<T> & { hasNoDependencies?: () => boolean },
  filter: FilterQuery<T>
): Promise<number> {
  if (model.hasNoDependencies && model.hasNoDependencies()) {
    return (await model.deleteMany(filter)).deletedCount ?? 0;
  }
  // Use the "remove" function on each individual document, so the
  // "remove" cleanup hook is called to cleanup their dependencies
  return (
    await Promise.all(
      (await model.find(filter)).map((document) => document.remove())
    )
  ).length;
}
