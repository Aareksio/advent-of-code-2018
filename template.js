const readInput = require('./util/readInput');

async function getResult(filePath) {
  const input = await readInput(filePath);

  // code

  return input;
}

(async () => console.log(await getResult(process.argv[2])))();
