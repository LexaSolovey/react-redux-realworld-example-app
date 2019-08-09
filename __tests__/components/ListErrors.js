import React from 'react';
import renderer from 'react-test-renderer';
import ListErrors from '../../src/components/ListErrors';

describe('>> ListErrors component', () => {
    it('renders null in case when errors is not exists', () => {
        const wrapper = renderer.create(<ListErrors />).toJSON();
        expect(wrapper).toEqual(null);
    });

    it('snapshot when errors are exist', () => {
        const errors = {
            'Email or password': 'is invalid',
            'Status: 400. Bad request': 'Please, try again'
        };
        const wrapper = renderer.create(<ListErrors errors={errors} />).toJSON();
        expect(wrapper).toMatchSnapshot();
    });
})
