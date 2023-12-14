import { fetchDataSet } from '../utils/api';

const Data = async () => {

    const data = await fetchDataSet();
    console.log(data.data, 'data')

	return (
		<main className="w-screen flex min-h-screen flex-col items-center justify-between p-24">
			<p>This Page will house data content.</p>
		</main>
	)
}

export default Data;