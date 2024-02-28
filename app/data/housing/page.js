import Collapsible from "@/app/_components/Shared/Collapsible";
import { fetchPageData } from "@/app/utils/api";

export const metadata = {
    title: "Housing | Emily Williams - Household Finance",
    description: `A data visualization that enables analysis of housing vulnerabilities.`,
  };
  
  const Network = async () => {
    const pageData = await fetchPageData(5);

    return (
      <main className="w-screen flex min-h-screen flex-col items-center p-4 px-24">
        <div>{pageData.content && pageData.content.length > 0 && <Collapsible content={pageData.content[0]} />}</div>
        <p className="my-8 text-2xl">Data Coming Soon!</p>
      </main>
    );
  };
  
  export default Network;