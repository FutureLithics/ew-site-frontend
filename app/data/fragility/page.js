import { Suspense } from "react";
import FragilityContext from "../../_components/PageComponents/FragilityContext";
import "rsuite/dist/rsuite-no-reset.min.css";
import Loader from "@/app/_components/Loader";

import Collapsible from "@/app/_components/Shared/Collapsible";
import { fetchPageData } from "@/app/utils/api";

export const metadata = {
  title: "Fragility | Emily Williams - Household Finance",
  description: `A data visualization that enables analysis of income over time which 
                provides insights into household fragility`,
};

const Fragility = async () => {
  const pageData = await fetchPageData(6);

  return (
    <Suspense fallback={<Loader />}>
      <main className="data-charts w-screen flex min-h-screen flex-col items-center p-4">
        <div className="px-24 mb-4">
          {pageData.content && pageData.content.length > 0 && <Collapsible content={pageData.content[0]} />}
        </div>
        <FragilityContext />
      </main>
    </Suspense>
  );
};

export const revalidate = 10;

export default Fragility;
