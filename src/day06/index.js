import run from "aocrunner";

const parseInput = (rawInput) => {
  const splitInput = rawInput.split('\n').map(line => line.split(/[\s]+/));
  const valueLength = splitInput[0].length - 1;
  const objectArray = [];

  for (let i = 1; i <= valueLength; i++) {
    objectArray.push({
      'time': parseInt(splitInput[0][i]),
      'distance': parseInt(splitInput[1][i]),
    })
  }

  return objectArray;
}

const part1 = (rawInput) => {
  const inputs = parseInput(rawInput);
  let multipliedValue;
  inputs.forEach(input => {
    let faster = 0;
    for (let startTime = 0; startTime <= input.time; startTime++) {
      const timeRemaining = input.time - startTime;
      const speed = startTime;

      const distanceTravelled = speed * timeRemaining; 
      if (distanceTravelled > input.distance) {
        faster++
      }
    }
    if (!multipliedValue) {
      multipliedValue = faster;
    } else {
      multipliedValue = multipliedValue * faster;
    }
  });
  
  return multipliedValue;
};

const part2 = (rawInput) => {
  const inputs = parseInput(rawInput);
  let multipliedValue;  
  
  let timeString =  ``;
  let distanceString = ``;
  inputs.forEach(input => {
    timeString += input.time
    distanceString += input.distance;
  });

  const inputTime = parseInt(timeString);
  const inputDistance = parseInt(distanceString);

  let faster = 0;
  for (let startTime = 0; startTime <= inputTime; startTime++) {
    if (startTime % 10000 == 0) {
      console.log(`Progress: ${startTime}/${inputTime}`);
    }
    const timeRemaining = inputTime - startTime;
    const speed = startTime;

    const distanceTravelled = speed * timeRemaining; 
    if (distanceTravelled > inputDistance) {
      faster++
    }
  }
  if (!multipliedValue) {
    multipliedValue = faster;
  } else {
    multipliedValue = multipliedValue * faster;
  }
  
  return multipliedValue;
};

run({
  part1: {
    tests: [
      {
        input: `Time:      7  15   30\nDistance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Time:      7  15   30\nDistance:  9  40  200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
