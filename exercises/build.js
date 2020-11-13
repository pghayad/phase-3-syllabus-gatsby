// https://www.webdevdrops.com/en/build-static-site-generator-nodejs-8969ebe34b22/
const fse = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const ejsRenderFile = promisify(require('ejs').renderFile);
const globP = promisify(require('glob'));
const config = require('./config');

const srcPath = path.resolve(__dirname, 'src');

const distPath = './static';

// clear destination folder
fse.emptyDirSync(distPath);

// copy assets folder
fse.copy(`${srcPath}/assets`, `${distPath}/assets`);

// read page templates
globP('**/*.ejs', { cwd: `${srcPath}/pages` })
  .then(files => {
    files.forEach(file => {
      const fileData = path.parse(file);
      const destPath = path.join(distPath, fileData.dir);

      // create destination directory
      fse
        .mkdirs(destPath)
        .then(() => {
          // render page
          return ejsRenderFile(`${srcPath}/pages/${file}`, Object.assign({}, config));
        })
        .then(pageContents => {
          // render layout with page contents
          return ejsRenderFile(
            `${srcPath}/layout.ejs`,
            Object.assign({}, config, { body: pageContents })
          );
        })
        .then(layoutContent => {
          // save the html file
          const outpath = `${destPath}/${fileData.name}.html`;

          console.log(outpath);

          fse.writeFile(outpath, layoutContent);
        })
        .catch(err => {
          console.error(err);
        });
    });
  })
  .catch(err => {
    console.error(err);
  });
