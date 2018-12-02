const readInput = require('../util/readInput');

async function getResult(filePath) {
  const input = await readInput(filePath);

  for (const lineA of input) {
    const lettersA = Array.from(lineA);

    for (const lineB of input) {
      if (lineA === lineB) continue;

      const lettersB = Array.from(lineB);

      let differentLettersIndexes = [];
      for (let i = 0; i < lettersA.length; ++i) {
        if (lettersA[i] !== lettersB[i]) differentLettersIndexes.push(i);
        if (differentLettersIndexes.length > 1) break;
      }

      if (differentLettersIndexes.length === 1) {
        lettersA.splice(differentLettersIndexes[0], 1);
        return lettersA.join('');
      }
    }
  }
}

(async () => console.log(await getResult(process.argv[2])))();
