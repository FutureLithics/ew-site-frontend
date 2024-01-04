import axios from "axios";
import Papa from "papaparse";
const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

import {
    dataByState,
    dataByCounty,
    dataByPlace,
    processFragilityData,
} from "./dataParser.js";

const config = {
    headers: { Authorization: `bearer ${token}` },
};

export const fetchPageData = async (id = 1) => {
    const url = `${baseURL}/api/pages/${id}?populate=deep`;

    try {
        const response = await axios.get(url);

        return processPageContent(response.data);
    } catch (err) {
        return { succes: false, error: err };
    }
};

// Climate, Temperature, and Keyword Data

export const fetchDataSet = async (id = 1) => {
    const url = `${baseURL}/api/data-sets/${id}?populate=deep`;

    try {
        const response = await axios.get(url, config);

        return await processDataSet(response.data);
    } catch (err) {
        return { succes: false, error: err };
    }
};

const processPageContent = (data) => {
    const content = data?.data?.attributes?.PageContent;
    if (content) {
        return { success: true, content };
    } else {
        return {
            success: false,
            content: "There was an error parsing content.",
        };
    }
};

const processDataSet = async (data, type = "climate") => {
    const url = data.data?.attributes?.DataSet?.DataSet?.data?.attributes?.url;

    try {
        const csv = await fileParser(url);

        if (type == "fragility") {
            const data = processFragilityData(csv);

            return { success: true, data };
        } else {
            const dataSet = {
                stateData: dataByState(csv),
                countyData: dataByCounty(csv),
                placeData: dataByPlace(csv),
            };

            return { success: true, data: dataSet };
        }

        // return { success: true, data: dataSet };
    } catch (err) {
        return { success: false, error: err };
    }
};

const fileParser = async (url) => {
    const file = await axios(url);
    const data = Papa.parse(file.data, { header: true });

    return data.data;
};

// Fragility & Economic Data

export const fetchFragilityDataSet = async (id = 2) => {
    const url = `${baseURL}/api/data-sets/${id}?populate=deep`;

    try {
        const response = await axios.get(url, config);

        return await processDataSet(response.data, "fragility");
    } catch (err) {
        return { succes: false, error: err };
    }
};
