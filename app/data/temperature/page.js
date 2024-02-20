import { fetchDataSet } from "../../utils/api";
import ChoroplethMap from "../../_components/Charts/ChoroplethMap";
import Popup from "@/app/_components/Shared/Popup";

export const metadata = {
  title: "Climate Analysis | Emily Williams - Household Finance",
  description: `A data visualization that enables analysis of keywords associated with
                extreme temperatures by Place and County`,
};

const Data = async () => {
  const data = await fetchDataSet();

  return (
    <main className="data-charts w-screen flex min-h-screen flex-col items-center justify-between p-12">
      <ChoroplethMap data={data} />
    </main>
  );
};

export const revalidate = 10;

export default Data;
