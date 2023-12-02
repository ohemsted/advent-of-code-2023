import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n').map((game) => {
  const gameMeta = game.split(': ');
  const gameContent = gameMeta[1].split('; ');
  return {
    gameId: parseInt(gameMeta[0].split(' ')[1]),
    gameContent: gameContent,
    maxRed: getMaxColour('red', gameContent),
    maxGreen: getMaxColour('green', gameContent),
    maxBlue: getMaxColour('blue', gameContent)
  }
});

const getMaxColour = (colour, gameContent) => {
  let maxCount = 0;
  gameContent.forEach((game) => {
    let matcher = game.match(`([0-9]+) ${colour}`);
    if (matcher) {
      // console.log(`Count of ${colour}: ${matcher[1]}`);
      if (matcher[1] > maxCount) {
        maxCount = parseInt(matcher[1]);
      }
    }
  });
  return parseInt(maxCount);
}

const part1 = (rawInput) => {
  const allowedRed = 12;
  const allowedGreen = 13;
  const allowedBlue = 14; 
  const input = parseInput(rawInput);

  let gameIdSum = 0;

  input.forEach(game => { 
    // console.log(`GameID: ${game.gameId}: Red: ${game.maxRed}, Green: ${game.maxGreen}, Blue: ${game.maxBlue}`);
    if (game.maxRed <= allowedRed && game.maxGreen <= allowedGreen && game.maxBlue <= allowedBlue) {
      // console.log(`Should add ID`);
      gameIdSum += game.gameId;
    }
  });

  return gameIdSum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let gamePowerSum = 0;
  input.forEach((game) => {
    gamePowerSum += game.maxRed * game.maxBlue * game.maxGreen;
  });

  return gamePowerSum;
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
