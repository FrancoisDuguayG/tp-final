const fs = require('fs');

let rawdata = fs.readFileSync('items.json');
let student = JSON.parse(rawdata);
let data = JSON.stringify(student, null, 2);
console.log(data);

const re = new RegExp("http://loremflickr.co[a-z]/320/240/product");
let a = /http:\/\/loremflickr.com\/320\/240\/product/g;
data = data.replace(a, (url,offset) => url + "?key=" + offset);

fs.writeFileSync('items-2.json', data);