const fs = require('fs').promises;

async function parseInput(filePath) {
  const file = await fs.readFile(filePath);
  const lines = file.toString('utf-8').split(/\r?\n/).filter(Boolean);
  return lines.map(number => parseInt(number, 10));
}

async function getResult(filePath) {
  const changes = await parseInput(filePath);
  return changes.reduce((acc, curr) => acc + curr, 0);
}


(async () => {
  console.log(await getResult(process.argv[2]));
})();
