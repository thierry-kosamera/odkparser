const csv = require('csv-parser')
const fs = require('fs')
const path = require('path');
const { writeToPath } = require('@fast-csv/format');
const anzip = require('anzip');
const results = [];

let inputFile = process.argv[2] ? process.argv[2] : "./submissions.csv"
const filterValue = process.argv[3] ? process.argv[3] : ""
const filterField = process.argv[4] ? process.argv[4] : "jour"
const extension = inputFile.split('.').pop();
const outputfile = inputFile.split('.').slice(0, -1).join('.')

async function main() {
    if (extension.toLowerCase() === "zip") {

        console.log("Processing ZIP")
        {
            try {
                let opts={outputPath:path.dirname(inputFile)}
                
                const output = await anzip(inputFile,opts);
                //console.log('output', output);
                //assuming there is only one file in the archive or we just take the first one
                inputFile=`${path.dirname(inputFile)}${path.sep}${output.files[0].name}`
            }
            catch (err) {
                console.log(err)
            }
        }
        


    }

    console.log("Processing CSV",inputFile)
    fs.createReadStream(inputFile)
        .pipe(csv())
        .on('data', (data) => {
            //console.log(data.asp)
            if (filterValue && data[filterField] != filterValue) return

            let splitAsp = data.asp.split(/(\s+)/);
            data['asp'] = splitAsp[0] ? splitAsp[0] : ""
            data['asp2'] = splitAsp[1] ? splitAsp[1] : ""
            data['asp3'] = splitAsp[2] ? splitAsp[2] : ""
            data['asp4'] = splitAsp[3] ? splitAsp[3] : ""

            results.push(data)
        })
        .on('end', () => {
            // console.log(results);
            let suffix = filterValue ? `${filterField}_${filterValue}` : "all"
            writeToPath(`${outputfile}_${suffix}.csv`, results, { headers: true, delimiter: ";" })
                .on('error', err => console.error(err))
                .on('finish', () => console.log(`Done writing ${outputfile}_${suffix}.csv, ${results.length} records`));

        });

}

main()