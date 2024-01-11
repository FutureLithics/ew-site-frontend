import { useState, useEffect } from "react";
import { timeParse } from "d3";

const parseTime = timeParse("%Y-%m-%d");

import Line from "./charts/line";

var chartObject;

const roundValue = (value) => {
    return Math.round(Number(value) * 100) / 100;
};

const LineChart = ({ data, date, attributes }) => {
    useEffect(() => {
        if (data && Object.keys(data).length > 0 && attributes) {
            const { xLabel, avg } = attributes;

            const lineData = Object.keys(data).map((key) => {
                const val = roundValue(data[key][avg]);

                return { x: parseTime(key), y: val };
            });

            const label = xLabel ? `${xLabel}` : "";

            let options = {
                xLabel: label,
                date: parseTime(date),
                initialValue: roundValue(data[date][avg]),
            };

            chartObject = new Line("#line-chart-yearly", lineData, options);
        }
    }, [data, attributes]);

    useEffect(() => {
        if (chartObject && data[date]) {
            const { avg } = attributes;
            const val = roundValue(data[date][avg]);
            chartObject.updateDate(parseTime(date), val);
        }
    }, [date]);

    return <div id="line-chart-yearly" className="" width={960} height={360} />;
};

export default LineChart;
