const parse = require('csv-parse');
const fs = require('fs');
const { Meteorite, conn } = require('./index');

const fileStr = 'Meteorite_Landings.csv';

const seedData = () => {
    return conn
        .sync({ force: true })
        .then(() => {
            fs.createReadStream(fileStr)
                .pipe(parse())
                .on('data', (row) => {
                    Meteorite.create({
                        name: row[0],
                        rawDataId: (row[1] === '' ? null : row[1]),
                        nameType: row[2],
                        recCClass: row[3],
                        mass: (row[4] === '' ? null : row[4]),
                        fall: row[5],
                        year: (row[6] === '' ? null : row[6]),
                        recLat: (row[7] === '' ? null : row[7]),
                        recLong: (row[8] === '' ? null : row[8]),
                        geoLoc: row[9],
                        state: (row[10] === '' ? null : row[10]),
                        country: (row[11] === '' ? null : row[11])
                    })
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');
                });
            });
}

seedData();

module.exports = seedData;
