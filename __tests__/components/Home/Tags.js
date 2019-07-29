import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { expect as chaiExpext } from 'chai';

import { tagsList } from '../../data/tagsList'; 
import Tags from '../../../src/components/Home/Tags';

const fetchArticlesByTag = jest.fn();

describe('>> Tags component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Tags tags={tagsList} fetchArticlesByTag={fetchArticlesByTag} />);
    });

    it('snapshot returns null in case when tags is not exist', () => {
        const wrapper = renderer.create(<Tags />).toJSON();
        expect(wrapper).toMatchSnapshot();
    });
    
    it('snapshot renders tagsList', () => {
        const wrapper = renderer.create(<Tags tags={tagsList} />).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correct number of items', () => {
        chaiExpext(wrapper.find('.tag-default.tag-pill')).to.have.lengthOf(tagsList.length);
    });

    it('callFetchAtricles condition ckeck. fetchArticlesByTag should not be called', () => {
        const event = {
            preventDefault: () => {},
            target: {
                tagName: 'A',
                attributes: {
                    'data-tagname': {}
                }
            }
        };
        
        wrapper.find('div.tag-list').simulate('click', event);
        expect(fetchArticlesByTag).not.toHaveBeenCalled();
    });

    it('callFetchAtricles condition ckeck. fetchArticlesByTag should be called', () => {
        const event = {
            preventDefault: () => {},
            target: {
                tagName: 'A',
                attributes: {
                    'data-tagname': {
                        value: 'butt'
                    }
                }
            }
        };
        
        wrapper.find('div.tag-list').simulate('click', event);
        expect(fetchArticlesByTag).toHaveBeenCalled();
    });

    it('handleClick executes preventDefault()', () => {
        let prevented = false; 
        wrapper.find('div.tag-list')
            .simulate('click', {
                preventDefault: () => {
                    prevented = true;
                },
                target: {
                    tagName: 'A',
                    attributes: {
                        'data-tagname': {
                            value: 'butt'
                        }
                    }
                }
            });

        expect(prevented).toBe(true);
    });
})
