const ticketDB = require('../db/TicketDB');
const { customError } = require('../error/customError');
// ticketDB.create('Shaheb Ali', 10);
// ticketDB.create('Shaheb Ali', 10);
// ticketDB.create('Shaheb Ali', 10);
// ticketDB.create('Shaheb Ali', 10);
// ticketDB.create('Shaheb Ali', 10);
// ticketDB.create('Shaheb Ali', 10);
// ticketDB.create('Shaheb Ali', 10);
// ticketDB.create('Shaheb Ali', 10);
// ticketDB.create('Shaheb Ali', 10);
// ticketDB.create('Shaheb Ali', 10);
// ticketDB.bulkCreate('Nadim Islam', 10, 5);

/**
 * Home Controller
 * @param {Object} _req unused
 * @param {Object} res
 * @param {fn} next
 * @returns {json} with message
 */
const homeController = (_req, res) => {
  res.status(200).json({ Tickets: ticketDB.find() });
};

/**
 * Find ticket by ID
 * @param {*} req
 * @param {*} res
 * @param {fn} next
 * @returns {Object} ticket get by id
 */
const findByIdController = (req, res, next) => {
  const { ticketId } = req.params;

  const ticket = ticketDB.findOneById(ticketId);
  if (ticket.length > 0) {
    res.status(200).json({ Ticket: ticket });
  } else {
    return next(customError('Ticket not found, Please check Ticket ID', '404'));
  }
};

/**
 * Find ticket by username
 * @param {*} req
 * @param {*} res
 * @returns {Object} ticket get by username
 */
const findByUsernameController = (req, res, next) => {
  const { username } = req.params;
  const ticket = ticketDB.findByUsername(username);
  if (!ticket) {
    return next(
      customError(
        `Ticket not found Please check Username: '${username}'`,
        '404'
      )
    );
  } else {
    res.status(200).json({ message: ticket });
  }
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {fn} next
 * @returns json Winners ticket
 */
const getWinnerByRaffelDraw = (req, res, next) => {
  const { winnerCount } = req.params;
  const winner = ticketDB.drawWinner(winnerCount);
  if (winner.length == 0) {
    return next(customError('Winner not found, please try again', '404'));
  } else {
    res.status(200).json({ Winners: winner });
  }
};

/**
 * Update ticket username and price by TicketId
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns success message if success
 */
const updateByIdController = (req, res, next) => {
  const { ticketId, username, price } = req.params;

  const updatedTicket = ticketDB.updateOneById(ticketId, username, price);
  if (!updatedTicket) {
    return next(
      customError('Ticket Could not update, please check Ticket id', '404')
    );
  } else {
    res.status(200).json({ message: 'Ticket Updated Successfully!' });
  }
};

const bulkUpdateByUsernameController = (req, res, next) => {
  const { username } = req.params;
  const { newusername, price } = req.body;
  console.log(username, newusername, price);
  const bulkUpdated = ticketDB.bulkUpdate(username, newusername, price);
  if (!bulkUpdated) {
    return next(
      customError(`Ticket Could not updated with the username give ${username}`)
    );
  } else {
    res.status(200).json({ message: 'Ticket Updated Successfully' });
  }
};
module.exports = {
  homeController,
  findByIdController,
  findByUsernameController,
  getWinnerByRaffelDraw,
  updateByIdController,
  bulkUpdateByUsernameController,
};
