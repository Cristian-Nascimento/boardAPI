import { createCardUseCase } from "../useCases/createCardUseCase";
import { deleteCardUseCase } from "../useCases/deleteCardUseCase";
import { moveCardToColumnUseCase } from "../useCases/moveCardToColumnUseCase";
import { showBoardUseCase } from "../useCases/showBoardUseCase";
import { updateCardUseCase } from "../useCases/updateCardUseCase";

/**
 * Controller to retrieve a board by user ID.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} request.params - The request parameters.
 * @param {string} request.params.userId - The ID of the user whose board is being retrieved.
 * @param {Object} response - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - Returns the board data in JSON format.
 */
export const show = async (request, response, next) => {
  try {
    const document = await showBoardUseCase(request.params.userId);
    return response.status(200).json(document);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a card in a board.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} request.body - The request body containing updated card details.
 * @param {Object} request.params - The request parameters.
 * @param {string} request.params.userId - The ID of the user associated with the board.
 * @param {string} request.params.cardId - The ID of the card to be updated.
 * @param {Object} response - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - Returns the updated board data in JSON format.
 */
export const update = async (request, response, next) => {
  try {
    const updated = await updateCardUseCase(request.body, request.params);
    response.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to move a card to a different column in a board.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} request.body - The request body containing the new column ID.
 * @param {Object} request.params - The request parameters.
 * @param {string} request.params.userId - The ID of the user associated with the board.
 * @param {string} request.params.cardId - The ID of the card to be moved.
 * @param {Object} response - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - Returns the updated board data in JSON format.
 */
export const moveCard = async (request, response, next) => {
  try {
    const updated = await moveCardToColumnUseCase(request.body, request.params);
    response.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new board.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} request.body - The request body containing board details.
 * @param {Object} request.params - The request parameters.
 * @param {string} request.params.userId - The ID of the user for whom the board is being created.
 * @param {Object} response - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - Returns the created board data in JSON format.
 */
export const create = async (request, response, next) => {
  try {
    const document = await createCardUseCase(request.body, request.params);
    response.status(200).json(document);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a board or card.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} request.params - The request parameters.
 * @param {string} request.params.userId - The ID of the user associated with the board.
 * @param {string} request.params.cardId - The ID of the card to be deleted (optional).
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - Returns the deleted board or card data in JSON format.
 */
export const destroy = async (request, res, next) => {
  try {
    const deleted = await deleteCardUseCase(request.params);
    return res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
};
