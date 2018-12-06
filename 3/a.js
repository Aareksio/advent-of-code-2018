const readInput = require('../util/readInput');

async function getResult(filePath) {
  const input = await readInput(filePath);

  const claims = input.map(line => {
    const [id, location] = line.split('@').map(part => part.trim());
    const [position, size] = location.split(':').map(part => part.trim());
    const [x, y] = position.split(',').map(coordinate => parseInt(coordinate, 10));;
    const [width, height] = size.split('x').map(size => parseInt(size, 10));

    return { id, x, y, width, height };
  });

  const claimedSpace = new Set();
  const conflictingTiles = new Set();

  for (const claim of claims) {
    for (let x = claim.x; x < claim.x + claim.width; ++x) {
      for (let y = claim.y; y < claim.y + claim.height; ++y) {
        const tile = `${x}, ${y}`;
        if (claimedSpace.has(tile)) conflictingTiles.add(tile);
        else claimedSpace.add(tile);
      }
    }
  }

  return conflictingTiles.size;
}

(async () => console.log(await getResult(process.argv[2])))();
