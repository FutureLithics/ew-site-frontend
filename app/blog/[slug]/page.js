import { fetchBlogBySlug } from "../../utils/api";
import { Suspense } from "react";
import Loader from "@/app/_components/Loader";

import ArticleComponent from "@/app/_components/PageComponents/ArticleComponent";

const BlogPost = async ({params}) => {
    const res = await fetchBlogBySlug(params.slug);
    const { attributes } = res.data.data[0];

    return (
        <Suspense fallback={<Loader />}>
            <main className="w-screen flex min-h-screen flex-col items-center py-8 px-24">
                <ArticleComponent attributes={attributes} />
            </main>            
        </Suspense>
    );
};

export const revalidate = 10;

export default BlogPost;