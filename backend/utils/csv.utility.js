const csvParse = require('csv-parse');
const { parse } = csvParse;

module.exports.parseCSV = (csv, options) =>
  new Promise((resolve, reject) => {
    const records = [];
    // Initialize the parser
    const parser = parse(options);
    // Use the readable stream api to consume records
    parser.on('readable', function() {
      let record;
      while ((record = parser.read()) !== null) {
        records.push(record);
      }
    });
    // Catch any error
    parser.on('error', reject);
    // Test that the parsed records matched the expected records
    parser.on('end', () => resolve(records));
    // Write data to the stream
    parser.write(csv);
    // Close the readable stream
    parser.end();
  });
