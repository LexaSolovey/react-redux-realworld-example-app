import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect as chaiExpext } from 'chai';
import configureMockStore from 'redux-mock-store';

import ListPagination from '../../src/components/ListPagination';
import ListPaginationContainerWithStore, {ListPaginationContainer, mapDispatchToProps} from '../../src/containers/ListPaginationContainer';

import { SET_PAGE } from '../../src/constants/actionTypes';

const mockStore = configureMockStore();

describe('>> ListPaginationContainer', () => {
    let wrapper, store;
    const pager = () => {};

    beforeEach(() => {
        const initialState = {
            articleList: {
                currentPage: 0,
                articlesCount: 50,
                pager
            },
        };
        store = mockStore(initialState);
    });

    it('ListPagination is exist', () => {
        wrapper = mount(<ListPaginationContainerWithStore store={store} />);
        chaiExpext((wrapper).find(ListPagination)).to.have.length(1);
    });


    it('mapStateToProps check', () => {
        wrapper = shallow(<ListPaginationContainerWithStore store={store} />);

        expect(wrapper.props().currentPage).toEqual(0);
        expect(wrapper.props().articlesCount).toEqual(50);
        expect(wrapper.props().pager).toEqual(pager);
    });

    it('mapDispatchToProps favorite', () => {
        const dispatch = jest.fn();

        mapDispatchToProps(dispatch).onSetPage(1, pager);
        expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_PAGE, page: 1, payload: pager });
    });

    it('executing of onSetPage', () => {
        const onSetPageWithoutPager = jest.fn();
        const onSetPageWithPager = jest.fn();

        const instanceWithoutPager = shallow(<ListPaginationContainer onSetPage={onSetPageWithoutPager} />).instance();
        const instanceWithPager = shallow(<ListPaginationContainer pager={() => {}} onSetPage={onSetPageWithPager} />).instance();

        instanceWithoutPager.setPage(1);
        instanceWithPager.setPage(3);

        expect(onSetPageWithoutPager).toHaveBeenCalled();
        expect(onSetPageWithPager).toHaveBeenCalled();
    });

})
