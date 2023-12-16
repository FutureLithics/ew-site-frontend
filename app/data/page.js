import { fetchDataSet } from '../utils/api';
import ChoroplethMap from '../_components/Charts/ChoroplethMap';

const Data = async () => {

    const data = await fetchDataSet();
    const stateData = data?.data?.stateData;

	return (
		<main className="w-screen flex min-h-screen flex-col items-center justify-between p-12">
            <ChoroplethMap data={stateData} />
		</main>
	)
}

export default Data;