import { useState, useEffect } from "react";
import { timeParse } from "d3";

const parseTime = timeParse("%Y-%m-%d");

import Line from "./charts/line";

var chartObject;

const LineChart = ({ data, year, date, attributes }) => {
    useEffect(() => {
        if (data && Object.keys(data).length > 0 && attributes) {
            const { xLabel, avg } = attributes;

            const lineData = Object.keys(data).map((key) => {
                const val = Math.round(Number(data[key][avg] * 100) / 100);
                return { x: parseTime(key), y: val };
            });

            const label = xLabel ? `${xLabel} ${year}` : "";

            let options = {
                xLabel: label,
                date: parseTime(date),
            };

            chartObject = new Line("#line-chart-yearly", lineData, options);
        }
    }, [data, attributes]);

    useEffect(() => {
        if (chartObject) {
            chartObject.updateDate(parseTime(date));
        }
    }, [date]);

    return <div id="line-chart-yearly" className="" width={960} height={360} />;
};

export default LineChart;
