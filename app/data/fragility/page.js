import { fetchFragilityDataSet } from "../../utils/api";
import { Slider } from 'rsuite';
import "rsuite/dist/rsuite-no-reset.min.css";
import ChoroplethMap from "../../_components/Charts/ChoroplethMap";

const Fragility = async () => {
    const data = await fetchFragilityDataSet();

    return (
        <main className="data-charts w-screen flex min-h-screen flex-col items-center justify-between p-12">
            <Slider />
        </main>
    );
};

export default Fragility;
