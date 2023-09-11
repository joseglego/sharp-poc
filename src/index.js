const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const inputFolder = path.join(__dirname, '..', 'input');

const JPGS = ['jpg', 'jpeg']
const PNGS = ['png']

async function main () {
  fs.readdir(inputFolder, async function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const extension = file.split('.').pop().toLowerCase();
      const inputFile = path.join(__dirname, '..', 'input', file)
      const outputFile = path.join(__dirname, '..', 'output', file)

      if (JPGS.includes(extension)) {
        console.log(`Processing: ${file}`)
        await sharp(inputFile)
          .jpeg({
            mozjpeg: true
          })
          .toFile(outputFile);

      } else if (PNGS.includes(extension)) {
        console.log(`Processing: ${file}`)
        await sharp(inputFile)
          .png({
            compressionLevel: 7
          })
          .toFile(outputFile);
      }
    }
  });
}

main()