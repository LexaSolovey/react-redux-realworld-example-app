import React from 'react';

const ListPagination = (props) => {
    if (props.articlesCount <= 10) {
        return null;
    }

  const range = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    range.push(i);
  }

  const onTagClick = (event) => {
    event.preventDefault();

    const {tagName, attributes} = event.target;
    if (tagName === 'A' && attributes['data-tagname'].value) {
      props.setPage(+ attributes['data-tagname'].value)
    }
  };

  return (
    <nav>
      <ul className="pagination" onClick={onTagClick}>
        {range.map((item) => (
          <li
            className={ item === props.currentPage ? 'page-item active' : 'page-item' }
            key={item.toString()}
          >
            <a data-tagname={item} className="page-link" href="">{item + 1}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ListPagination;
