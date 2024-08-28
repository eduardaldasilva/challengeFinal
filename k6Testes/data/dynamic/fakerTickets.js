const { faker } = require('@faker-js/faker');
const fs = require('fs');

const quantidade = process.argv[2] || 1;
const tickets  = [];

for(let i = 0; i < quantidade; i++) {
  const ticket = {
    movieId: faker.string.alpha(10),
    userId: faker.string.alpha(10),
    seatNumber: faker.number.int(99),
    price: faker.number.int(59),
    showtime: faker.date.anytime()
  }
  tickets.push(ticket)
}

fs.writeFileSync('tickets.json', JSON.stringify(tickets, null, 2)), error => {
  if(error) {
    console.error(error)
  }
}





