const router = require('express').Router();
const {
  homeController,
  findByIdController,
  findByUsernameController,
  getWinnerByRaffelDraw,
  updateByIdController,
  bulkUpdateByUsernameController,
} = require('../controller');
const checkMiddleware = require('../middleware/check');

router.route('/').get(checkMiddleware, homeController);
router.route('/t/:ticketId').get(findByIdController).post(updateByIdController);
router
  .route('/u/:username')
  .get(findByUsernameController)
  .post(bulkUpdateByUsernameController);
router.route('/draw-winner/:winnerCount').get(getWinnerByRaffelDraw);

module.exports = router;
