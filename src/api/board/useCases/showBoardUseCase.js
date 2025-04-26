import Board from "../schemas";
import { AppError, handleError } from "../../../errors";

/**
 * Use case for retrieving a board by user ID.
 *
 * @param {string} id - The ID of the user whose board is being retrieved.
 * @returns {Promise<Object>} - The board data in JSON format.
 * @throws {AppError} - If the board is not found or any other error occurs.
 *
 * @example
 * // Input
 * const userId = "1234567890abcdef";
 *
 * // Output
 * {
 *   "userId": "1234567890abcdef",
 *   "columns": [
 *     {
 *       "id": "column1",
 *       "title": "To Do",
 *       "cards": [
 *         {
 *           "id": "card1",
 *           "content": "Task 1",
 *           "columnId": "column1"
 *         }
 *       ]
 *     },
 *     {
 *       "id": "column2",
 *       "title": "In Progress",
 *       "cards": []
 *     }
 *   ]
 * }
 */
export const showBoardUseCase = async (id) => {
  try {
    const target = await Board.findOne({ userId: id }).lean();
    if (!target) throw new AppError("Board was not found!", null, 404);
    console.log(`Board found: ${JSON.stringify(target)}`);
    return target;
  } catch (error) {
    return handleError(error);
  }
};
