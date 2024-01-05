"use client";

import { useEffect, useState } from "react";
import { Slider } from "rsuite";
import Loader from "../Loader";

import { fetchFragilityDataSet } from "@/app/utils/api";

import LineChart from "../Charts/LineChart";
import FragilityChoropleth from "../Charts/FragilityChoropleth";

const MainComponent = ({ properties }) => {
    const {
        keys,
        changeSliderPos,
        natlDataset,
        year,
        date,
        dataSlice,
        attributes,
    } = properties;

    return (
        <div className="w-full px-2 sm:px-24 flex justify-center content-center">
            <div className="w-full sm:w-3/5 flex flex-col justify-center content-center">
                <div>
                    <Slider
                        max={keys.length - 1}
                        onChange={changeSliderPos}
                        tooltip={false}
                    />
                </div>
                <div>
                    <LineChart
                        data={natlDataset}
                        year={year}
                        date={date}
                        xLabel={attributes?.xLabel}
                    />
                </div>
                <div className="mt-8">
                    <FragilityChoropleth
                        data={dataSlice}
                        attributes={attributes}
                    />
                </div>
            </div>
        </div>
    );
};

const FragilityContainer = ({ collection, success }) => {
    // when fetching dataset from backend
    const [loading, setLoading] = useState(true);

    // used for rendering variable options
    const [dataSets, setDataSets] = useState(null);

    // attributes passed from dataset to define colorscheme, etc...
    const [attributes, setAttributes] = useState(null);

    // main chart data
    const [data, setData] = useState(null);

    // keys in this context are months/dates
    const [keys, setKeys] = useState([]);
    const [sliderPos, setSliderPos] = useState(0);
    const [year, setYear] = useState("");
    const [date, setDate] = useState(null);

    // the month slice for the map
    const [dataSlice, setDataSlice] = useState({});

    // the year slice for the line chart
    const [natlDataset, setNatlDataset] = useState({});

    const setAttributesFromData = (d) => {
        const display = d.attributes.Title;
        const properties = d.attributes?.DatasetType[0];
        const {
            Variable,
            Average,
            DivergingColorScales,
            xLabel,
            ScaleReverse,
        } = properties;
        const att = {
            display,
            xLabel,
            var: Variable,
            avg: Average,
            color: DivergingColorScales,
            scaleReversed: ScaleReverse,
        };

        setAttributes(att);
    };

    // parses main dataset for populating charts
    const fetchDataSet = async (id) => {
        setLoading(true);

        const res = await fetchFragilityDataSet(id);
        const d = res.data;

        setData(d);
        setLoading(false);
    };

    const changeSliderPos = (val, event) => {
        if (sliderPos != val) {
            const yearPos = keys[val].split("-")[0];

            setDate(keys[val]);
            setYear(yearPos);
            setSliderPos(val);
        }
    };

    const recalibrateDataSets = () => {
        if (data && !loading) {
            const natlData = data?.natlData;
            const countyData = data?.countyData;

            setDataSlice(countyData[keys[sliderPos]]);
            setNatlDataset(natlData[year]);
        }
    };

    useEffect(() => {
        if (collection) {
            const dataSets = collection.data?.attributes?.data_sets;

            if (dataSets) {
                fetchDataSet(dataSets.data[0].id);
                setAttributesFromData(dataSets.data[0]);
                setDataSets(dataSets);
            }
        }
    }, [success]);

    useEffect(() => {
        if (!loading && Object.keys(data).length > 0) {
            const countyData = data?.countyData;
            const natlData = data?.natlData;

            if (countyData) {
                const keyArray = Object.keys(countyData);

                setKeys(keyArray);

                if (natlData) {
                    const newYear = keyArray[sliderPos].split("-")[0];

                    setDate(keyArray[sliderPos]);
                    setYear(newYear);
                }
            }
        }
    }, [data]);

    // ensure data is passed down on update
    useEffect(() => {
        recalibrateDataSets();
    }, [sliderPos, year]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <MainComponent
                    properties={{
                        keys,
                        changeSliderPos,
                        natlDataset,
                        year,
                        date,
                        dataSlice,
                        attributes,
                    }}
                />
            )}
        </>
    );
};

export default FragilityContainer;
