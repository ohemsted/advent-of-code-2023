import run from "aocrunner";

const parseInput = (rawInput) => {
  const cards = rawInput.split('\n').map(line => line.split(/[\s]+/).join(' '));
  return cards.map(card => {
    const [game, gameCards] = card.split(': ');
    const gameId = parseInt(game.split(' ')[1]);
    const [winningCardContent, ticketCardContent] = gameCards.split(' | ');
    return {
      gameId,
      winningCardContent,
      ticketCardContent,
      winningNumbers: getNumbers(winningCardContent),
      ticketNumbers: getNumbers(ticketCardContent),
      instance: 1
    }
  })
};

const getNumbers = (inputString) => {
  return inputString.split(' ');
}
const part1 = (rawInput) => {
  const tickets = parseInput(rawInput);
  return tickets.map(ticket => {
    const matchingNumber = [];
    let score = 0;
    ticket.winningNumbers.forEach(winningNumber => {
      ticket.ticketNumbers.forEach(ticketNumber => winningNumber === ticketNumber && matchingNumber.push(ticketNumber));
    });

    for (let i = 0; i < matchingNumber.length; i++) {
      if (score == 0) {
        score = 1;
      } else {
        score = score * 2;
      }
    }

    return score;
  }).reduce((a, b) => a + b, 0);
};

const part2 = (rawInput) => {
  const tickets = parseInput(rawInput);
  return tickets.map(ticket => {
    const matchingNumber = [];
    ticket.winningNumbers.forEach(winningNumber => {
      ticket.ticketNumbers.forEach(ticketNumber => winningNumber === ticketNumber && matchingNumber.push(ticketNumber));
    });

    for (let i = 0; i < matchingNumber.length; i++) {
      try {
        tickets[ticket.gameId + i].instance += ticket.instance;
      } catch (e) {
        console.log(`Trying to read ${JSON.stringify(ticket)}`)
      }
    }

    return ticket;
  }).reduce((a, b) => a + b.instance, 0);
};

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`,
        expected: 8,
      },
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card   1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
