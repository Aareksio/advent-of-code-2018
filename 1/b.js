const fs = require('fs').promises;

async function parseInput(filePath) {
  const file = await fs.readFile(filePath);
  const lines = file.toString('utf-8').split(/\r?\n/).filter(Boolean);
  return lines.map(number => parseInt(number, 10));
}

async function getResult(filePath) {
  const changes = await parseInput(filePath);

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


(async () => {
  console.log(await getResult(process.argv[2]));
})();
