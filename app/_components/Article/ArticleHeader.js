"use client";

import Link from "next/link";
import { utcFormat } from "d3";
const formatTime = utcFormat("%b %d, %Y");

const parseTaxonomies = (data) => {
  return data.map((d) => {
    const { Title, Slug } = d.attributes;
    return { Title, Slug };
  });
};

const ArticleHeader = ({ attributes }) => {
  const { Title, FeaturedImage, publishedAt, Taxonomies, Excerpt } = attributes;
  const { url, alternativeText } = FeaturedImage?.data?.attributes;

  return (
    <div className="article-header w-full h-auto md:h-1/2 flex flex-col items-center justify-center md:flex-row  border-b-2 border-accentPurple">
      <div className="w-full md:w-1/3 h-auto flex justify-center content-center mb-4 sm:mb-2">
        <img
          src={url}
          alt={alternativeText}
          className="w-full min-h-full object-cover"
        />
      </div>
      <div className="w-full md:w-2/3 grow h-full meta-text px-0 md:px-8 flex justify-center items-center">
        <div className="min-w-none md:w-2/3 prose text-center sm:text-start md:text-center flex flex-col-reverse md:flex-col">
          <div className="font-extrabold sm:text-xl my-4 sm:mt-0">
            {Excerpt}
          </div>
          <div>
            <h3 className="font-black text-xl md:text-2xl mt-2 mb-0">
              {Title}
            </h3>
            <p className="mb-0">
              <strong>{formatTime(new Date(publishedAt))}</strong>
            </p>
            <div className="inline-flex">
              <h6 className="font-black me-2">Categories:</h6>
              {Taxonomies &&
                parseTaxonomies(Taxonomies.data).map((tax) => {
                  return (
                    <Link
                      className="text-amber-500 hover:text-amber-600"
                      key={tax.Slug}
                      href={`taxonomy/${tax.Slug}`}
                    >
                      {tax.Title}
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;
