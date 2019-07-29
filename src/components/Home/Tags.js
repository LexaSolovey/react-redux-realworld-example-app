import React from 'react';

const Tags = ({tags, fetchArticlesByTag}) => {
  const callFetchAtricles = (event) => {
    event.preventDefault();

    const {tagName, attributes} = event.target;

    if(tagName === 'A' && attributes['data-tagname'].value) {
      fetchArticlesByTag(attributes['data-tagname'].value)
    }
  };

  if (tags) {
    return (
      <div className="tag-list" onClick={callFetchAtricles}>
        {tags.map((tag) => (
            <a
              href=""
              className="tag-default tag-pill"
              key={tag}
              data-tagname={tag}>
              {tag}
            </a>
          )
        )}
      </div>
    );
  } else {
    return (
      <div>Loading Tags...</div>
    );
  }
};

export default Tags;
