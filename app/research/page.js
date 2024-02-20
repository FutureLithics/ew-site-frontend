import { fetchPageData } from "../utils/api";
import LinkList from "../_components/Article/LinkList";

export const metadata = {
  title: "Research | Emily Williams - Household Finance",
  description:
    "A page referencing research that is both published and in progress.",
};

const Research = async () => {
  const res = await fetchPageData(2);

  return (
    <main className="w-screen flex min-h-screen flex-col items-center justify-between p-24">
      {res.success &&
        res.content.map((component) => {
          return <LinkList component={component} classes={"w-full my-4"} />;
        })}
    </main>
  );
};

export const revalidate = 10;

export default Research;
