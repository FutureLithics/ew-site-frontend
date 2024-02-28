import Collapsible from "@/app/_components/Shared/Collapsible";
import { fetchPageData } from "@/app/utils/api";

export const metadata = {
  title: "Social Network | Emily Williams - Household Finance",
  description: `Data displaying social networks.`,
};

const Network = async () => {
  const pageData = await fetchPageData(4);

  return (
    <main className="w-screen flex min-h-screen flex-col items-center py-4 px-24">
      <div>{pageData.content && pageData.content.length > 0 && <Collapsible content={pageData.content[0]} />}</div>
      <p className="my-8 text-2xl">Data Coming Soon!</p>
    </main>
  );
};

export default Network;
