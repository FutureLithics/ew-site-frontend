'use client'
import { utcFormat } from 'd3';
import Link from 'next/link';
const formatTime = utcFormat("%b %d, %Y");

const parseTaxonomies = (data) => {
    return data.map((d) => {
        const {Title, Slug} = d.attributes
        return {Title, Slug}
    })
}

const BlogPostComponent = async ({attributes}) => {

    const { Title, FeaturedImage, ArticleComponent, publishedAt, Taxonomies } = attributes;
    const { url, alternativeText } = FeaturedImage?.data?.attributes;

    console.log(attributes);

    return (
        <article className="w-full">
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-2/5 h-auto flex justify-center content-center mb-4">
                    <img 
                        src={url}
                        alt={alternativeText}
                        className='w-full min-h-full object-cover'
                    />
                </div>
                <div className="w-2/5 meta-text pt-1 border-t-2 border-accentPurple">
                    <div className="prose">
                        <h3 className="mt-2 mb-0">{Title}</h3>
                        <p className="mb-0"><strong>{formatTime(new Date(publishedAt))}</strong></p>
                        <div className="inline-flex">
                            <h6 className="font-black me-2">Categories:</h6>
                            {
                                Taxonomies && parseTaxonomies(Taxonomies.data).map((tax) => {
                                    return <Link 
                                                classNames="text-amber-500 hover:text-amber-600" 
                                                key={tax.Slug} 
                                                href={`taxonomy/${tax.Slug}`}>{tax.Title}</Link>;
                                })
                            } 
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogPostComponent;