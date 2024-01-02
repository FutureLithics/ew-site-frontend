// import {useEffect, useState, Suspense} from 'react';
import { fetchFragilityDataSet } from "../../utils/api";
import FragilityContainer from "./FragilityContainer";

const FragilityContext = async () => {

    const res = await fetchFragilityDataSet();
    const data = await res.data;

    return (
        <>
            <FragilityContainer data={data}/>
        </>            
    );
};

export default FragilityContext;