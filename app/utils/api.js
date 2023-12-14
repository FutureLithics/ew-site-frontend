import axios from 'axios';
import Papa from 'papaparse';
const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const config = {
    headers: { Authorization: `bearer ${token}` }
};

export const fetchPageData = async (id = 1) => {
    const url = `${baseURL}/api/pages/${id}?populate=deep`;

    try {
        const response = await axios.get(url);

        return processPageContent(response.data);
    } catch (err) {
        return { succes: false, error: err };
    }
   
}

export const fetchDataSet = async (id = 1) => {
    const url = `${baseURL}/api/data-sets/${id}?populate=deep`;
    console.log(config);
    try {
        const response = await axios.get(url, config);

        return await processDataSet(response.data);
    } catch (err) {
        return { succes: false, error: err };
    }
}

const processPageContent = (data) => {
    const content = data?.data?.attributes?.PageContent;
    if (content) {
        return { success: true, content }
    } else {
        return {success: false, content: "There was an error parsing content."}
    }
}

const processDataSet = async (data) => {
    const url = data.data.attributes.DataSet.DataSet.data.attributes.url;

    const csv = await fileParser(url);

    return { success: true, data: csv}
}

const fileParser = async (url) => {

    const file = await axios.get(url);
    const data = Papa.parse(file.data, { header: true });

    return data.data;
}