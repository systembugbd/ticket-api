const shortid = require('shortid');
/**
 * Create a new Ticket Object
 * @param {string} username
 * @param {number} price
 * @returns {Object} Ticket
 */
class Ticket {
  constructor(username, price) {
    this.id = shortid.generate();
    this.username = username;
    this.price = price;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
module.exports = Ticket;
