"use client";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import Selector from "../Shared/Selector";
import { fetchBlogItems } from "@/app/utils/api";

const TYPES = [
    { title: "All Types", value: "all" },
    { title: "Articles", value: "article" },
    { title: "Videos", value: "video" },
    { title: "Podcasts", value: "podcast" },
    { title: "Links", value: "link" },
];

const limit = 6;

const CardContent = ({attributes}) => {
    const { FeaturedImage, Excerpt, Title } = attributes;
    const { url, alternativeText } = FeaturedImage?.data?.attributes;

    return (
        <div className="card w-full rounded-lg shadow-md shadow-slate-300 ">
            <div className="card-image relative w-full h-1/2 border-b-4 border-accentPurple overflow-hidden">
                <img
                    className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg"
                    src={url}
                    alt={alternativeText}
                />
            </div>
            <div className="card-section w-full h-1/2 p-4">
                <h5 className="text-xl font-black mb-2 text-center">
                    {Title}
                </h5>
                <p className="text-md">{Excerpt}</p>
            </div>
        </div>
    );
}

const Card = ({ id, attributes }) => {
    const { LinkURL, Slug } = attributes;

    if (LinkURL) {
        return <a href={LinkURL} target="_blank"><CardContent attributes={attributes} /></a>;
    } else {
        return <Link href={`blog/${Slug}`}><CardContent attributes={attributes} /></Link>;
    }
     
};

const BlogPageContainer = ({ initialData, taxonomies }) => {
    const { data, meta } = initialData;
    const [taxOptions, setTaxOptions] = useState([
        { title: "All Taxonomies", value: "all" },
    ]);
    const [taxonomy, setTaxonomy] = useState("all");
    const [type, setType] = useState(TYPES[0].value);
    const [searchFilter, setSearchFilter] = useState("");
    const [currentPosts, setCurrentPosts] = useState([]);
    const [total, setTotal] = useState(0);

    const taxonomyArray = () => {
        const taxArray = [{ title: "All Taxonomies", value: "all" }];

        taxonomies?.data?.map((tax) => {
            const slug = tax?.attributes?.Slug;
            const title = tax?.attributes?.Title;

            taxArray.push({ title, value: slug });
        });

        setTaxOptions(taxArray);
    };

    const taxonomyHandler = (e) => {
        const value = e.target.value;

        setTaxonomy(value);
    };

    const typeHandler = (e) => {
        const value = e.target.value;

        setType(value);
    };

    const searchHandler = () => {
        refreshBlogItems();
    };

    const refreshBlogItems = async (loadMore = false) => {
        const filters = [];

        if (type != "all") {
            filters.push({ key: "Type", operator: "$eqi", value: type });
        }

        if (taxonomy != "all") {
            filters.push({
                key: "Taxonomies",
                secondKey: "Slug",
                operator: "$eqi",
                value: taxonomy,
            });
        }

        if (searchFilter != "") {
            filters.push({
                key: "Title",
                operator: "$containsi",
                value: searchFilter,
            });
        }

        const offset = loadMore ? currentPosts.length : 0;
        const posts = loadMore ? currentPosts : [];

        const res = await fetchBlogItems(limit, offset, filters);

        setAndMergePosts(res.data, posts);
    };

    const setAndMergePosts = (newData, posts = []) => {
        const ids = posts.map((post) => post.id);
        const filteredPosts = newData?.data.filter((post) => {
            if (!ids.includes(post.id)) {
                return post;
            }
        });

        setCurrentPosts(posts.concat(filteredPosts));

        setTotal(newData?.meta?.pagination?.total);
    }

    useEffect(() => {
        if (taxonomies) {
            taxonomyArray();
            setTaxonomy(taxOptions[0].value);
        }
    }, [taxonomies]);

    useEffect(() => {
        if (initialData?.data) {
            setAndMergePosts(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        refreshBlogItems();
    }, [type, taxonomy]);

    console.log(currentPosts);

    return (
        <>
            <div className="border-baseBlue border-b-2 w-full py-3">
                <h6 className="font-extrabold pb-2">Content Filters</h6>
                <div className="w-full flex flex-col sm:flex-row justify-between">
                    <div className="flex flex-col sm:flex-row">
                        <Selector
                            collection={taxOptions}
                            currentValue={taxonomy}
                            handler={taxonomyHandler}
                            classes="blog-page-filter pe-8 my-1 sm:my-0"
                        />
                        <Selector
                            collection={TYPES}
                            currentValue={type}
                            handler={typeHandler}
                            classes="blog-page-filter my-1 sm:my-0"
                        />
                    </div>
                    <div className="w-full my-1 sm:my-0 sm:w-1/4 search-bar-filter inline-flex relative rounded shadow-sm shadow-baseBlue">
                        <input
                            className="w-full h-full px-2 bg-slate-50 rounded hover:bg-slate-100 outline-0"
                            onChange={(e) => setSearchFilter(e.target.value)}
                        />
                        <button
                            className="min-h-full px-2 flex rounded-tr rounded-br justify-center content-center bg-slate-200 hover:bg-slate-300"
                            onClick={searchHandler}
                        >
                            <MagnifyingGlassIcon className="w-4 h-4 baseBlue self-center" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="py-4">
                    <span className="font-extrabold">
                        Showing {currentPosts.length} out of {total} posts
                    </span>
                </div>
            </div>
            <div className="card-container w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-24">
                {currentPosts.map((post) => {
                    const id = post.id;
                    const attributes = post.attributes;

                    if (id && attributes) {
                        return <Card id={id} attributes={attributes} />;
                    }
                })}
            </div>
            <div className="w-full text-center mt-32">
                {
                    (currentPosts.length < total && total > 0) &&                 
                    <button 
                        className="py-2 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-black text-xl outline-none"
                        onClick={() => refreshBlogItems(true)}
                    >
                            Load More
                    </button>
                }
            </div>
        </>
    );
};

export default BlogPageContainer;
