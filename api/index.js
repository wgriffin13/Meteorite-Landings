const router = require('express').Router();
const { Meteorite } = require('../db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/meteorites', (req, res, next) => {
    Meteorite.findAll({
        order: [
            ['year', 'ASC']
        ],
        where: {
            fall: 'Fell',
            year: {
                [Op.ne]: null
            },
            recLat: {
                [Op.ne]: null
            },
            recLong: {
                [Op.ne]: null
            }
        }
    })
        .then(data => res.send(data))
        .catch(next)
})

router.get('/meteorites/years', (req, res, next) => {
    Meteorite.findAll({
        order: [
            ['year', 'ASC']
        ],
        attributes: ['year'],
        group: ['year'],
        where: {
            fall: 'Fell',
            year: {
                [Op.ne]: null
            },
            recLat: {
                [Op.ne]: null
            },
            recLong: {
                [Op.ne]: null
            }
        }
    })
        .then(data => res.send(data))
        .catch(next)
})

module.exports = router;

