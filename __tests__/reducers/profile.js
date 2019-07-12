import profileReducer from '../../src/reducers/profile';
import { 
    PROFILE_PAGE_LOADED,
    PROFILE_PAGE_UNLOADED,
    FOLLOW_USER,
    UNFOLLOW_USER
 } from '../../src/constants/actionTypes';


describe('profile reducer', () => {
    const profile = {
        bio: null,
        following: false,
        image: 'C\\asd.jpg',
        username: 'xoxach'
    };

    it('should return the initial state, HOME_PAGE_UNLOADED', () => {
        expect(profileReducer(undefined, {})).toEqual({})
        expect(profileReducer({}, {type: PROFILE_PAGE_UNLOADED})).toEqual({})
    });

    it('PROFILE_PAGE_LOADED', () => {
        const action = {
            type: PROFILE_PAGE_LOADED,
            payload: [
                {profile},
                {articles:[], articlesCount: 0}
            ],
        };
        
        expect(profileReducer({}, action)).toEqual(profile);
    });

    it('FOLLOW_USER, UNFOLLOW_USER', () => {
        const actionFollow = {
            type: FOLLOW_USER,
            payload: {
                profile: {
                    ...profile,
                    following: true
                }
            }
        };
        const actionUnfollow = {
            type: UNFOLLOW_USER,
            payload: {
                profile: {
                    ...profile,
                    following: false
                }
            }
        };
        
        expect(profileReducer(profile, actionFollow)).toEqual(actionFollow.payload.profile);
        expect(profileReducer(actionFollow.payload.profile, actionUnfollow)).toEqual(profile);
    });
});