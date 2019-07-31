import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { expect as chaiExpext } from 'chai';
import configureMockStore from 'redux-mock-store';
import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    APPLY_TAG_FILTER
  } from '../../../src/constants/actionTypes';

import HomeWithStore, {Home, mapDispatchToProps} from '../../../src/components/Home/';

import { tagsList } from '../../data/tagsList';

const mockStore = configureMockStore();

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTkzNDIsInVzZXJuYW1lIjoieG94YWNoIiwiZXhwIjoxNTY5MDgyNDcwfQ.NuIXH_W2KR6UhXunU8FX3dahFYb8bKhNAoA0ZNWENE4';

describe('>> Home container', () => {
    const pager = () => {};
    const tag = 'buff';
    const tab = 'all';
    let payload = {};

    it('snapshot Home', () => {
        const wrapper = shallow(<Home token={token} onTabClick={() => {}} onLoad={() => {}} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('mapStateToProps', () => {
        const initialState = {
            home: {tags: tagsList},
            common: {token, appName: 'conduit'}
        };
        const store = mockStore(initialState);
        const wrapper = shallow(<HomeWithStore store={store} />);
        
        expect(wrapper.props().tags).toEqual(tagsList);
        expect(wrapper.props().appName).toEqual('conduit');
        expect(wrapper.props().token).toEqual(token);
    });

    it('mapDispatchToProps onLoad', () => {
        const dispatch = jest.fn();

        mapDispatchToProps(dispatch).onClickTag(tag, pager, payload);
        expect(dispatch.mock.calls[0][0]).toEqual({ type: APPLY_TAG_FILTER, tag, pager, payload });
    });

    it('mapDispatchToProps onLoad', () => {
        const dispatch = jest.fn();

        mapDispatchToProps(dispatch).onLoad(tab, pager, payload);
        expect(dispatch.mock.calls[0][0]).toEqual({ type: HOME_PAGE_LOADED, tab, pager, payload });
    });

    it('mapDispatchToProps onUnload', () => {
        const dispatch = jest.fn();

        mapDispatchToProps(dispatch).onUnload();
        expect(dispatch.mock.calls[0][0]).toEqual({ type: HOME_PAGE_UNLOADED });
    });

    it('executing of onUnload', () => {
        const onUnload = jest.fn();
        const wrapper = shallow(<Home token={token} onTabClick={() => {}} onLoad={() => {}} onUnload={onUnload} />).instance();
        
        wrapper.componentWillUnmount();
        expect(onUnload).toHaveBeenCalled();

    });

    it('executing of onUnload', () => {
        const onClickTag = jest.fn();
        const wrapper = shallow(<Home onClickTag={onClickTag} onTabClick={() => {}} onLoad={() => {}} />).instance();
        
        wrapper.fetchArticlesByTag();
        expect(onClickTag).toHaveBeenCalled();
    });
})
