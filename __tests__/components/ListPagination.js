import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ListPagination from '../../src/components/ListPagination';

describe('>> ListPagination component', () => {
    it('renders null in case when articlesCount less than 10', () => {
        const wrapper = renderer.create(<ListPagination articlesCount={9} />).toJSON();
        expect(wrapper).toEqual(null);
    });

    it('onTagClick executes preventDefault() and setPage should be called', () => {
        const setPage = jest.fn();
        const wrapper = shallow(<ListPagination articlesCount={30} setPage={setPage} />);
        let prevented = false;

        wrapper.find('ul.pagination')
            .simulate('click', {
                preventDefault: () => {prevented = true},
                target: {
                    tagName: 'A',
                    attributes: {
                        'data-tagname': {value: 'buff'}
                    }
                }
            });

        expect(prevented).toBe(true);
        expect(setPage).toHaveBeenCalled();

    });

    it('setPage method should not be called by onTagClick', () => {
        const setPage = jest.fn();
        const wrapper = shallow(<ListPagination articlesCount={30} setPage={setPage}/>);

        wrapper.find('ul.pagination')
            .simulate('click', {
                preventDefault: () => {},
                target: {
                    tagName: 'A',
                    attributes: {
                        'data-tagname': {}
                    }
                }
            });

        expect(setPage).not.toHaveBeenCalled();
    });
})
