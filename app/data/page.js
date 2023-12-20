import { fetchDataSet } from '../utils/api';
import ChoroplethMap from '../_components/Charts/ChoroplethMap';

const Data = async () => {

    const data = await fetchDataSet();
    const stateData = data?.data?.stateData;
    const placeData = data?.data?.placeData;

	return (
		<main className="data-charts w-screen flex min-h-screen flex-col items-center justify-between p-12">
            <ChoroplethMap data={placeData} />
		</main>
	)
}

export default Data;