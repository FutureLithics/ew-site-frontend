"use client";
import { useState, useEffect, useRef } from "react";
import { json } from "d3";

import Choropleth from "./charts/choropleth";
import Loader from "../Loader";
import Selector from "../Shared/Selector";
import Popup from "../Shared/Popup";

const KEYWORDS = [
  { name: "frostbite", color: "cold" },
  { name: "wind_chill", color: "cold" },
  { name: "hypothermia", color: "cold" },
  { name: "heat_wave", color: "hot" },
  { name: "heat_stroke", color: "hot" },
  { name: "humidity", color: "hot" },
];

const LEVELS = [
  {
    title: "County",
    value: "county",
    topoPath: "/datasets/counties-albers-10m.json",
  },
  /*
  {
    title: "Place/Census",
    value: "places",
    topoPath: "/datasets/places.json",
  },
  */
];

const TEMPERATURES = [
  { title: "High Temperatures (Avg)", value: "hi_temp", color: "hot" },
  {
    title: "Low Temperatures (Avg)",
    value: "low_temp",
    color: "cold",
    scaleReversed: true,
  },
];

var topoData;

const PopulatedMap = ({ reference, fullScreen, fullScreenToggle }) => {
  const full = fullScreen ? "full-screen-svg-container" : "";
  const displayButton = fullScreen
    ? "flex content-center justify-center"
    : "hidden";
  const removeButtonArea = fullScreen ? "hidden" : "sm:hidden";

  return (
    <>
      <div className={`fs-button ${displayButton}`}>
        <button
          className={`text-3xl text-white`}
          onClick={() => fullScreenToggle()}
        >
          x
        </button>
      </div>

      <div
        id="choropleth"
        ref={reference}
        className={`svg-container flex content-center ${full}`}
      ></div>
      <div className={`${removeButtonArea} w-full p-4 text-center`}>
        <button
          onClick={() => fullScreenToggle()}
          className="full-screen-button btn mx-auto my-1 sm:hidden"
        >
          Enter fullscreen
        </button>
      </div>
    </>
  );
};

const ChoroplethMap = ({ data }) => {
  const { countyData, placeData, methodology } = data?.data;

  console.log(data, "data");

  const mapData = new Map();
  const ref = useRef();
  const [scheme, setScheme] = useState(TEMPERATURES[0]);
  const [level, setLevel] = useState(LEVELS[0]);
  const [dataset, setDataset] = useState(countyData);
  const [loading, setLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  const fullScreenToggle = () => {
    setFullScreen(!fullScreen);
  };

  const selectHandler = (e) => {
    const val = e.target.value;
    const index = TEMPERATURES.findIndex((key) => key.value == val);

    setScheme(TEMPERATURES[index]);
  };

  const selectLevelHandler = (e) => {
    const val = e.target.value;
    const index = LEVELS.findIndex((key) => key.value == val);

    if (LEVELS[index].value == "county") {
      setDataset(countyData);
    } else if (LEVELS[index].value == "places") {
      setDataset(placeData);
    }

    setLevel(LEVELS[index]);
    setLoading(true);
  };

  const renderMap = () => {
    Object.keys(dataset).map((key) =>
      mapData.set(key, dataset[key][scheme.value]),
    );

    const options = {
      map: "climate",
      color: scheme.color,
      containerRef: ref,
      scaleReversed: scheme.scaleReversed,
      topoData: topoData,
      level,
      fullScreen,
      width: 960,
      height: 880,
    };

    new Choropleth("#choropleth", mapData, options);
  };

  const getTopoData = () => {
    json(level.topoPath).then((data) => {
      topoData = data;

      setLoading(false);
    });
  };

  useEffect(() => {
    if (loading) {
      getTopoData();
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      renderMap();
    } else {
      getTopoData();
    }
  }, [loading, scheme, level]);

  useEffect(() => {
    if (!loading && dataset != undefined) {
      renderMap();
    }
  }, [fullScreen]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full border-b-2 mb-4 flex flex-wrap content-between justify-between">
        <div className="flex flex-row justify-start">
          <h5 className="font-bold text-md mb-2 me-2">
            Showing {scheme.title} by {level.title}
          </h5>
            <Popup
              title="Methodology"
              buttonText={"Methodology"}
              content={methodology}
            />
        </div>
        <div className="flex flex-col">
          {
          /* temporarily disabled
          <Selector
            handler={selectLevelHandler}
            collection={LEVELS}
            label="Level:"
            currentValue={level?.value}
          /> 
          */           
          }

          <Selector
            handler={selectHandler}
            collection={TEMPERATURES}
            label="Temperature average:"
            currentValue={scheme?.value}
          />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <PopulatedMap
          reference={ref}
          fullScreen={fullScreen}
          fullScreenToggle={fullScreenToggle}
        />
      )}
    </div>
  );
};

export default ChoroplethMap;
