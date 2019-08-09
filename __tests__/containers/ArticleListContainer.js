import React from 'react';
import { shallow } from 'enzyme';
import { expect as chaiExpext } from 'chai';
import configureMockStore from 'redux-mock-store';

import ArticleList from '../../src/components/ArticleList';
import ListPaginationContainer from '../../src/containers/ListPaginationContainer';
import ArticleListContainerWithStore, { mapDispatchToProps, ArticleListContainer } from '../../src/containers/ArticleListContainer';

import { ARTICLE_UNFAVORITED, ARTICLE_FAVORITED } from '../../src/constants/actionTypes';

import { articles } from '../data/articleList'; 

const mockStore = configureMockStore();

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTkzNDIsInVzZXJuYW1lIjoieG94YWNoIiwiZXhwIjoxNTY5MDgyNDcwfQ.NuIXH_W2KR6UhXunU8FX3dahFYb8bKhNAoA0ZNWENE4';

describe('>> ArticleListContainer', () => {
    it('ArticleList is exist', () => {
        const wrapper = shallow(<ArticleListContainer />);

        chaiExpext((wrapper).find(ArticleList)).to.have.length(1);
    });

    it('ListPagination is exist', () => {
        const wrapper = shallow(<ArticleListContainer />);

        chaiExpext((wrapper).find(ListPaginationContainer)).to.have.length(1);
    });


    it('mapStateToProps check', () => {
        const initialState = {
            articleList: {articles},
            common: {token}
        };
        const store = mockStore(initialState);
        const wrapper = shallow(<ArticleListContainerWithStore store={store} />);
        
        expect(wrapper.props().articles).toEqual(articles);
    });

    it('mapDispatchToProps favorite', () => {
        const dispatch = jest.fn();

        mapDispatchToProps(dispatch).favorite('my-articles-7fs8j1');
        const promise = new Promise((res, rej) => {});
        expect(dispatch.mock.calls[0][0]).toEqual({ type: ARTICLE_FAVORITED, payload: promise });
    });

    it('mapDispatchToProps unfavorite', () => {
        const dispatch = jest.fn();

        mapDispatchToProps(dispatch).unfavorite('my-articles-7fs8j1');
        const promise = new Promise((res, rej) => {});
        expect(dispatch.mock.calls[0][0]).toEqual({ type: ARTICLE_UNFAVORITED, payload: promise });
    });
})
