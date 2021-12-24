const Ticket = require('../models/Tickets');
const database = require('../models/database');
const e = require('express');
// console.log(database);
/**
 * Main Ticket Array as db
 * @constructor
 */
class TicketDB {
  constructor(tickets) {
    /**
     * remove tickets from property with []
     * and remove parameters from initializeing Class Object below the class
     * to work with database, its is static data
     */
    this.tickets = tickets;
  }

  /**
   * Create a new Ticket
   * @param {string} username
   * @param {number} price
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
    return ticket;
  }
  /**
   * Create Bulk Ticket
   * @param {string} username
   * @param {number} price
   * @param {number} count number of ticket
   */
  bulkCreate(username, price, count) {
    let ticket;
    for (let i = 1; i < count; i++) {
      ticket = this.create(username, price);
    }
    this.tickets.push(ticket);
    return this.tickets;
  }

  /**
   * Fild all tickets
   * @returns {Array<tickets>} Tickets
   */
  find() {
    return this.tickets;
  }

  /**
   * Find one ticket by Id
   * @param {string} ticketId
   * @returns {Ticket} Ticket by Id
   */
  findOneById(ticketId) {
    const ticket = this.tickets.filter((ticket) => ticket.id === ticketId);
    return ticket;
  }

  /**
   * find ticket by username
   * @param {string} username
   * @returns {Array<Ticket>} Ticket by username
   */
  findByUsername(username) {
    if (username) {
      const ticket = this.tickets.filter(
        (ticket) => ticket.username == username
      );
      if (ticket && ticket.length > 0) {
        return ticket;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * Update ticket by Id
   * @param {string} ticketId
   * @param {string} username
   * @param {number} price
   * @returns {Ticket} Update Ticket by Id
   */
  updateOneById(ticketId, username, price) {
    const index = this.tickets.findIndex(
      /**
       * single ticket
       * @param {Ticket} ticket
       * @returns
       */
      (ticket) => ticket.id === ticketId
    );

    if (index != -1 && username) {
      this.tickets[index].username = username;
      this.tickets[index].updatedAt = new Date();
    }
    if (index != -1 && price) {
      this.tickets[index].price = price;
      this.tickets[index].updatedAt = new Date();
    }

    return this.tickets[index];
  }

  /**
   * Update Bulk ticket username with new username and Price
   * @param {string} username
   * @param {string} newUsername
   * @param {number} price
   * @returns true if update successfully
   */
  bulkUpdate(username, newUsername, price) {
    const ticket = this.tickets.filter(
      (ticket) => ticket.username === username
    );

    ticket.forEach((ticket) => {
      ticket.username = newUsername;
      ticket.price = price ? price : ticket.price;
      ticket.updatedAt = new Date();
    });

    return true;
  }
  /**
   * Raffel Draw and get winner
   * @param {number} winner number of winner
   * @returns {Array<Ticket>} winner ticket
   */
  drawWinner(winner) {
    let winnerIndexs = new Array(winner);

    const result = [];

    for (let i = 0; i < winner; i++) {
      let index = Math.floor(Math.random() * this.tickets.length);

      if (!winnerIndexs.includes(index)) {
        winnerIndexs[i] = index;
      } else {
        index = Math.floor(Math.random() * this.tickets.length);
        winnerIndexs[i] = index;
      }

      result.push(this.tickets[winnerIndexs[i]]);
    }
    return result;
  }
}

const ticketDB = new TicketDB(database);

module.exports = ticketDB;
