import axios from 'axios';

export const fetchPageData = async (id = 1) => {
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const url = `${baseURL}/api/pages/${id}?populate=deep`;

    try {
        const response = await axios.get(url);

        return processPageContent(response.data);
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