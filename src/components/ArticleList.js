import ArticlePreview from './ArticlePreview';
import React from 'react';

export const ArticleList = props => {
  if (!props.articles) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        No articles are here... yet.
      </div>
    );
  }

  return (
    <div>
      {props.articles.map(article => (
        <ArticlePreview
          favorite={props.favorite}
          unfavorite={props.unfavorite}
          article={article}
          key={article.slug}
        />
      ))}
    </div>
  );
};

export default ArticleList;
