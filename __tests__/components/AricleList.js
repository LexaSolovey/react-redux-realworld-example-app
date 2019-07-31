import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { expect as chaiExpext } from 'chai';

import { articles } from '../data/articleList'; 
import { ArticleList } from '../../src/components/ArticleList';
import ArticlePreview from '../../src/components/ArticlePreview';


describe('>> ArticleList component', () => {
    it('snapshot returns Loading in case when articles is not exist', () => {
        const wrapper = renderer.create(<ArticleList />).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('snapshot returns no articles', () => {
        const wrapper = renderer.create(<ArticleList articles={[]} />).toJSON();
        expect(wrapper).toMatchSnapshot();
    });
    
    it('renders correct number of items', () => {
        const wrapper = shallow(<ArticleList articles={articles} articlesCount={articles.length} />)
        chaiExpext(wrapper.find(ArticlePreview)).to.have.lengthOf(articles.length);
    });
})
