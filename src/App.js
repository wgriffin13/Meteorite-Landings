import React, { Component } from 'react';
import AsiaMap from './AsiaMap';
import WorldMap from './WorldMap';

class App extends Component {

    render () {
        return (
            <div className="container">
                <h1>Meteorite Strikes</h1>
                <WorldMap />
            </div>
        )
    }
}

export default App;
