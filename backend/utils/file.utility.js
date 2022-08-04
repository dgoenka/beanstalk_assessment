import { readFile } from 'fs';

module.exports.readFileAsync = filePath =>
  new Promise((resolve, reject) => {
    readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
