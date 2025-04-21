import Board from "../schemas";
import { AppError, handleError } from "../../../errors";

/**
 * Use case for moving a card to a different column in a board.
 *
 * @param {Object} body - The request body containing the new column ID.
 * @param {string} body.columnId - The ID of the column to which the card will be moved.
 * @param {Object} params - The request parameters.
 * @param {string} params.userId - The ID of the user associated with the board.
 * @param {string} params.cardId - The ID of the card to be moved.
 * @returns {Promise<Object>} - The updated board with the card moved to the new column.
 * @throws {AppError} - If the board is not found or any other error occurs.
 *
 * @example
 * // Input body
 * {
 *   "columnId": "newColumnId"
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
 *       "id": "oldColumnId",
 *       "title": "To Do",
 *       "cards": []
 *     },
 *     {
 *       "id": "newColumnId",
 *       "title": "In Progress",
 *       "cards": [
 *         {
 *           "id": "abcdef1234567890",
 *           "content": "Task 1",
 *           "columnId": "newColumnId",
 *           "updatedAt": "2025-04-20T12:00:00.000Z"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export const moveCardToColumnUseCase = async (body, params) => {
  try {
    const { columnId } = body;
    const board = await Board.findOne({ userId: params.userId });
    if (!board) {
      return AppError("Board not found", "Board", 404);
    }

    let movedCard;
    board.columns = board.columns.map((column) => {
      const card = column.cards.find((c) => c.id === params.cardId);
      if (card) {
        movedCard = { ...card.toObject(), columnId: columnId, updatedAt: new Date() };
      }
      return {
        ...column.toObject(),
        cards: column.cards.filter((c) => c.id !== params.cardId),
      };
    });

    if (movedCard) {
      board.columns = board.columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column.toObject(),
            cards: [...column.cards, movedCard],
          };
        }
        return column;
      });
    }

    return await board.save();
  } catch (error) {
    return handleError(error);
  }
};
