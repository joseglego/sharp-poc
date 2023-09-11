const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const inputFolder = path.join(__dirname, '..', 'input');

const JPGS = ['jpg', 'jpeg']
const PNGS = ['png']
const QUALITY = 80

async function main () {
  const args = process.argv;
  const quality = args[2] ? +args[2] : QUALITY

  fs.readdir(inputFolder, async function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const name = file.split('.').shift()
      const extension = file.split('.').pop().toLowerCase()
      const inputFile = path.join(__dirname, '..', 'input', file)
      const outputFile = path.join(__dirname, '..', 'output', `${name}_${quality.toString().padStart(3, '0')}.${extension}`)

      if (JPGS.includes(extension)) {
        console.log(`Processing: ${file}`)
        await sharp(inputFile)
          .jpeg({
            mozjpeg: true,
            quality: quality,
          })
          .toFile(outputFile);

      } else if (PNGS.includes(extension)) {
        console.log(`Processing: ${file}`)
        await sharp(inputFile)
          .png({
            palette: true,
            quality: quality,
            effort: 8,
            compressionLevel: 9
          })
          .toFile(outputFile);
      }
    }
  });
}

main()
