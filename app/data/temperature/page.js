import { fetchDataSet } from "../../utils/api";
import ChoroplethMap from "../../_components/Charts/ChoroplethMap";
import Popup from "@/app/_components/Shared/Popup";

import Collapsible from "@/app/_components/Shared/Collapsible";
import { fetchPageData } from "@/app/utils/api";

export const metadata = {
  title: "Climate Analysis | Emily Williams - Household Finance",
  description: `A data visualization that enables analysis of keywords associated with
                extreme temperatures by Place and County`,
};

const Data = async () => {
  const data = await fetchDataSet();
  const pageData = await fetchPageData(7);

  return (
    <main className="data-charts w-screen flex min-h-screen flex-col items-center justify-between p-12">
        <div className="px-24 mb-4">
          {pageData.content && pageData.content.length > 0 && <Collapsible content={pageData.content[0]} />}
        </div>
      <ChoroplethMap data={data} />
    </main>
  );
};

export const revalidate = 10;

export default Data;
