import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import { mapDataJson } from '../constants/helper';
import { Radio } from 'antd';
import '../styles/map.scss';

/**
* Courtesy: https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
* Looking topojson for other countries/world? 
* Visit: https://github.com/markmarkoh/datamaps
*/
const INDIA_TOPO_JSON = require('../constants/india.topo.json');

const PROJECTION_CONFIG = {
    scale: 1500,
    center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
    '#e6faff',
    '#ccf5ff',
    '#80e5ff',
    '#33d6ff',
    '#00b8e6',
    '#008fb3',
    '#007a99',
    '#006680',
    '#005266',
];

const DEFAULT_COLOR = '#EEE';

const geographyStyle = {
    default: {
        outline: 'none'
    },
    hover: {
        fill: '#ccc',
        transition: 'all 250ms',
        outline: 'none'
    },
    pressed: {
        outline: 'none'
    }
};

// will generate random heatmap data on every call
const getHeatMapData = (stateData, key) => {
    let outputData = [];
    mapDataJson.forEach((state) => {
        let obj = state;
        let statewiseData = stateData.find(data => data['State'] == state.state)
        obj.value = ((statewiseData && statewiseData[key]) ? statewiseData[key].split(',').join('') : 0)
        outputData.push(obj)
    })
    if (outputData.length) {
        return outputData
    } else {
        return mapDataJson;
    }

};

function Map(props) {
    const [tooltipContent, setTooltipContent] = useState('');
    const [value, setValue] = React.useState('TotalSamples');
    const [data, setData] = React.useState(getHeatMapData(props.stateData, value));

    const colorScale = scaleQuantile()
        .domain(data.map(d => d.value))
        .range(COLOR_RANGE);

    const onMouseEnter = (geo, current = { value: 'NA' }) => {
        return () => {
            setTooltipContent(`${geo.properties.name}: ${current.value}`);
        };
    };
    const handleChange = (event) => {
        setValue(event.target.value);

    };
    useEffect(() => {
        setData(getHeatMapData(props.stateData, value))
    }, [value])

    const onMouseLeave = () => {
        setTooltipContent('');
    };

    return (
        <div className="full-width-height container">
            <h1 className="heading">HEATMAP COVID 19</h1>
            <ReactTooltip>{tooltipContent}</ReactTooltip>
            <ComposableMap
                projectionConfig={PROJECTION_CONFIG}
                projection="geoMercator"
                width={1000}
                height={1000}
                data-tip=""
            >
                <Geographies geography={INDIA_TOPO_JSON}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            const current = data.find(s => s.id === geo.id);
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                                    style={geographyStyle}
                                    onMouseEnter={onMouseEnter(geo, current)}
                                    onMouseLeave={onMouseLeave}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
            <div className='radiobutton'>
                <Radio.Group defaultValue={value} buttonStyle="solid" onChange={handleChange}>
                    <Radio.Button value="TotalSamples" size='sm'>TotalSamples</Radio.Button>
                    <Radio.Button value="Confirmed" size='sm'>Confirmed</Radio.Button>
                    <Radio.Button value="Recovered" size='sm'>Recovered</Radio.Button>
                    <Radio.Button value="Active" size='sm'>Active</Radio.Button>
                </Radio.Group>
            </div>
        </div>
    );
}

export default Map;