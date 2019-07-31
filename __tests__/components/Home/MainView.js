import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { expect as chaiExpext } from 'chai';
import configureMockStore from 'redux-mock-store';

import MainViewWithStore, {YourFeedTab, GlobalFeedTab, TagFilterTab, mapDispatchToProps, MainView} from '../../../src/components/Home/MainView';

import {CHANGE_TAB, ARTICLE_UNFAVORITED, ARTICLE_FAVORITED} from '../../../src/constants/actionTypes';

import { tagsList } from '../../data/tagsList';
import { articles } from '../../data/articleList'; 

const mockStore = configureMockStore();

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTkzNDIsInVzZXJuYW1lIjoieG94YWNoIiwiZXhwIjoxNTY5MDgyNDcwfQ.NuIXH_W2KR6UhXunU8FX3dahFYb8bKhNAoA0ZNWENE4';

describe('>> MainView container', () => {
    it('snapshot YourFeedTab should render the conponent if the token exists', () => {
        const wrapper = renderer.create(<YourFeedTab token={token} onTabClick={() => {}} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('snapshot MainView', () => {
        const wrapper = renderer.create(<MainView token={token} onTabClick={() => {}} tag="buff" tab="feed" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('YourFeedTab should return null if the token does not exist', () => {
        const wrapper = renderer.create(<YourFeedTab/>).toJSON();
        expect(wrapper).toEqual(null);
    });

    it('link in YourFeedTab should have nav-link active classname', () => {
        const wrapper = shallow(<YourFeedTab token={token} onTabClick={() => {}} tab="feed"/>);
        chaiExpext((wrapper).find('a.nav-link.active')).to.have.length(1);
    });

    it('clickHandler in YourFeedTab executes preventDefault()', () => {
        const wrapper = shallow(<YourFeedTab token={token} onTabClick={() => {}}/>);
        let prevented = false;

        wrapper.find('a.nav-link')
            .simulate('click', {
                preventDefault: () => {prevented = true},
            });

        expect(prevented).toBe(true);
    });

    it('onTabClick in YourFeedTab should be called', () => {
        const onTabClick = jest.fn();
        const wrapper = shallow(<YourFeedTab token={token} onTabClick={onTabClick}/>);

        wrapper.find('a.nav-link').simulate('click', {preventDefault: () => {}});

        expect(onTabClick).toHaveBeenCalled();
    });

    it('snapshot GlobalFeedTab should render the conponent if the token exists', () => {
        const wrapper = renderer.create(<GlobalFeedTab />);
        expect(wrapper).toMatchSnapshot();
    });

    it('link in GlobalFeedTab should have nav-link active classname', () => {
        const wrapper = shallow(<GlobalFeedTab tab="all"/>);
        chaiExpext((wrapper).find('a.nav-link.active')).to.have.length(1);
    });

    it('clickHandler in GlobalFeedTab executes preventDefault()', () => {
        const wrapper = shallow(<GlobalFeedTab onTabClick={() => {}}/>);
        let prevented = false;

        wrapper.find('a.nav-link')
            .simulate('click', {
                preventDefault: () => {prevented = true},
            });

        expect(prevented).toBe(true);
    });

    it('onTabClick in GlobalFeedTab should be called', () => {
        const onTabClick = jest.fn();
        const wrapper = shallow(<GlobalFeedTab onTabClick={onTabClick}/>);

        wrapper.find('a.nav-link').simulate('click', {preventDefault: () => {}});

        expect(onTabClick).toHaveBeenCalled();
    });

    it('TagFilterTab should return null if the token does not exist', () => {
        const wrapper = renderer.create(<TagFilterTab />).toJSON();
        expect(wrapper).toEqual(null);
    });


    it('snapshot YourFeedTab should render the conponent if the token exists', () => {
        const wrapper = renderer.create(<TagFilterTab tag="buff" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('MainView mapStateToProps check', () => {
        const initialState = {
            articleList: {articles},
            home: {tags: tagsList},
            common: {token}
        };
        const store = mockStore(initialState);
        const wrapper = shallow(<MainViewWithStore store={store} />);
        
        expect(wrapper.props().articles).toEqual(articles);
    });

    it('MainView mapDispatchToProps onTabClick', () => {
        const dispatch = jest.fn();

        mapDispatchToProps(dispatch).onTabClick('all', null, {});
        expect(dispatch.mock.calls[0][0]).toEqual({ type: CHANGE_TAB, tab: 'all', pager: null, payload: {}});
    });

    it('MainView mapDispatchToProps favorite', () => {
        const dispatch = jest.fn();

        mapDispatchToProps(dispatch).favorite('my-articles-7fs8j1');
        const promise = new Promise((res, rej) => {});
        expect(dispatch.mock.calls[0][0]).toEqual({ type: ARTICLE_FAVORITED, payload: promise });
    });

    it('MainView mapDispatchToProps unfavorite', () => {
        const dispatch = jest.fn();

        mapDispatchToProps(dispatch).unfavorite('my-articles-7fs8j1');
        const promise = new Promise((res, rej) => {});
        expect(dispatch.mock.calls[0][0]).toEqual({ type: ARTICLE_UNFAVORITED, payload: promise });
    });
})
