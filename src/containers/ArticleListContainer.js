import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import agent from '../agent';
import {ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';

import ArticleList from './../components/ArticleList';
import ListPaginationContainer from './ListPaginationContainer';

const mapStateToProps = state => ({
    ...state.articleList,
    token: state.common.token
});
  
export const mapDispatchToProps = dispatch => ({
    favorite: slug => dispatch({
        type: ARTICLE_FAVORITED,
        payload: agent.Articles.favorite(slug)
    }),
    unfavorite: slug => dispatch({
        type: ARTICLE_UNFAVORITED,
        payload: agent.Articles.unfavorite(slug)
    })
});

export const ArticleListContainer = (props) => {
    return (
        <Fragment>
            <ArticleList
                articles={props.articles}
                loading={props.loading}
                articlesCount={props.articlesCount}
                currentPage={props.currentPage}
                favorite={props.favorite}
                unfavorite={props.unfavorite}
            />
            <ListPaginationContainer />
        </Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);

