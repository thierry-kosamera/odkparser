const csv = require('csv-parser')
const fs = require('fs')
const { writeToPath } = require('@fast-csv/format');
const results = [];
const filterField="jour"
const filterValue=process.argv[2]?process.argv[2]:""
const inputFile="./pulverisation_2020.csv"
const outputfile=inputFile.split('.').slice(0, -1).join('.')

fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (data) => {
        //console.log(data.asp)
        if (filterValue && data[filterField]!=filterValue) return
        
        let splitAsp = data.asp.split(/(\s+)/);
        data['asp'] = splitAsp[0] ? splitAsp[0] : ""
        data['asp2'] = splitAsp[1] ? splitAsp[1] : ""
        data['asp3'] = splitAsp[2] ? splitAsp[2] : ""
        data['asp4'] = splitAsp[3] ? splitAsp[3] : ""

        results.push(data)
    })
    .on('end', () => {
        // console.log(results);
        let suffix=filterValue?`jour_${filterValue}`:"all"
        writeToPath(`${outputfile}_${suffix}.csv`, results, { headers: true, delimiter: ";" })
            .on('error', err => console.error(err))
            .on('finish', () => console.log('Done writing.',results.length ,' records'));

    });



