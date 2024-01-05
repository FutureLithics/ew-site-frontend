// import {useEffect, useState, Suspense} from 'react';
import { fetchSingleCollection } from "../../utils/api";
import FragilityContainer from "./FragilityContainer";

const FragilityContext = async () => {
    const res = await fetchSingleCollection();
    const data = res.data;

    return (
        <>
            <FragilityContainer collection={data} success={res.success} />
        </>
    );
};

export default FragilityContext;
