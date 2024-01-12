import {
  fetchPostsByTaxonomySlug,
  fetchTaxonomyBySlug,
} from "../../../utils/api";
import { Suspense } from "react";
import Loader from "@/app/_components/Loader";
import ArchiveContainer from "@/app/_components/PageComponents/ArchiveContainer";

const Taxonomy = async ({ params }) => {
  // sets initial, default blog items
  const postsResponse = await fetchPostsByTaxonomySlug(params.slug);

  // retrieve taxonomy meta for the archive page
  const taxResponse = await fetchTaxonomyBySlug(params.slug);

  const taxMeta = taxResponse.data.data[0].attributes;

  return (
    <Suspense fallback={<Loader />}>
      <main className="w-screen flex min-h-screen flex-col items-center py-8 px-24">
        <ArchiveContainer
          initialData={postsResponse.data}
          slug={params.slug}
          taxonomyMeta={taxMeta}
        />
      </main>
    </Suspense>
  );
};

export const revalidate = 10;

export default Taxonomy;
