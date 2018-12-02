const readInput = require('../util/readInput');

async function getResult(filePath) {
  const input = await readInput(filePath);

  const occurrences = input.map(id => {
    const letterOccurrences = Array.from(id)
      .reduce((occurrences, letter) => {
        occurrences[letter] = occurrences[letter] || 0;
        occurrences[letter]++;
        return occurrences;
      }, {});

    return new Set(Object.values(letterOccurrences));
  });

  return occurrences.filter(o => o.has(2)).length * occurrences.filter(o => o.has(3)).length;
}

(async () => console.log(await getResult(process.argv[2])))();
