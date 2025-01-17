import { fetchBlogBySlug } from "../../utils/api";
import { Suspense } from "react";
import Loader from "@/app/_components/Loader";
import { notFound } from "next/navigation";

import ArticleComponent from "@/app/_components/PageComponents/ArticleComponent";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const res = await fetchBlogBySlug(params.slug);
  const data = res.data?.data[0];

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data.attributes?.Title,
    description: data.attributes?.Excerpt,
  };
}

const BlogPost = async ({ params }) => {
  const res = await fetchBlogBySlug(params.slug);
  const data = res.data;

  if (res.success == false || data.data.length <= 0) {
    notFound();
  }

  return (
    <Suspense fallback={<Loader />}>
      <main className="w-screen flex min-h-screen flex-col items-center py-8 px-12 md:px-24">
        <ArticleComponent data={data} />
      </main>
    </Suspense>
  );
};

export const revalidate = 10;

export default BlogPost;
