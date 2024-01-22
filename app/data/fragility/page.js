import { Suspense } from "react";
import FragilityContext from "../../_components/PageComponents/FragilityContext";
import "rsuite/dist/rsuite-no-reset.min.css";
import Loader from "@/app/_components/Loader";

export const metadata = {
  title: "Fragility | Emily Williams - Household Finance",
  description: `A data visualization that enables analysis of income over time which 
                provides insights into household fragility`,
};

const Fragility = async () => {
  return (
    <Suspense fallback={<Loader />}>
      <main className="data-charts w-screen flex min-h-screen flex-col items-center p-4">
        <FragilityContext />
      </main>
    </Suspense>
  );
};

export const revalidate = 10;

export default Fragility;
