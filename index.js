import fs from "fs";
import Papa from 'papaparse';
import QRCode from 'qrcode';

// 1.

// const inputCSV = fs.createReadStream('./input/OVER-B.csv');

// Papa.parse(inputCSV, {
//     header: true,
//     preview: 0,
//     skipEmptyLines: true,
//     transformHeader: (header, index) => header.toLowerCase(), // 'Label' => 'label'
//     complete: (result, file) => {
//         fs.writeFileSync('./output/output.json', JSON.stringify(result.data));
//     }
// });

// 2. 

const input = JSON.parse(fs.readFileSync('./output/output.json'));

const promises = input.map(({label, resource}) => {
    return QRCode.toDataURL(resource, { width: 300 })
        .then(url => ({ label, data: url }))
        .catch(error => console.error(error));
});

Promise.all(promises).then((value) => {
    fs.writeFileSync('./output/output.json', JSON.stringify(value));
}).catch(error => console.error(error));