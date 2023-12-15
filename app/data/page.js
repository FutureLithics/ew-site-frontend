import { fetchDataSet } from '../utils/api';

const Data = async () => {

    const data = await fetchDataSet();

    console.log(data, 'data')

    const stateData = data.data.stateData;
    

	return (
		<main className="w-screen flex min-h-screen flex-col items-center justify-between p-24">
            <pre className="flex flex-col">
                {
                    Object.keys(stateData).map((key) => {
                        let data = stateData[key];
                        let count = data.count;
                        let hiTemp = data.avg_hi_temp;
                        let lowTemp = data.avg_low_temp;
                        let keywords = data.keywords;
                        let coldKeys = keywords.cold_keywords;
                        let hotKeys = keywords.hot_keywords;

                        let row = `${key}: count: ${count}; hi_temp: ${hiTemp}; low_temp: ${lowTemp}`;

                        return (
                            <div className="my-2">
                                <div>
                                    {row}                                    
                                </div>
                                <div className="p-4">
                                    <h6>Cold Keywords:</h6>
                                    <div className="ps-4">
                                        {Object.keys(coldKeys).map(key => {
                                            return (
                                                <div>{key}: {coldKeys[key]}</div>
                                            )
                                        })}                                        
                                    </div>

                                </div>
                                <div className="ps-4">
                                <h6>Hot Keywords:</h6>
                                    <div className="ps-4">
                                        {Object.keys(hotKeys).map(key => {
                                            return (
                                                <div>{key}: {hotKeys[key]}</div>
                                            )
                                        })}
                                    </div>
                                </div>                            

                            </div>
                        );
                    })
                }
            </pre>
		</main>
	)
}

export default Data;