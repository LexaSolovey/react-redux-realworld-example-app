import home from '../../src/reducers/home';
import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../../src/constants/actionTypes';


describe('home reducer', () => {
    it('should return the initial state, HOME_PAGE_UNLOADED', () => {
        expect(home(undefined, {})).toEqual({})
        expect(home({}, {type: HOME_PAGE_UNLOADED})).toEqual({})
    });

    it('HOME_PAGE_LOADED', () => {
        const tags = ['the bad', 'the good', 'the ugly'];
        const action = {
            type: HOME_PAGE_LOADED,
            payload: [
                {tags},
                {articles:[], articlesCount: 0}
            ],
        };
        
        expect(home({}, action)).toEqual({tags});
    });
});