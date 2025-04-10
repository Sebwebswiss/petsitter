import Link from "next/link";
import React from "react";

const ArticleCard: React.FC<{
  article: { title: string; description: string; imageUrl: string, slug: string; };
}> = ({ article }) => (
  <Link href={`/articles/${article.slug}`}>
    <div className="bg-white shadow-lg overflow-hidden flex flex-col h-full">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 py-8 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-4 font-heading text-left">{article.title}</h3>
        <p className="text-sm text-black flex mb-6">
                <div
                  dangerouslySetInnerHTML={{ __html: article.description.slice(0,120) }}
                  className="prose text-left"
                />
              </p>
        <Link href={`/articles/${article.slug}`} className="text-black font-semibold text-left hover:text-primary">
          Read Article &rarr;
        </Link>
      </div>
    </div>
  </Link>
);

export default ArticleCard;
