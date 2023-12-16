'use client';
import { useState, useEffect, useRef } from 'react';

import Choropleth from './charts/choropleth';

const KEYWORDS = [
    {name: 'frostbite', color: 'cold'},
    {name: 'wind_chill', color: 'cold'},
    {name: 'hypothermia', color: 'cold'},
    {name: 'heat_wave', color: 'hot'},
    {name: 'heat_stroke', color: 'hot'},
    {name: 'humidity', color: 'hot'}
]

const ChoroplethMap = ({data}) => {
    const mapData = new Map();
    const ref = useRef();
    const [scheme, setScheme] = useState(KEYWORDS[0]);

    const selectHandler = (e) => {
        const val = e.target.value;
        const index = KEYWORDS.findIndex((key) => key.name == val);

        setScheme(KEYWORDS[index])
    }

    useEffect(() => {
        Object.keys(data).map((key) => mapData.set(key, data[key]['keywords'][scheme.name]));

        new Choropleth("#choropleth", mapData, { color: scheme.color, containerRef: ref });
    }, [data, scheme])

    return (
        <div className="flex flex-col w-full">
            <div className="w-full border-b-2 mb-4 flex content-between justify-between">
                <h4 className="font-bold text-lg mb-2">Show state incidence of {scheme.name}</h4>
                <div className="flex content-center mb-2">
                    <span className="me-2 align-middle">Please select a keyword:</span>
                    <select onChange={selectHandler} className="ps-4 shadow-md shadow-slate-200 border-radius-5 cursor-pointer hover:bg-slate-50">
                        {KEYWORDS.map( key => {
                            const val = key.name;
                            return <option value={val} key={val}>{val}</option>
                        })}
                    </select>                    
                </div>

            </div>
            <div id="choropleth" ref={ref} className="svg-container flex content-center"></div>
                       
        </div>

    );
}

export default ChoroplethMap;