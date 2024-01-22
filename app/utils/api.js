"use server";

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
  next: { revalidate: 10 },
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
  const title = data?.data?.attributes?.Title;
  if (content) {
    return { success: true, content, title };
  } else {
    return { success: false, content: "There was an error parsing content." };
  }
};

const processDataSet = async (data, type = "climate", definitions = null) => {
  const url = data.data?.attributes?.DataSet?.DataSet?.data?.attributes?.url;

  try {
    const csv = await fileParser(url);

    if (type == "fragility") {
      const data = processFragilityData(csv, definitions);

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
    const definitions = response.data?.data?.attributes?.DatasetType[0];

    return await processDataSet(response.data, "fragility", definitions);
  } catch (err) {
    return { success: false, error: err };
  }
};

export const fetchSingleCollection = async (
  string = "fragility-dataset-ref",
) => {
  const url = `${baseURL}/api/${string}?populate=deep`;

  try {
    const data = await axios.get(url, config);

    return { success: true, data: data.data };
  } catch (err) {
    return { success: false, error: err };
  }
};

export const fetchBlogItems = async (size = 6, offset = 0, filters = []) => {
  const limit = `pagination[limit]=${size}&`;
  const start = `pagination[start]=${offset}&`;

  let params = `${limit}${start}`;

  filters.map((f) => {
    let filter;
    if (f.secondKey) {
      filter = `filters[${f.key}][${f.secondKey}][${f.operator}]=${f.value}&`;
    } else {
      filter = `filters[${f.key}][${f.operator}]=${f.value}&`;
    }

    params += filter;
  });

  const url = `${baseURL}/api/posts?sort=createdAt:desc&${params}populate=deep`;

  try {
    const res = await axios.get(url, config);

    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err };
  }
};

export const fetchBlogBySlug = async (slug) => {
  const url = `${baseURL}/api/posts?filters[Slug]=${slug}&populate=deep`;

  try {
    const res = await axios.get(url, config);
    console.log(res.data);

    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err };
  }
};

export const fetchTaxonomies = async (deep = false) => {
  const url = `${baseURL}/api/taxonomies?${deep ? "populate=deep" : ""}`;

  try {
    const res = await axios.get(url, config);

    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err };
  }
};

export const fetchPostsByTaxonomySlug = async (
  slug,
  size = 6,
  offset = 0,
  search = [],
) => {
  const limit = `pagination[limit]=${size}&`;
  const start = `pagination[start]=${offset}&`;
  const taxonomy = `filters[Taxonomies][Slug][$eqi]=${slug}&`;

  let params = `${limit}${start}${taxonomy}`;

  search.map((s) => {
    params += `filters[${s.key}][${s.operator}]=${s.value}&`;
  });

  const url = `${baseURL}/api/posts?sort=createdAt:desc&${params}populate=deep`;

  try {
    const res = await axios.get(url, config);

    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err };
  }
};

export const fetchTaxonomyBySlug = async (slug) => {
  const url = `${baseURL}/api/taxonomies?filters[Slug]=${slug}`;

  try {
    const res = await axios.get(url, config);

    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err };
  }
};
