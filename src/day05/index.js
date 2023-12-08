import run from "aocrunner";

const parseInput = (rawInput) => {
  const parsed = rawInput.split(`\n\n`).map(section => {
    return section.replace('map:',':').split(':').map(s => s.trim()).map(values => values.split('\n'))
  });

  const mappings = [];
  parsed.forEach(entry => {
    mappings.push(parseEntryToMap(entry));
  });
  
  // Remove seed entry from mapping;
  mappings.shift()

  const seed = parsed[0][1][0].split(' ');

  return [seed, mappings];
};

const parseEntryToMap = (entry) => {
  const parsedObject = {};
  if (entry[0][0] != 'seeds') {
    const [source, destination] = entry[0][0].split('-to-');
    parsedObject.source = source;
    parsedObject.destination = destination;
    parsedObject.mapping = parseMapping(entry[1]);
  } 

  return parsedObject;
}

const parseMapping = (mappings) => {
  return mappings.map(mapping => {
    const values = mapping.split(' ');
    return {
      destinationStart: parseInt(values[0]),
      sourceStart: parseInt(values[1]),
      rangeLength: parseInt(values[2])
    }
  })
}

const searchForMapping = (mapping, type, source) => {
  const parsedSource = parseInt(source);
  const typeMatchingMapping = mapping.find(map => map.source == type).mapping;
  let destinationId;

  typeMatchingMapping.find(map => {
    const sourceEnd = map.sourceStart + map.rangeLength;
    const inRange = (parsedSource >= map.sourceStart && parsedSource < sourceEnd);
    
    if (inRange) {
      destinationId = source - map.sourceStart + map.destinationStart;
    } 
  });
  return destinationId ? parseInt(destinationId) : parseInt(source);
}

const part1 = (rawInput) => {
  let lowestLocationNumber = Infinity;
  const [seeds, mappings] = parseInput(rawInput);

  for (let seed in seeds) {
    const seedResult = searchForMapping(mappings, 'seed', seeds[seed]);
    const soilResult = searchForMapping(mappings, 'soil', seedResult);
    const fertilizerResult = searchForMapping(mappings, 'fertilizer', soilResult);
    const waterResult = searchForMapping(mappings, 'water', fertilizerResult);
    const lightResult = searchForMapping(mappings, 'light', waterResult);
    const temperatureResult = searchForMapping(mappings, 'temperature', lightResult);
    const humidityResult = searchForMapping(mappings, 'humidity', temperatureResult);

    lowestLocationNumber = Math.min(lowestLocationNumber, humidityResult)
  }

  return lowestLocationNumber;
};

const part2 = (rawInput) => {
  let lowestLocationNumber = Infinity;
  const [seeds, mappings] = parseInput(rawInput);
  const reversedSeeds = seeds.reverse();
  
  while (reversedSeeds.length) {
    console.log(`**** ${reversedSeeds.length / 2} SEEDS TO GO ****`)
    const numberToStart = parseInt(reversedSeeds.pop());
    const numberToGenerate = parseInt(reversedSeeds.pop());
    
    for (let i = 0; i <= numberToGenerate; i++) {
      const newSeed = numberToStart + i;
      newSeed % 1000000 === 0 ? console.log(`Progress: ${i} / ${numberToGenerate}`) : null;
      const seedResult = searchForMapping(mappings, 'seed', newSeed);
      const soilResult = searchForMapping(mappings, 'soil', seedResult);
      const fertilizerResult = searchForMapping(mappings, 'fertilizer', soilResult);
      const waterResult = searchForMapping(mappings, 'water', fertilizerResult);
      const lightResult = searchForMapping(mappings, 'light', waterResult);
      const temperatureResult = searchForMapping(mappings, 'temperature', lightResult);
      const humidityResult = searchForMapping(mappings, 'humidity', temperatureResult);
      
      lowestLocationNumber = Math.min(lowestLocationNumber, humidityResult)
    } 
  }

  return lowestLocationNumber;
};

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
