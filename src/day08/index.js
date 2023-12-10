import run from "aocrunner";

const parseInput = (rawInput) => {
  const map = {};
  const splitInput = rawInput.split('\n').map(line => line.trim());
  let directions; 
  splitInput.forEach(line => {
    const parsedLine = line.replaceAll(" ", "").replaceAll('(','').replaceAll(')','');
    if (parsedLine) {
      if (parsedLine.includes('=')) {
        const [mapKey, paths] = parsedLine.split('=');
        const [left, right] = paths.split(',');
        map[mapKey] = {
          left,
          right
        }
      } else {
        directions = parsedLine.split('');
      }
    }
  });

  return [directions, map];
};

const part1 = (rawInput) => {
  const [directions, map] = parseInput(rawInput);

  let location = 'AAA';
  let stepCount = 0;

  // console.log(`Direction: ${directions}`);
  // console.log(`Map: ${JSON.stringify(map)}`);

  directions.reverse();
  const originalDirections = [...directions];

  while (location !== "ZZZ") {
    if (!directions.length) {
      directions.push(...originalDirections);
    }
    const parsedDirection = directions.pop() === "L" ? 'left' : 'right';
    location = map[location][parsedDirection];
    stepCount++;
  }

  return stepCount;
};

const part2 = (rawInput) => {
  const [directions, map] = parseInput(rawInput);
  
  directions.reverse();
  const originalDirections = [...directions];

  const startingNodes = Object.keys(map).filter(e => e.endsWith('A'));
  
  const stepCountsPerRoute = {}

  startingNodes.forEach(location => {
    let stepCount = 0;
  
    while (!location.endsWith('Z')) {
      if (!directions.length) {
        directions.push(...originalDirections);
      }
      const parsedDirection = directions.pop() === "L" ? 'left' : 'right';
      location = map[location][parsedDirection];
      stepCount++;
    }

    directions.push(...originalDirections);
    
    stepCountsPerRoute[location] = parseInt(stepCount);
  });

  // Lowest Common Multiple of steps entries
  return Object.values(stepCountsPerRoute).reduce(lcm);
};

// https://stackoverflow.com/questions/47047682/least-common-multiple-of-an-array-values-using-euclidean-algorithm
const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);

run({
  part1: {
    tests: [
      {
        input: `RL

        AAA = (BBB, CCC)
        BBB = (DDD, EEE)
        CCC = (ZZZ, GGG)
        DDD = (DDD, DDD)
        EEE = (EEE, EEE)
        GGG = (GGG, GGG)
        ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
      {
        input: `LLR

        AAA = (BBB, BBB)
        BBB = (AAA, ZZZ)
        ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `LR

        11A = (11B, XXX)
        11B = (XXX, 11Z)
        11Z = (11B, XXX)
        22A = (22B, XXX)
        22B = (22C, 22C)
        22C = (22Z, 22Z)
        22Z = (22B, 22B)
        XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
