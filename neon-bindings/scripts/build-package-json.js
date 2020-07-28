const path = require('path');
const { writeFile } = require('fs');
const { promisify } = require('util');
const packageJson = require('../package.json');

const write = promisify(writeFile);

async function main() {
  const newPackage = {
    ...packageJson,
    main: packageJson.main.replace('dist/', ''),
    types: packageJson.types.replace('dist/', ''),
  };

  await write(path.join('..', 'dist', 'package.json'), JSON.stringify(newPackage, null, 2));
}

main().then(() => {
  console.log('Copied package.json');
});
