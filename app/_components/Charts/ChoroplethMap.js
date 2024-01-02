"use client";
import { useState, useEffect, useRef } from "react";
import { json } from "d3";

import Choropleth from "./charts/choropleth";
import Loader from "../Loader";

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
    display: "County",
    name: "county",
    topoPath: "/datasets/counties-albers-10m.json",
  },
  {
    display: "Place/Census",
    name: "places",
    topoPath: "/datasets/places.json",
  },
];

const TEMPERATURES = [
  { display: "High Temperatures (Avg)", name: "hi_temp", color: "hot" },
  {
    display: "Low Temperatures (Avg)",
    name: "low_temp",
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
  const { countyData, placeData } = data?.data;

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
    const index = TEMPERATURES.findIndex((key) => key.name == val);

    setScheme(TEMPERATURES[index]);
  };

  const selectLevelHandler = (e) => {
    const val = e.target.value;
    const index = LEVELS.findIndex((key) => key.name == val);

    if (LEVELS[index].name == "county") {
      setDataset(countyData);
    } else if (LEVELS[index].name == "places") {
      setDataset(placeData);
    }

    setLevel(LEVELS[index]);
    setLoading(true);
  };

  const renderMap = () => {
    Object.keys(dataset).map((key) =>
      mapData.set(key, dataset[key][scheme.name]),
    );

    const options = {
        map: 'climate',
        color: scheme.color,
        containerRef: ref,
        scaleReversed: scheme.scaleReversed,
        topoData: topoData,
        level,
        fullScreen,
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
        <div className="flex flex-col">
          <h5 className="font-bold text-md mb-2">
            Showing {scheme.display} by {level.display}
          </h5>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between mb-2">
            <span className="me-2 align-middle">Level:</span>
            <select
              onChange={selectLevelHandler}
              className="ps-4 shadow-md shadow-slate-200 border-radius-5 cursor-pointer hover:bg-slate-50"
            >
              {LEVELS.map((key) => {
                const val = key.name;
                return (
                  <option value={val} key={val}>
                    {key.display}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-between mb-2">
            <span className="me-2 align-middle">Temperature average:</span>
            <select
              onChange={selectHandler}
              className="ps-4 shadow-md shadow-slate-200 border-radius-5 cursor-pointer hover:bg-slate-50"
            >
              {TEMPERATURES.map((key) => {
                const val = key.name;
                return (
                  <option value={val} key={val}>
                    {key.display}
                  </option>
                );
              })}
            </select>
          </div>
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
