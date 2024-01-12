"use client";

import { useEffect, useState } from "react";
import { Slider } from "rsuite";
import Loader from "../Loader";

import Selector from "../Shared/Selector";

import { fetchFragilityDataSet } from "@/app/utils/api";

import LineChart from "../Charts/LineChart";
import FragilityChoropleth from "../Charts/FragilityChoropleth";

const MainComponent = ({ properties }) => {
  const {
    keys,
    changeSliderPos,
    sliderPos,
    natlDataset,
    date,
    dataSlice,
    attributes,
  } = properties;

  return (
    <div className="w-full px-2 sm:px-24 flex justify-center content-center">
      <div className="w-full sm:w-3/5 flex flex-col justify-center content-center">
        <div className="w-4/5 self-center mb-4">
          <h6 className="font-bold text-center pb-2 text-sm">
            Use slider below to progress through time:
          </h6>
          <div>
            <Slider
              max={keys.length - 1}
              onChange={changeSliderPos}
              tooltip={false}
              value={sliderPos}
            />
          </div>
        </div>
        <div>
          <LineChart data={natlDataset} date={date} attributes={attributes} />
        </div>
        <div className="mt-8">
          <FragilityChoropleth data={dataSlice} attributes={attributes} />
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
  const [dataSetIndex, setDataSetIndex] = useState(0);

  // attributes passed from dataset to define colorscheme, etc...
  const [attributes, setAttributes] = useState(null);

  // main chart data
  const [data, setData] = useState(null);

  // keys in this context are months/dates
  const [keys, setKeys] = useState([]);
  const [sliderPos, setSliderPos] = useState(0);
  const [date, setDate] = useState(null);

  // the month slice for the map
  const [dataSlice, setDataSlice] = useState({});

  // the year slice for the line chart
  const [natlDataset, setNatlDataset] = useState({});

  const setAttributesFromData = (d) => {
    const display = d.attributes.Title;

    // we access the first datasettype index because there should be only one
    const properties = d.attributes?.DatasetType[0];
    const { Variable, Average, DivergingColorScales, xLabel, ScaleReverse } =
      properties;
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
      setDate(keys[val]);
      setSliderPos(val);
    }
  };

  const recalibrateDataSets = () => {
    if (data && !loading) {
      const natlData = data?.natlData;
      const countyData = data?.countyData;

      setDataSlice(countyData[keys[sliderPos]]);
      setNatlDataset(natlData);
    }
  };

  const updateDataSet = () => {
    if (collection && success) {
      const dataSets = collection.data?.attributes?.data_sets;

      if (dataSets) {
        fetchDataSet(dataSets.data[dataSetIndex].id);
        setAttributesFromData(dataSets.data[dataSetIndex]);
        setDataSets(dataSets);
      }
    }
  };

  const dataSetsForOptions = (dataSet) => {
    if (dataSet == null) {
      return [];
    }

    return dataSet.map((d, i) => {
      return { title: d.attributes?.Title, value: i };
    });
  };

  const dataSetSelectHandler = (e) => {
    const value = e.target.value;

    setDataSetIndex(value);
  };

  useEffect(() => {
    updateDataSet();
  }, [success, dataSetIndex]);

  useEffect(() => {
    if (!loading && Object.keys(data).length > 0) {
      const countyData = data?.countyData;
      const natlData = data?.natlData;

      if (countyData) {
        const keyArray = Object.keys(countyData);

        setKeys(keyArray);

        if (natlData) {
          setDate(keyArray[sliderPos]);
        }
      }
    }
  }, [data]);

  // ensure data is passed down on update
  useEffect(() => {
    recalibrateDataSets();
  }, [sliderPos, date, loading]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Selector
            collection={dataSetsForOptions(dataSets?.data)}
            currentValue={dataSetIndex}
            handler={dataSetSelectHandler}
            label="Showing data for:"
            classes="flex justify-between mb-6"
          />
          <MainComponent
            properties={{
              keys,
              changeSliderPos,
              sliderPos,
              natlDataset,
              date,
              dataSlice,
              attributes,
            }}
          />
        </>
      )}
    </>
  );
};

export default FragilityContainer;
