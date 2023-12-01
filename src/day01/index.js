import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const eachLine = parseInput(rawInput).split("\n");
  console.log(rawInput);
  const integerValues = eachLine.map(extractNumbers).filter(a => a);

  const concattedNumbers = integerValues.map(firstAndLastConcat);
  return concattedNumbers.reduce((a, b) => a + b, 0);
};

const part2 = (rawInput) => {
  const eachLine = rawInput.split("\n");
  const integerValues = eachLine.map(replaceWordsWithNumbers).map(extractNumbers).filter(a => a);

  const concattedNumbers = integerValues.map(firstAndLastConcat);
  return concattedNumbers.reduce((a, b) => a + b, 0);
};

const replaceWordsWithNumbers = (input) => {
  // There are occasions when the last letter of one number is the first in the next, 
  // I'm leaving the first and last letters behind. They're all removed later anyway.
  input = input.replaceAll("one", "o1e");
  input = input.replaceAll("two", "t2o");
  input = input.replaceAll("three", "t3e");
  input = input.replaceAll("four", "f4r");
  input = input.replaceAll("five", "f5e");
  input = input.replaceAll("six", "s6x");
  input = input.replaceAll("seven", "s7n");
  input = input.replaceAll("eight", "e8t");
  input = input.replaceAll("nine", "n9e");
  return input;
}

const extractNumbers = (input) => {
    return input.replace(/[^0-9]/g,"");
}

const firstAndLastConcat = (value) => {
  const valueAsString = value.toString();
  const firstDigit = valueAsString.charAt(0);
  const lastDigit = valueAsString.charAt(valueAsString.length-1);
  
  return parseInt(firstDigit + lastDigit)
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
