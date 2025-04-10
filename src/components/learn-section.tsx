'use client'
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Button from "./button";
import ArticleCard from "./article-card";
import { useGetBlogsQuery } from "@/features/blogsApi";
import Loader from "./loader";

const LearnSection: React.FC = () => {
  const { data, error, isLoading } = useGetBlogsQuery({ page: 1, limit: 3 });

  // Extract blogs from the API response
  const blogs = data?.data || [];

  // Define animation variants
  const sectionVariants = {
    offscreen: {
      opacity: 0,
      y: 100,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1,
      },
    },
  };

  const articleVariants = {
    offscreen: {
      opacity: 0,
      y: 50,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="bg-tertiary py-24 mt-10">
      <motion.div
        className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto text-center"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 mb-4 font-heading"
          variants={sectionVariants}
        >
          LEARN TO BECOME A BETTER INVESTOR
        </motion.h2>
        <motion.p
          className="text-md text-gray-black font-body mb-12"
          variants={sectionVariants}
        >
          Check out these learning articles to find out more about how managed <br className="hidden md:block" />
          investing can help you save for retirement.
        </motion.p>
        <motion.div
          className="pt-12 pb-20 bg-tertiary"
          variants={sectionVariants}
        >
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div>Error loading blogs</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((article: { title: string; description: string; imageUrl: string, slug: string }, index: number) => (
                <motion.div
                  key={index}
                  variants={articleVariants}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
        <motion.div
          className="mt-12"
          variants={sectionVariants}
        >
          <Link href="/articles">
            <Button value="READ MORE ARTICLES &rarr;" type="filled" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LearnSection;
