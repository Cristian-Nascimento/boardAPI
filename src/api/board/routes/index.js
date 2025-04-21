import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { token } from "../../../services/passport";
import { show, create, destroy, update, moveCard } from "../controllers";

const router = new Router();

/**
 * @api {get} /board/:userId Retrieve boards
 * @apiName RetrieveBoard
 * @apiGroup Board
 * @apiPermission admin
 * @apiParam {String} access_token Board access_token.
 * @apiParam {String} userId User ID to retrieve boards for.
 * @apiSuccess {Object[]} boards List of boards.
 * @apiSuccess {String} boards.userId User ID associated with the board.
 * @apiSuccess {Object[]} boards.columns List of columns in the board.
 * @apiSuccess {String} boards.columns.id Column ID.
 * @apiSuccess {String} boards.columns.title Column title.
 * @apiSuccess {Object[]} boards.columns.cards List of cards in the column.
 * @apiSuccess {String} boards.columns.cards.id Card ID.
 * @apiSuccess {String} boards.columns.cards.content Card content.
 * @apiSuccess {String} boards.columns.cards.columnId Column ID associated with the card.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get(
  "/:userId",
  token({ required: true, roles: ["admin"] }),
  query(),
  show
);

/**
 * @api {post} /board/:userId/cards Create a new card
 * @apiName CreateCard
 * @apiGroup Board
 * @apiPermission admin
 * @apiParam {String} access_token Admin access_token.
 * @apiParam {String} userId User ID to associate the card with.
 * @apiBody {String} columnId String of column id.
 * @apiBody {String} content String Card content.
 * @apiSuccess {Object} card Created card data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.post(
  "/:userId/cards",
  token({ required: true, roles: ["admin"] }),
  body({ columnId: { type: String }, content: { type: String } }),
  create
);

/**
 * @api {put} /board/:userId/cards/:cardId Update a card
 * @apiName UpdateCard
 * @apiGroup Board
 * @apiPermission admin
 * @apiParam {String} access_token Admin access_token.
 * @apiParam {String} userId User ID to associate the card with.
 * @apiParam {String} columnId String of column id.
 * @apiBody {String} content String Card content.
 * @apiSuccess {Object} card Updated card data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.put(
  "/:userId/cards/:cardId",
  token({ required: true, roles: ["admin"] }),
  body({ content: { type: String } }),
  update
);

/**
 * @api {put} /board/:userId/cards/:cardId/move Move a card to a different column
 * @apiName MoveCard
 * @apiGroup Board
 * @apiPermission admin
 * @apiParam {String} access_token Admin access_token.
 * @apiParam {String} userId User ID associated with the card.
 * @apiParam {String} cardId Card ID to move.
 * @apiBody {String} columnId Column ID Board associated with the card.
 * @apiSuccess {Object} card Updated card data after moving.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.put(
  "/:userId/cards/:cardId/move",
  token({ required: true, roles: ["admin"] }),
  body({ columnId: { type: String } }),
  moveCard
);

/**
 * @api {delete} /board/:userId/cards/:cardId Delete a card
 * @apiName DeleteCard
 * @apiGroup Board
 * @apiPermission admin
 * @apiParam {String} access_token Admin access_token.
 * @apiParam {String} userId User ID associated with the card.
 * @apiParam {String} cardId Card ID to delete.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.delete(
  "/:userId/cards/:cardId",
  token({ required: true, roles: ["admin"] }),
  destroy
);

export default router;
