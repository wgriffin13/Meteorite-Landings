import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import mapDataWorld from './mapDataWorld';
import axios from 'axios';

// Load Highcharts modules
require('highcharts/modules/map')(Highcharts);

const mapOptions = {
    title: {
      text: ''
    },
    series: [
        {
            mapData: mapDataWorld,
            name: 'Basemap',
            borderColor: '#A0A0A0',
            nullColor: 'rgba(200, 200, 200, 0.3)',
            showInLegend: false
        },
        {
            type: 'mappoint',
            name: 'Meteorite',
            color: Highcharts.getOptions().colors[3],
            showInLegend: false,
            tooltip: {
                pointFormat: '<b>Mass: {point.mass}</b><br>' +
                    'Lat: {point.lat}<br>' +
                    'Lon: {point.lon}<br>'
            },
            data: [{name: "Nogata", mass: 472, lat: 33.725, lon: 130.75}]
        }
      ]
  };

// Render with world map
class WorldMap extends Component {

    constructor() {
        super();
        this.state = {
            mapOptions: {
                title: {
                  text: ''
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },
                series: [
                    {
                        mapData: mapDataWorld,
                        name: 'Basemap',
                        borderColor: '#A0A0A0',
                        nullColor: 'rgba(200, 200, 200, 0.3)',
                        showInLegend: false
                    }
                ]
              },
            dataSequence: [],
            dataIdx: 0,
            year: ''
        }
    }

    afterChartCreated = chart => {
        this.internalChart = chart;
    }
      
    componentDidMount() {
        // example of use
        this.createDataSequence();
    }

    testSetState = () => {
        const newIdx = this.state.dataIdx + 1;
        this.internalChart.series[1].remove();
        this.internalChart.addSeries({
            type: 'mappoint',
            name: 'Meteorite',
            color: Highcharts.getOptions().colors[3],
            showInLegend: false,
            tooltip: {
                pointFormat: '<b>{point.name}</b><br>' +
                    '<b>Mass: {point.mass}</b><br>' +
                    'Lat: {point.lat}<br>' +
                    'Lon: {point.lon}<br>'
            },
            data: [...this.state.dataSequence[newIdx].data],
            style: {
                fontSize: '15px'
            }
        })
        this.setState({dataIdx: newIdx, year: this.state.dataSequence[newIdx].name})
    }

    play = (funcToPlay) => {
        this.internalChart.sequenceTimer = setInterval(function () {
            funcToPlay();
        }, 600);

    }

    createDataSequence = () => {
        Promise.all([
            axios.get('/api/meteorites/years'),
            axios.get('/api/meteorites')
        ])
            .then(values => {
                const years = values[0].data;
                const meteorites = values[1].data;
                const dataSequence = years.reduce((acc, item) => {
                    acc.push({name: item.year.substring(0, 4), data: []});
                    return acc;
                }, [])
                meteorites.forEach(item => {
                    for (let i = 0; i < dataSequence.length; i++) {
                        if (dataSequence[i].name === item.year.substring(0, 4)) {
                            dataSequence[i].data.push({
                                name: item.name,
                                mass: item.mass,
                                lat: item.recLat,
                                lon: item.recLong
                            })
                            break;
                        }
                    }
                })
                this.setState({ dataSequence, year: dataSequence[0].name })
                console.log(dataSequence)
                this.internalChart.addSeries({
                    type: 'mappoint',
                    name: 'Meteorite',
                    color: Highcharts.getOptions().colors[3],
                    showInLegend: false,
                    tooltip: {
                        pointFormat: '<b>{point.name}</b><br>' +
                            '<b>Mass: {point.mass}</b><br>' +
                            'Lat: {point.lat}<br>' +
                            'Lon: {point.lon}<br>'
                    },
                    data: [dataSequence[0].data[0]]
                })
            })
    }

    render() {
        return (
        <div>
            <h3>Year:  {this.state.year}</h3>
            <HighchartsReact
            options={this.state.mapOptions}
            constructorType={'mapChart'}
            highcharts={Highcharts}
            callback={ this.afterChartCreated }
            />
            <button type="button" onClick={() => this.play(this.testSetState)}>Play</button>
        </div>
        );
    }
}

export default WorldMap;
