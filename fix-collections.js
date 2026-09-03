const fs = require('fs');

const productsRaw = fs.readFileSync('src/data/products.ts', 'utf8');
const idImageRegex = /id:\s*"([^"]+)",[\s\S]*?image:\s*"([^"]+)",/g;

let match;
const idToImage = {};
while ((match = idImageRegex.exec(productsRaw)) !== null) {
  idToImage[match[1]] = match[2];
}

console.log("Found products map:", Object.keys(idToImage).length);

let collectionsRaw = fs.readFileSync('src/data/collections.ts', 'utf8');

collectionsRaw = collectionsRaw.replace(/id:\s*"([^"]+)",([\s\S]*?)image:\s*"([^"]+)",/g, (fullMatch, id, between, oldImg) => {
  if (idToImage[id] && idToImage[id] !== oldImg) {
    console.log(`Updating ${id}: ${oldImg} -> ${idToImage[id]}`);
    return `id: "${id}",${between}image: "${idToImage[id]}",`;
  }
  return fullMatch;
});

fs.writeFileSync('src/data/collections.ts', collectionsRaw);
