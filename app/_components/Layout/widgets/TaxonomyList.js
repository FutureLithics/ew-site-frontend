import { fetchTaxonomies } from "@/app/utils/api";
import Link from "next/link";

const TaxonomyList = async () => {
  const res = await fetchTaxonomies();
  const data = res.data?.data;

  return (
    <div>
      <div className="w-48 border-b-2 border-accentPurple mb-4">
        <h4 className="font-extrabold content-center text-xl">Topics</h4>
      </div>

      <ul>
        {data &&
          data.map((d, i) => {
            const { Title, Slug } = d.attributes;

            return (
              <li key={`taxonomy-widget-item-${i}`}>
                <Link
                  href={`/blog/taxonomy/${Slug}`}
                  className="hover:text-amber-400 text-lg"
                >
                  {Title}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default TaxonomyList;
