const readInput = require('../util/readInput');

async function getResult(filePath) {
  const changes = (await readInput(filePath)).map(number => parseInt(number, 10));
  return changes.reduce((acc, curr) => acc + curr, 0);
}

(async () => console.log(await getResult(process.argv[2])))();
