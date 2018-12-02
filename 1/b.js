const readInput = require('../util/readInput');

async function getResult(filePath) {
  const changes = (await readInput(filePath)).map(number => parseInt(number, 10));

  let currentFrequency = 0;
  let currentChangeIndex = 0;
  const history = [0];

  while (true) {
    currentFrequency += changes[currentChangeIndex];
    currentChangeIndex = currentChangeIndex < changes.length - 1 ? currentChangeIndex + 1 : 0;
    if (history.includes(currentFrequency)) return currentFrequency;
    history.push(currentFrequency)
  }
}

(async () => console.log(await getResult(process.argv[2])))();
