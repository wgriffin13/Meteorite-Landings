const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/meteoriteDB', {
    logging: true
});

const Meteorite = conn.define('meteorite', {
    name: {
        type: Sequelize.STRING
    },
    rawDataId: {
        type: Sequelize.INTEGER
    },
    nameType: {
        type: Sequelize.STRING
    },
    recCClass: {
        type: Sequelize.STRING
    },
    mass: {
        type: Sequelize.FLOAT
    },
    fall: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.DATEONLY
    },
    recLat: {
        type: Sequelize.FLOAT
    },
    recLong: {
        type: Sequelize.FLOAT
    },
    geoLoc: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.INTEGER
    },
    country: {
        type: Sequelize.INTEGER
    }
});

module.exports = {
    Meteorite,
    conn
}
