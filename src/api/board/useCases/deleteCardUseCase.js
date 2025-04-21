import Board from "../schemas";
import { AppError, handleError } from "../../../errors";

/**
 * Use case for deleting a card from a specific column in a board.
 *
 * @param {Object} params - The request parameters.
 * @param {string} params.userId - The ID of the user associated with the board.
 * @param {string} [params.cardId] - The ID of the card to be deleted (optional).
 * @returns {Promise<Object>} - The updated board with the card removed, or an error if the board is not found.
 * @throws {AppError} - If the board is not found or any other error occurs.
 *
 * @example
 * // Input params
 * {
 *   "userId": "1234567890abcdef",
 *   "cardId": "abcdef1234567890"
 * }
 *
 * // Output
 * {
 *   "userId": "1234567890abcdef",
 *   "columns": [
 *     {
 *       "id": "column1",
 *       "title": "To Do",
 *       "cards": []
 *     },
 *     {
 *       "id": "column2",
 *       "title": "In Progress",
 *       "cards": []
 *     }
 *   ]
 * }
 */
export const deleteCardUseCase = async (params) => {
  try {
    const board = await Board.findOne({ userId: params.userId });
    if (!board) {
      return AppError("Board not found", "Board", 404);
    }

    board.columns = board.columns.map((column) => ({
      ...column.toObject(),
      cards: column.cards.filter((card) => card.id !== params.cardId),
    }));

    return await board.save();
  } catch (error) {
    return handleError(error);
  }
};
