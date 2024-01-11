"use client";
import { useState, useEffect, useRef } from "react";
import { json } from "d3";

import Choropleth from "./charts/choropleth";
import Loader from "../Loader";

var topoData;
var choroplethMap;

// switch these to variables in backend that can be dynamically assigned to specific datasets

const ChoroplethMap = ({ data, attributes }) => {
    const ref = useRef();
    const [loading, setLoading] = useState(true);

    const renderMap = () => {
        const mapData = new Map();

        Object.keys(data).map((key) =>
            mapData.set(key, Number(data[key][attributes.var])),
        );

        const avg = Number(data[Object.keys(data)[0]][attributes.avg]);

        const options = {
            map: "fragility",
            color: attributes.color,
            containerRef: ref,
            topoData: topoData,
            scaleReversed: attributes.scaleReversed,
            width: 960,
            height: 600,
            avg,
        };

        choroplethMap = new Choropleth(
            "#choropleth-fragility",
            mapData,
            options,
        );
    };

    const getTopoData = () => {
        json("/datasets/counties-albers-10m.json").then((topo) => {
            topoData = topo;

            setLoading(false);
        });
    };

    useEffect(() => {
        if (loading && attributes != null && data) {
            getTopoData();
        }
    }, [attributes]);

    useEffect(() => {
        if (!loading && data) {
            renderMap();
        }
    }, [loading]);

    useEffect(() => {
        if (data && choroplethMap && !loading) {
            const mapData = new Map();

            Object.keys(data).map((key) =>
                mapData.set(key, Number(data[key][attributes.var])),
            );

            const avg = Number(data[Object.keys(data)[0]][attributes.avg]);

            choroplethMap.updateMap(mapData, avg);
        }
    }, [data]);

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
