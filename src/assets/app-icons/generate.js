// TODO:
// retest after https://github.com/ariya/phantomjs/issues/15116
const fs = require('fs');
const svg2png = require('svg2png');

const ICON = './icon.svg';

const SIZES = [
  '16',
  '32',
  '48',
  '128'
];

SIZES.forEach(size => {
  fs.readFile(ICON, (err, svgFileBuffer) => {
    if (err) {
      console.error(err);
    } else {
      svg2png(svgFileBuffer, {width: size, height: size})
        .then(buffer => fs.writeFile(`./icon-${size}.png`, buffer, err => {
          if (err) console.error(err)
        }))
        .catch(err => console.error(err))
    }
  });
});
