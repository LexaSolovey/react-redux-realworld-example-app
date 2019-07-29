import React from 'react';
import renderer from 'react-test-renderer';

import Banner from '../../../src/components/Home/Banner';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTkzNDIsInVzZXJuYW1lIjoieG94YWNoIiwiZXhwIjoxNTY5MDgyNDcwfQ.NuIXH_W2KR6UhXunU8FX3dahFYb8bKhNAoA0ZNWENE4';

describe('>> Banner component', () => {
    it('snapshot null in case when token is exist', () => {
        const tree = renderer.create(<Banner token={token} appName="conduit" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it('snapshot without token', () => {
        const tree = renderer.create(<Banner appName="conduit" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it('renders null in case when token is exist', () => {
        const wrapper = renderer.create(<Banner token={token} appName="conduit" />).toJSON();
        expect(wrapper).toEqual(null);
    });
    
})
