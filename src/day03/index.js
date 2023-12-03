import run from "aocrunner";

const SYMBOLS = "*@#=$/-&%+";

const parseInput = (rawInput) => {
  const splitInput = rawInput.split('\n');
  const numbers = [];
  const symbols = [];
  
  for (const [y, line] of splitInput.entries()) {
    for (const numberMatcher of line.matchAll(/\d+/g)) {
      const content = numberMatcher[0];
      numbers.push({ x: numberMatcher.index, y, content, value: parseInt(content) })
    }

    for (const symbolMatcher of line.matchAll(/[^0-9\.]/g))
    symbols.push({ x: symbolMatcher.index, y, content: symbolMatcher[0] })
  }
  return [numbers, symbols];
};

const nearby = (number, symbol) => {
  const x0 = number.x - 1
  const x1 = number.x + number.content.length
  const y0 = number.y - 1
  const y1 = number.y + 1
  return symbol.x >= x0 && symbol.x <= x1 && symbol.y >= y0 && symbol.y <= y1
}

const part1 = (rawInput) => {
  const [numbers, symbols] = parseInput(rawInput);

  return numbers
    .filter(n => symbols.some(s => nearby(n, s)))
    .map(n => n.value)
    .reduce((a, b) => a + b, 0);
};

const part2 = (rawInput) => {
  const [numbers, symbols] = parseInput(rawInput);
  
  return symbols
    .filter(symbol => symbol.content === '*')
    .map(symbol => {
      const nearbyNumbers = numbers.filter(number => nearby(number, symbol)).map(number => number.value)
      return nearbyNumbers.length === 2 ? nearbyNumbers[0] * nearbyNumbers[1] : 0
    })
    .reduce((a, b) => a + b, 0);
}

run({
  part1: {
    tests: [
      {
        input: `467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..`,
        expected: 4361,
      },      
      {
        input: `12.......*..\n+.........34\n.......-12..\n..78........\n..*....60...\n78..........\n.......23...\n....90*12...\n............\n2.2......12.\n.*.........*\n1.1.......56`,
        expected: 413,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..`,
        expected: 467835,
      },   
      {
        input: `12.......*..\n+.........34\n.......-12..\n..78........\n..*....60...\n78..........\n.......23...\n....90*12...\n............\n2.2......12.\n.*.........*\n1.1.......56`,
        expected: 6756,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
