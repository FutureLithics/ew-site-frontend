import { useState, useEffect } from "react";
import {timeParse} from 'd3';

const parseTime = timeParse("%Y-%m-%d");

import Line from "./charts/line";

var chartObject;

const LineChart = ({ data, year, date }) => {

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            const lineData = Object.keys(data).map((key) => {
                const val = Math.round(Number(data[key].a_natl * 100) / 100);
                return {x: parseTime(key), y: val};
            })

            let options = {
                xLabel: `Showing average income for Year: ${year}`,
                date: parseTime(date)
            }
            
            chartObject = new Line("#line-chart-yearly", lineData, options);
        }
    }, [data])

    useEffect(() => {
        if (chartObject) {
            chartObject.updateDate(parseTime(date));
        }
    }, [date])

    return (
        <div id="line-chart-yearly" className="" width={960} height={360} />
    );

}

export default LineChart;