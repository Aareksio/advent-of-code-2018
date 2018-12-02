const fs = require('fs').promises;

module.exports = async function readInput(filePath) {
  const file = await fs.readFile(filePath);
  return file.toString('utf-8')
    .split(/\r?\n/)
    .filter(Boolean);
};
