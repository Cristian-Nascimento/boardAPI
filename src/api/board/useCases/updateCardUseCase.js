import Board from "../schemas";
import { AppError, handleError } from "../../../errors";

/**
 * Use case for updating the content of a specific card in a board.
 *
 * @param {Object} body - The request body containing the updated card details.
 * @param {string} body.content - The new content for the card.
 * @param {Object} params - The request parameters.
 * @param {string} params.userId - The ID of the user associated with the board.
 * @param {string} params.cardId - The ID of the card to be updated.
 * @returns {Promise<Object>} - The updated board with the modified card.
 * @throws {AppError} - If the board is not found or any other error occurs.
 *
 * @example
 * // Input body
 * {
 *   "content": "Updated card content"
 * }
 *
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
 *       "cards": [
 *         {
 *           "id": "abcdef1234567890",
 *           "content": "Updated card content",
 *           "updatedAt": "2025-04-20T12:00:00.000Z"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export const updateCardUseCase = async (body, params) => {
  try {
    const { content } = body;

    const board = await Board.findOne({ userId: params.userId });
    if (!board) {
      return AppError("Board not found", "Board", 404);
    }

    board.columns = board.columns.map((column) => {
      const updatedCards = column.cards.map((card) => {
        if (card.id === params.cardId) {
          return {
            ...card.toObject(),
            content,
            updatedAt: new Date(),
          };
        }
        return card;
      });

      return {
        ...column.toObject(),
        cards: updatedCards,
      };
    });

    return await board.save();
  } catch (error) {
    return handleError(error);
  }
};
