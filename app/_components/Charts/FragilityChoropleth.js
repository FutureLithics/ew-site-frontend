"use client";
import { useState, useEffect, useRef } from "react";
import { json } from "d3";

import Choropleth from "./charts/choropleth";
import Loader from "../Loader";

var topoData;

const VARIABLES = [
    {display: "Income", name: 'income', color: 'divergingGreen'}
]

const ChoroplethMap = ({ data }) => {

    const [scheme, setScheme] = useState(VARIABLES[0]);

    const mapData = new Map();
    const ref = useRef();
    const [loading, setLoading] = useState(true);

    const renderMap = () => {
        Object.keys(data).map((key) =>
            mapData.set(key, data[key][scheme.name]),
        );

        const options = {
            map: 'fragility',
            color: scheme.color,
            containerRef: ref,
            topoData: topoData,
            width: 960,
            height: 600
        };

        new Choropleth("#choropleth-fragility", mapData, options);
    };

    const getTopoData = () => {
        json("/datasets/counties-albers-10m.json").then((topo) => {
            topoData = topo;

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
    }, [loading]);

    console.log(data, 'data')

    return (
        <div className="flex flex-col w-full">
        {loading ? (
            <Loader />
        ) : (
            <div
                id="choropleth-fragility"
                ref={ref}
                className={`bg-slate-400 p-8 rounded flex content-center`}
            ></div>
        )}
        </div>
    );
};

export default ChoroplethMap;