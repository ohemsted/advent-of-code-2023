import run from "aocrunner";

const parseInput = (rawInput) => {
  return rawInput.split('\n').map(line => line.trim().split(/[\s]+/)).map(c => {
    return {
      hand: c[0].split(''),
      handString: c[0],
      bid: parseInt(c[1]),
      jokerCount: (c[0].match(/J/g)||[]).length,
    }
  });
}

const part1 = (rawInput) => {
  const cardStrengths = {
    "2": 1,
    "3": 2,
    "4": 3,
    "5": 4,
    "6": 5,
    "7": 6,
    "8": 7,
    "9": 8,
    T: 9,
    J: 10,
    Q: 11,
    K: 12,
    A: 13
  };

  const results = {
    highCard: [],
    onePair: [],
    twoPair: [],
    threeOfAKind: [],
    fullHouse: [],
    fourOfAKind: [],
    fiveOfAKind: [],
  };

  const parsedInput = parseInput(rawInput);
  parsedInput.forEach(input => {
    const cardCounts = input.hand
      .filter((value, index, array) => array.indexOf(value) === index) // find unique cards
      .map((card) => input.hand.filter((c) => c === card).length)
      .sort()
      .join("-");

    switch (cardCounts) {
      case "5":
        results.fiveOfAKind.push([input.handString, input.hand, input.bid]);
        break;
      case "1-4":
        results.fourOfAKind.push([input.handString, input.hand, input.bid]);
        break;
      case "2-3":
        results.fullHouse.push([input.handString, input.hand, input.bid]);
        break;
      case "1-1-3":
        results.threeOfAKind.push([input.handString, input.hand, input.bid]);
        break;
      case "1-2-2":
        results.twoPair.push([input.handString, input.hand, input.bid]);
        break;
      case "1-1-1-2":
        results.onePair.push([input.handString, input.hand, input.bid]);
        break;
      default:
        results.highCard.push([input.handString, input.hand, input.bid]);
    }
  });

  Object.values(results).forEach((result) =>
    result.sort((hand1, hand2) => {
      let sort = 0;
      for (let i = 0; i < 5 && sort === 0; i++) {
        sort = cardStrengths[hand1[1][i]] - cardStrengths[hand2[1][i]];
      }
      return sort;
    }),
  );

  let bidMultiplierResult = 0;
  Object.values(results).flat().forEach((hand, index) => {
    bidMultiplierResult += (hand[2] * (index + 1));
  });

  return bidMultiplierResult;
};

const part2 = (rawInput) => {
  const cardStrengths = {
    "2": 1,
    "3": 2,
    "4": 3,
    "5": 4,
    "6": 5,
    "7": 6,
    "8": 7,
    "9": 8,
    T: 9,
    Q: 11,
    K: 12,
    A: 13,
    J: 0,
  };

  const results = {
    highCard: [],
    onePair: [],
    twoPair: [],
    threeOfAKind: [],
    fullHouse: [],
    fourOfAKind: [],
    fiveOfAKind: [],
  };

  const parsedInput = parseInput(rawInput);
  parsedInput.forEach(input => {
    console.log(input);
    let cardCounts = input.hand
      .filter((value, index, array) => array.indexOf(value) === index) // find unique cards
      .map((card) => input.hand.filter((c) => c === card).length)
      .sort();

    let idx = cardCounts.findIndex(c => c == input.jokerCount);
    if (idx >= 0){ 
      cardCounts.splice(idx, 1); // Remove the Joker counter
      cardCounts[cardCounts.length - 1] += input.jokerCount; // Add to max count
    }

    // If all jokers we've got 5 of a kind.
    if (!cardCounts.length) {
      cardCounts = [5];
    };

    const joinedCardCounts = cardCounts.join('-');
    switch (joinedCardCounts) {
      case "5":
        results.fiveOfAKind.push([input.handString, input.hand, input.bid]);
        break;
      case "1-4":
        results.fourOfAKind.push([input.handString, input.hand, input.bid]);
        break;
      case "2-3":
        results.fullHouse.push([input.handString, input.hand, input.bid]);
        break;
      case "1-1-3":
        results.threeOfAKind.push([input.handString, input.hand, input.bid]);
        break;
      case "1-2-2":
        results.twoPair.push([input.handString, input.hand, input.bid]);
        break;
      case "1-1-1-2":
        results.onePair.push([input.handString, input.hand, input.bid]);
        break;
      default:
        results.highCard.push([input.handString, input.hand, input.bid]);
    }
  });

  Object.values(results).forEach((result) =>
    result.sort((hand1, hand2) => {
      let sort = 0;
      for (let i = 0; i < 5 && sort === 0; i++) {
        sort = cardStrengths[hand1[1][i]] - cardStrengths[hand2[1][i]];
      }
      return sort;
    }),
  );

  let bidMultiplierResult = 0;
  Object.values(results).flat().forEach((hand, index) => {
    bidMultiplierResult += (hand[2] * (index + 1));
  });

  return bidMultiplierResult;
};
run({
  part1: {
    tests: [
      {
        input: `32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
        expected: 6440,
      },
      {
        input: `2345A 1
        Q2KJJ 13
        Q2Q2Q 19
        T3T3J 17
        T3Q33 11
        2345J 3
        J345A 2
        32T3K 5
        T55J5 29
        KK677 7
        KTJJT 34
        QQQJA 31
        JJJJJ 37
        JAAAA 43
        AAAAJ 59
        AAAAA 61
        2AAAA 23
        2JJJJ 53
        JJJJ2 41`,
        expected: 6592,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
        expected: 5905,
      },
      {
        input: `2345A 1
        Q2KJJ 13
        Q2Q2Q 19
        T3T3J 17
        T3Q33 11
        2345J 3
        J345A 2
        32T3K 5
        T55J5 29
        KK677 7
        KTJJT 34
        QQQJA 31
        JJJJJ 37
        JAAAA 43
        AAAAJ 59
        AAAAA 61
        2AAAA 23
        2JJJJ 53
        JJJJ2 41`,
        expected: 6839
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
