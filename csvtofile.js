import fs from "fs";
import Papa from 'papaparse';
import QRCode from 'qrcode';

// https://www.papaparse.com/docs
// https://www.npmjs.com/package/qrcode

const input = fs.createReadStream('./input/SORT-A.csv');

Papa.parse(input, {
    header: true,
    preview: 1, // If > 0, only that many rows will be parsed.
    skipEmptyLines: true,
    transformHeader: (header, index) => header.toLowerCase(), // 'Label' => 'label'
    complete: (result, file) => {
        result.data.forEach((location) => {
            QRCode.toFile(`./output/${location.label}.png`, location.resource, { size: 300 });
        });
    }
});