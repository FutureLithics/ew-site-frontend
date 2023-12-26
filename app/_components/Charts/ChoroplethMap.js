'use client';
import { useState, useEffect, useRef } from 'react';
import { json } from 'd3';

import Choropleth from './charts/choropleth';
import Loader from '../Loader';

const KEYWORDS = [
    {name: 'frostbite', color: 'cold'},
    {name: 'wind_chill', color: 'cold'},
    {name: 'hypothermia', color: 'cold'},
    {name: 'heat_wave', color: 'hot'},
    {name: 'heat_stroke', color: 'hot'},
    {name: 'humidity', color: 'hot'}
]

const LEVELS = [
    {display: 'County', name: 'county', topoPath: '/datasets/counties-albers-10m.json'},
    {display: 'Place/Census', name: 'places', topoPath: '/datasets/places-us-topo-albers.json'},
]

const TEMPERATURES = [
    {display: 'High Temperatures (Avg)', name: 'hi_temp', color: 'hot'},
    {display: 'Low Temperatures (Avg)', name: 'low_temp', color: 'cold', scaleReversed: true},
]

var topoData;

const PopulatedMap = ({reference}) => {
    return (
         <div id="choropleth" ref={reference} className="svg-container flex content-center"></div>
    );
}

const ChoroplethMap = ({data}) => {
    const { countyData, placeData } = data?.data;

    const mapData = new Map();
    const ref = useRef();
    const [scheme, setScheme] = useState(TEMPERATURES[0]);
    const [level, setLevel] = useState(LEVELS[0]);
    const [dataset, setDataset] = useState(countyData);
    const [loading, setLoading] = useState(true);

    const selectHandler = (e) => {
        const val = e.target.value;
        const index = TEMPERATURES.findIndex((key) => key.name == val);

        setScheme(TEMPERATURES[index])
    }

    const selectLevelHandler = (e) => {
        const val = e.target.value;
        const index = LEVELS.findIndex((key) => key.name == val);

        if(LEVELS[index].name == 'county') {
            setDataset(countyData);
        } else if (LEVELS[index].name == 'places') {
            setDataset(placeData);
        }

        setLevel(LEVELS[index])
        setLoading(true);
    }

    const renderMap = () => {
        Object.keys(dataset).map((key) => mapData.set(key, dataset[key][scheme.name]));

        const options = { 
            color: scheme.color, 
            containerRef: ref, 
            scaleReversed: scheme.scaleReversed,
            topoData: topoData,
            level
        };

        new Choropleth("#choropleth", mapData, options);
    }

    const getTopoData = () => {
        json(level.topoPath)
            .then((data) => {
                topoData = data;

                setLoading(false);
            });
    }

    useEffect(() => {
        if(loading) {
            getTopoData();
        }
    }, [])

    useEffect(() => {
        if (!loading) {
            renderMap();
        } else {
            getTopoData();
        }
    }, [loading, scheme, level])

    return (
        <div className="flex flex-col w-full">
            <div className="w-full border-b-2 mb-4 flex flex-wrap content-between justify-between">
                <h5 className="font-bold text-md mb-2">Showing {scheme.display} by {level.display}</h5>
                <div className="flex flex-col">
                    <div className="flex justify-between mb-2">
                        <span className="me-2 align-middle">Level:</span>
                        <select onChange={selectLevelHandler} className="ps-4 shadow-md shadow-slate-200 border-radius-5 cursor-pointer hover:bg-slate-50">
                            {LEVELS.map( key => {
                                const val = key.name;
                                return <option value={val} key={val}>{key.display}</option>
                            })}
                        </select>                    
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="me-2 align-middle">Temperature average:</span>
                        <select onChange={selectHandler} className="ps-4 shadow-md shadow-slate-200 border-radius-5 cursor-pointer hover:bg-slate-50">
                            {TEMPERATURES.map( key => {
                                const val = key.name;
                                return <option value={val} key={val}>{key.display}</option>
                            })}
                        </select>                    
                    </div>                    
                </div>
            </div>
        {
            loading ? <Loader /> : <PopulatedMap reference={ref} />
        }
        </div>

    );
}

export default ChoroplethMap;