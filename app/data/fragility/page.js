import { Suspense } from "react";
import { fetchFragilityDataSet } from "../../utils/api";
import FragilityContext from './FragilityContext';
import "rsuite/dist/rsuite-no-reset.min.css";
import Loader from "@/app/_components/Loader";
import ChoroplethMap from "../../_components/Charts/ChoroplethMap";

const Fragility = async () => {

    return (
        <Suspense fallback={<Loader />}>
            <main className="data-charts w-screen flex min-h-screen flex-col items-center justify-between p-12">
                <FragilityContext />
            </main>  
        </Suspense>          
    );
};

export default Fragility;
