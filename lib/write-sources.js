/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

'use strict';

const path = require('path'),
  fs = require('fs-extra');

// https://security.stackexchange.com/a/123723
const SAFE_PATH = /^(\.\.[/\\])+/gu;
const AFTER_QUESTION = /(\?\S+)/gu;

const writeSources = (filename, content, outdir, options) => {
  filename = options.preserve ? filename : path.basename(filename);
  filename = filename.replace(AFTER_QUESTION, '');

  const safeSuffix = path.normalize(filename).replace(SAFE_PATH, '');
  const outputFilepath = path.resolve(outdir, safeSuffix);

  if (options.verbose) {
    console.log(`Writing to file "${outputFilepath}"`);
  }

  fs.ensureDirSync(path.dirname(outputFilepath));

  if (fs.existsSync(outputFilepath)) {
    console.error(`File "${outputFilepath}" already exists, skipping!`);
  }
  else {
    try {
      fs.writeFileSync(outputFilepath, content, 'utf8');
    }
    catch (error) {
      console.error(`Error while trying to write file "${outputFilepath}"`);
      console.error(error.message);
    }
  }
};

module.exports = writeSources;
