'use client';

import {useEffect, useState} from 'react';
import { Slider } from 'rsuite';

const FragilityContainer = ({data}) => {

    const [keys, setKeys] = useState([]);
    const [sliderPos, setSliderPos] = useState(0);
    const [year, setYear] = useState("");
    const [dataSlice, setDataSlice] = useState({});
    const [natlDataset, setNatlDataset] = useState([]);

    const changeSliderPos = (val, event) => {
        if (sliderPos != val) {
            const yearPos = keys[val].split("-")[0];
            
            setYear(yearPos);
            setSliderPos(val);
        }
    } 

    useEffect(()=>{
        const countyData = data?.countyData;
        const natlData = data?.natlData;

        if (countyData) {
            const keyArray = Object.keys(countyData);

            setKeys(keyArray);
            setDataSlice(countyData[keyArray[sliderPos]]);

            if (natlData && keyArray[sliderPos]) {
                const newYear = keyArray[sliderPos].split("-")[0];
                setNatlDataset(natlData[keyArray[newYear]]);
                setYear(newYear);
            }
        }
    }, [data]);

    useEffect(() => {
        if(data) {
            const natlData = data?.natlData;
            const countyData = data?.countyData;

            setDataSlice(countyData[keys[sliderPos]]);
            setNatlDataset(natlData[year])            
        }
    }, [sliderPos]);

    return (
        <div className="w-full">
            <Slider 
                max={keys.length - 1} 
                onChange={changeSliderPos}
                renderTooltip={(val) => {
                    return <p>{keys[val]}</p>
                }}/>
            <div>{keys[sliderPos]}</div>
            <div>{year}</div>
        </div>            
    );
};

export default FragilityContainer;