import fs from "fs";
import QRCode from 'qrcode';

// https://www.npmjs.com/package/qrcode
// https://base64.guru/converter/decode/image

const input = JSON.parse(fs.readFileSync('./output/output.json'));

const promises = input.map(({ label, resource }) => {
    return QRCode.toDataURL(resource, { width: 300 })
        .then(url => ({ label, data: url }))
        .catch(error => console.error(error));
});

Promise.all(promises).then((value) => {
    fs.writeFileSync('./output/output.json', JSON.stringify(value));
}).catch(error => console.error(error));