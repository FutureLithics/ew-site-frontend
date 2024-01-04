'use client';

import {useEffect, useState} from 'react';
import { Slider } from 'rsuite';

import LineChart from '../Charts/LineChart';
import FragilityChoropleth from '../Charts/FragilityChoropleth';

const FragilityContainer = ({data, success}) => {

    const [keys, setKeys] = useState([]);
    const [sliderPos, setSliderPos] = useState(0);
    const [year, setYear] = useState("");
    const [date, setDate] = useState(null);
    const [dataSlice, setDataSlice] = useState({});
    const [natlDataset, setNatlDataset] = useState({});

    const changeSliderPos = (val, event) => {
        if (sliderPos != val) {
            const yearPos = keys[val].split("-")[0];
            
            setDate(keys[val])
            setYear(yearPos);
            setSliderPos(val);
        }
    } 

    useEffect(()=>{
        if(success && data){
            const countyData = data?.countyData;
            const natlData = data?.natlData;

            if (countyData) {
                const keyArray = Object.keys(countyData);

                setKeys(keyArray);

                if (natlData) {
                    const newYear = keyArray[sliderPos].split("-")[0];
                    
                    setDate(keyArray[sliderPos])
                    setYear(newYear);
                }
            }          
        }
    }, [success]);

    useEffect(() => {
        if(data) {
            const natlData = data?.natlData;
            const countyData = data?.countyData;

            setDataSlice(countyData[keys[sliderPos]]);
            setNatlDataset(natlData[year])            
        }
    }, [sliderPos]);

    // ensure data is passed down on update
    useEffect(() => {
        if(data) {
            const natlData = data?.natlData;
            const countyData = data?.countyData;

            setDataSlice(countyData[keys[sliderPos]]);
            setNatlDataset(natlData[year])            
        } 
    }, [year]);


    return (
        <div className="w-full px-2 md:px-24 flex justify-center content-center">
            <div className="w-full md:w-3/5 flex flex-col justify-center content-center">
                <div>
                    <Slider 
                        max={keys.length - 1} 
                        onChange={changeSliderPos}
                        tooltip={false} />                    
                </div>
                <div className="mt-8">
                    <FragilityChoropleth data={dataSlice} />
                </div>
                <div>
                    <LineChart data={natlDataset} year={year} date={date} />
                </div>
            </div>
        </div>            
    );
};

export default FragilityContainer;