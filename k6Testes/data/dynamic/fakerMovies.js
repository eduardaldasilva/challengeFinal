const { faker } = require('@faker-js/faker');
const fs = require('fs');

const quantidade = process.argv[2] || 1;
const moviesArray = [];

for(let i = 0; i < quantidade; i++) {
  const movie = {
    title: faker.word.noun(),
    description: faker.word.words(5),
    launchdate: faker.date.anytime(),
    showtimes: ["09h00", "15h00"]
  };
  moviesArray.push(movie);
}

fs.writeFileSync('movies.json', JSON.stringify(moviesArray, null, 2), 'utf8');

console.log('Arquivo movies.json criado com sucesso.');
