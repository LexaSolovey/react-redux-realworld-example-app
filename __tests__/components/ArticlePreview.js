import React from 'react';
import { shallow } from 'enzyme';
import { expect as chaiExpext } from 'chai';

import { articles, articles2 } from '../data/articleList'; 
import ArticlePreview from '../../src/components/ArticlePreview';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';


describe('>> ArticlePreview component', () => {
    it('should have a button with NOT_FAVORITED_CLASS', () => {
        const wrapper = shallow(<ArticlePreview article={articles[0]} />);
        chaiExpext(wrapper.find(`button.${NOT_FAVORITED_CLASS.split(' ').join('.')}`)).to.have.lengthOf(1);
    });

    it('should have a button with FAVORITED_CLASS', () => {
        const wrapper = shallow(<ArticlePreview article={articles[1]} />);
        chaiExpext(wrapper.find(`button.${FAVORITED_CLASS.split(' ').join('.')}`)).to.have.lengthOf(1);
    });

    it('should have a list of tags', () => {
        const wrapper = shallow(<ArticlePreview article={articles2[0]} />);
        chaiExpext(wrapper.find('li.tag-default.tag-pill.tag-outline')).to.have.lengthOf(1);
    });

    it('handleClick executes preventDefault()', () => {
        const wrapper = shallow(<ArticlePreview article={articles[1]} unfavorite={() => {}} favorite={() => {}}/>);
        let prevented = false;

        wrapper.find(`button.${FAVORITED_CLASS.split(' ').join('.')}`)
            .simulate('click', {
                preventDefault: () => {prevented = true},
            });

        expect(prevented).toBe(true);
    });

    it('favorite method should be called by handleClick', () => {
        const favorite = jest.fn();
        const wrapper = shallow(<ArticlePreview article={articles2[1]} unfavorite={() => {}} favorite={favorite}/>);

        wrapper.find(`button.${NOT_FAVORITED_CLASS.split(' ').join('.')}`).simulate('click', {preventDefault: () => {}});
        expect(favorite).toHaveBeenCalled();
    });

    it('unfavorite method should be called by handleClick', () => {
        const unfavorite = jest.fn();
        const wrapper = shallow(<ArticlePreview article={articles[1]} unfavorite={unfavorite} favorite={() => {}}/>);

        wrapper.find(`button.${FAVORITED_CLASS.split(' ').join('.')}`).simulate('click', {preventDefault: () => {}});
        expect(unfavorite).toHaveBeenCalled();
    });

})
