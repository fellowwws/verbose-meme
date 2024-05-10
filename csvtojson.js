import fs from "fs";
import Papa from 'papaparse';

// https://www.papaparse.com/docs

const input = fs.createReadStream('./input/SORT-A.csv');

Papa.parse(input, {
    header: true,
    preview: 32, // If > 0, only that many rows will be parsed.
    skipEmptyLines: true,
    transformHeader: (header, index) => header.toLowerCase(), // 'Label' => 'label'
    complete: (result, file) => {
        fs.writeFileSync('./output/output.json', JSON.stringify(result.data));
    }
});