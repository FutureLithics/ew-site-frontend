"use client";
import { useState, useEffect } from "react";

import PostsContainer from "../Shared/PostsContainer";
import Selector from "../Shared/Selector";
import Search from "../Shared/Search";

import { fetchBlogItems } from "@/app/utils/api";

const TYPES = [
  { title: "All Types", value: "all" },
  { title: "Articles", value: "article" },
  { title: "Videos", value: "video" },
  { title: "Podcasts", value: "podcast" },
  { title: "Links", value: "link" },
];

const limit = 6;

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
  };

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
          <Search
            inputHandler={setSearchFilter}
            submitHandler={searchHandler}
          />
        </div>
      </div>
      <PostsContainer
        posts={currentPosts}
        total={total}
        loadHandler={refreshBlogItems}
      />
    </>
  );
};

export default BlogPageContainer;
