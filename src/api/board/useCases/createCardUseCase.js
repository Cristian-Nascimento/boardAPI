import Board from "../schemas";
import { AppError, handleError } from "../../../errors";
import mongoose from 'mongoose'

/**
 * Use case for adding a new card to a specific column in a board.
 *
 * @param {Object} body - The request body containing the card details.
 * @param {string} body.columnId - The ID of the column where the card will be added.
 * @param {string} body.content - The content of the card.
 * @param {Object} params - The request parameters.
 * @param {string} params.userId - The ID of the user associated with the board.
 * @returns {Promise<Object>} - The updated board with the new card added.
 * @throws {AppError} - If the board is not found or any other error occurs.
 *
 * @example
 * // Input body
 * {
 *   "columnId": "column1",
 *   "content": "New Task"
 * }
 *
 * // Input params
 * {
 *   "userId": "1234567890abcdef"
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
 *           "id": "64e8f9c2b5f1a2d3e4f56789",
 *           "content": "New Task",
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
export const createCardUseCase = async (body, params) => {
  try {
    const { columnId, content } = body;

    const board = await Board.findOne({ userId: params.userId });
    if (!board) {
      return AppError("Board not found", "Board", 404);
    }

    const newCard = {
      id: new mongoose.Types.ObjectId(),
      content,
      columnId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    board.columns = board.columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column.toObject(),
          cards: [...column.cards.toObject(), newCard],
        };
      }
      return column;
    });

    return await board.save();
  } catch (error) {
    return handleError(error);
  }
};
