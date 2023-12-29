import { fetchPageData } from "./utils/api";
import FrontPageWidget from "./_components/FrontPageWidget";
import { notFound } from "next/navigation";

const Home = async () => {
    // fetch content for front page
    const data = await fetchPageData();

    // if data.success is false, redirect to error page or render error message
    if (!data.success) {
        notFound();
    }

    return (
        <main className="w-screen flex min-h-screen flex-col items-center justify-between p-12 sm:p-24">
            {data.content !== undefined && (
                <FrontPageWidget content={data.content[0]} />
            )}
        </main>
    );
};

export const revalidate = 10;

export default Home;
