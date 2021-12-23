const ticketDB = require('../db/TicketDB');

// ticketDB.create('User 1', 20);
// ticketDB.create('User 2', 20);
// ticketDB.create('User 3', 20);
// ticketDB.create('User 4', 20);

// console.log(ticketDB.find());

console.log('*******************');

// ticketDB.bulkCreate('Shaheb Ali', 10, 5);
// console.log(ticketDB.bulkUpdate('Shaheb Ali', 'Nadims', 5));
console.log(ticketDB.find());
console.log('******Winner*******');

console.log(ticketDB.draw(3));

// console.log(ticketDB.findByUsername('Nadims'));

// console.log(ticketDB.findOneById('ZTWmNaMjF1'));
// console.log(ticketDB.updateOneById('ZTWmNaMjF1', 'Shaheb Ali', 2));
// console.log(ticketDB.find());
