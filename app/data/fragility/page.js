import { Suspense } from "react";
import FragilityContext from "../../_components/PageComponents/FragilityContext";
import "rsuite/dist/rsuite-no-reset.min.css";
import Loader from "@/app/_components/Loader";

const Fragility = async () => {
    return (
        <Suspense fallback={<Loader />}>
            <main className="data-charts w-screen flex min-h-screen flex-col items-center p-4">
                <FragilityContext />
            </main>
        </Suspense>
    );
};

export const fetchCache = "force-no-store";
export const revalidate = 1;

export default Fragility;
