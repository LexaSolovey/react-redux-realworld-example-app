import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../src/components/Header';

describe('>> ListPagination component', () => {
    
    it('renders LoggedOutView in case when userInfo is not exist', () => {
        const wrapper = renderer.create(
            <MemoryRouter>
<               Header appName={'conduit'} />
            </MemoryRouter>
        ).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders LoggedInView in case when userInfo is exist', () => {
        const currentUser = {
            username: 'xoxach',
            image: 'C:/Program Files (x86)/Google/Chrome/Application/76.0.3809.100/Locales/am.pak'
        };
        const wrapper = renderer.create(
            <MemoryRouter>
                <Header appName={'conduit'} currentUser={currentUser} />
            </MemoryRouter>
        ).toJSON();
        expect(wrapper).toMatchSnapshot();
    });
})
