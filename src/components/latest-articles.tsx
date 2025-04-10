import Link from "next/link";
import React from "react";
import Button from "./button";
import ArticleCard from "./article-card";
import { useGetBlogsQuery } from "@/features/blogsApi";
import Loader from "./loader";

const LatestArticles: React.FC = () => {
  const { data, error, isLoading } = useGetBlogsQuery({ page: 1, limit: 3 });

  // Extract blogs from the API response
  const blogs = data?.data || [];

  return (
    <div className="bg-tertiary py-24 mt-10">
      <div className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 font-heading uppercase">
          Latest Articles
        </h2>
        <p className="text-md text-gray-black font-body mb-12">
          Check out these learning articles to find out more about how managed
          <br className="hidden md:block" />
          investing can help you save for retirement.
        </p>
        <div className="pt-28 pb-20 bg-tertiary mb-28">
          {isLoading ? (<Loader />) : error ? (<div>Error loading blogs</div>) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((article: { title: string; description: string; imageUrl: string, slug: string }, index: number) => (
                <ArticleCard key={index} article={article} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-12">
          <Link href="/articles">
            <Button value="READ MORE ARTICLES &rarr;" type="filled" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
