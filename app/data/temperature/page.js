import { fetchDataSet } from '../../utils/api';
import ChoroplethMap from '../../_components/Charts/ChoroplethMap';

const Data = async () => {

    const data = await fetchDataSet();

	return (
		<main className="data-charts w-screen flex min-h-screen flex-col items-center justify-between p-12">
            <ChoroplethMap data={data} />
		</main>
	)
}

export default Data;