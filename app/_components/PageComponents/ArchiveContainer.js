"use client";
import { useState, useEffect } from "react";

import PostsContainer from "../Shared/PostsContainer";
import Search from "../Shared/Search";

import { fetchPostsByTaxonomySlug } from "@/app/utils/api";

const limit = 6;

const ArchiveContainer = ({ initialData, slug, taxonomyMeta }) => {
    const [searchFilter, setSearchFilter] = useState("");
    const [currentPosts, setCurrentPosts] = useState([]);
    const [total, setTotal] = useState(0);
    const [meta, setMeta] = useState({Title: "", Description: ""});

    const searchHandler = () => {
        refreshBlogItems();
    };

    const refreshBlogItems = async (loadMore = false) => {
        const filters = [];

        if (searchFilter != "") {
            filters.push({
                key: "Title",
                operator: "$containsi",
                value: searchFilter,
            });
        }

        const offset = loadMore ? currentPosts.length : 0;
        const posts = loadMore ? currentPosts : [];

        const res = await fetchPostsByTaxonomySlug(slug, limit, offset, filters);

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
        if (initialData?.data) {
            setAndMergePosts(initialData);
        }
    }, [initialData]);

    console.log(currentPosts);

    return (
        <>
            <div className="border-baseBlue border-b-2 w-full py-3">
                {
                    taxonomyMeta && <div className="w-full max-w-full prose my-4 text-center">
                        <h3 className="mb-0">Showing Posts For: {taxonomyMeta.Title}</h3>
                        <p>{taxonomyMeta.Description}</p>
                    </div>
                }
                <div className="w-full inline-flex sm:flex-row justify-end">
                    <Search inputHandler={setSearchFilter} submitHandler={searchHandler} placeholder="Search filter..." />
                </div>
            </div>
            <PostsContainer posts={currentPosts} total={total} loadHandler={refreshBlogItems} />
        </>
    );
};

export default ArchiveContainer;