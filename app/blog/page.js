import { fetchBlogItems, fetchTaxonomies, fetchPageData } from "../utils/api";
import { Suspense } from "react";
import Loader from "@/app/_components/Loader";
import BlogPageContainer from "../_components/PageComponents/BlogPageContainer";

const Blog = async () => {
  // sets initial, default blog items
  const blogResponse = await fetchBlogItems();
  const taxResponse = await fetchTaxonomies();
  const pageData = await fetchPageData(3);

  return (
    <Suspense fallback={<Loader />}>
      <main className="w-screen flex min-h-screen flex-col items-center py-8 px-12 sm:px-24">
        <BlogPageContainer
          content={pageData.content}
          initialData={blogResponse.data}
          taxonomies={taxResponse.data}
        />
      </main>
    </Suspense>
  );
};

export const revalidate = 10;

export default Blog;
