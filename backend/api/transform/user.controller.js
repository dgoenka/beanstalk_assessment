'use strict';

const { unlink } = require('fs');
const { parseCSV } = require('../../utils/csv.utility');
const { readFileAsync } = require('../../utils/file.utility');
module.exports.transformCSV = async ctx => {
  const { filepath: path } = ctx.request.files.file;
  const csv = await readFileAsync(path);
  unlink(path, err => {
    if (err) {
      console.log(err);
    }
  });
  const parsedCSV = await parseCSV(csv, {
    delimiter: ' - ',
    relax_quotes: true,
    escape: '\\',
  });
  ctx.body = {
    status: 'success',
    data: parsedCSV.map(csvRow => {
      const { transactionId, details: err } = JSON.parse(csvRow[2]);
      return {
        timestamp: new Date(csvRow[0]).getTime(),
        loglevel: csvRow[1],
        transactionId,
        err,
      };
    }),
  };
};
