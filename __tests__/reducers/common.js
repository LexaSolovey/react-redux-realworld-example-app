import common from '../../src/reducers/common';
import {
    APP_LOAD,
    REDIRECT,
    LOGOUT,
    ARTICLE_SUBMITTED,
    SETTINGS_SAVED,
    LOGIN,
    REGISTER,
    DELETE_ARTICLE,
    ARTICLE_PAGE_UNLOADED,
    EDITOR_PAGE_UNLOADED,
    HOME_PAGE_UNLOADED,
    PROFILE_PAGE_UNLOADED,
    PROFILE_FAVORITES_PAGE_UNLOADED,
    SETTINGS_PAGE_UNLOADED,
    LOGIN_PAGE_UNLOADED,
    REGISTER_PAGE_UNLOADED
} from '../../src/constants/actionTypes';
import {user} from '../data/user';
import {articles} from '../data/articleList';


describe('common reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            appName: 'Conduit',
            token: null,
            viewChangeCounter: 0
        }
    });

    it('should return the initial state', () => {
        expect(common(undefined, {})).toEqual(initialState)
    });

    it('APP_LOAD', () => {
        const actionWithUser = {
            type: APP_LOAD,
            payload: {user: user},
            token: user.token,
            skipTracking: true
        };
        const actionWithoutUser = {
            type: APP_LOAD,
            payload: null,
            token: "",
            skipTracking: true
        };

        expect(common(initialState, actionWithUser)).toEqual({...initialState, token: user.token, appLoaded: true, currentUser: user});
        expect(common(initialState, actionWithoutUser)).toEqual({...initialState, token: null, appLoaded: true, currentUser: null});
    });

    it('REDIRECT', () => {
        expect(common(initialState, {type: REDIRECT})).toEqual({...initialState, redirectTo: null});
    });

    it('LOGOUT', () => {
        expect(common(initialState, {type: LOGOUT})).toEqual({...initialState, redirectTo: '/', token: null, currentUser: null});
    });

    it('ARTICLE_SUBMITTED', () => {
        const action = {
            type: ARTICLE_SUBMITTED,
            payload: {
                article: articles[0]
            }
        };

        expect(common(initialState, action)).toEqual({...initialState, redirectTo: `/article/${articles[0].slug}`});
    });

    it('SETTINGS_SAVED', () => {
        const changedUserInfo = { 
            ...user,
            bio: 'bio',
            image: 'C:\\user.jpg'   
        };
        const actionWithError = {
            type: SETTINGS_SAVED,
            payload: {errors: ['cannot POST https://conduit.productionready.io/api/users/dlogin (404)']},
            error: true
        };
        const actionSuccess = {
            type: SETTINGS_SAVED,
            payload: {user: changedUserInfo}
        };

        expect(common(initialState, actionWithError)).toEqual({...initialState, redirectTo: null, currentUser: null});
        expect(common(initialState, actionSuccess)).toEqual({...initialState, redirectTo: '/', currentUser: changedUserInfo});
    });

    it('LOGIN, REGISTER', () => {
        const actionLoginError = {
            type: LOGIN,
            payload: {errors: ['cannot POST https://conduit.productionready.io/api/users/dlogin (404)']},
            error: true
        };
        const actionRegisterError = {
            type: REGISTER,
            payload: {errors: ['cannot POST https://conduit.productionready.io/api/users/dlogin (404)']},
            error: true
        };
        const actionRegister = {type: REGISTER, payload: {user}};
        const actionLogin = {type: LOGIN, payload: {user}};

        expect(common(initialState, actionLoginError)).toEqual({...initialState, redirectTo: null, token: null, currentUser: null});
        expect(common(initialState, actionRegisterError)).toEqual({...initialState, redirectTo: null, token: null, currentUser: null});
        expect(common(initialState, actionLogin)).toEqual({...initialState, redirectTo: '/', token: user.token, currentUser: user});
        expect(common(initialState, actionRegister)).toEqual({...initialState, redirectTo: '/', token: user.token, currentUser: user});
    });

    it('DELETE_ARTICLE', () => {
        expect(common(initialState, {type: DELETE_ARTICLE})).toEqual({...initialState, redirectTo: '/'});
    });

    it('ARTICLE_PAGE_UNLOADED, EDITOR_PAGE_UNLOADED, HOME_PAGE_UNLOADED, PROFILE_PAGE_UNLOADED, PROFILE_FAVORITES_PAGE_UNLOADED, SETTINGS_PAGE_UNLOADED, LOGIN_PAGE_UNLOADED, REGISTER_PAGE_UNLOADED', () => {
        expect(common({...initialState, viewChangeCounter: 0}, {type: ARTICLE_PAGE_UNLOADED})).toEqual({...initialState, viewChangeCounter: 1});
        expect(common({...initialState, viewChangeCounter: 1}, {type: EDITOR_PAGE_UNLOADED})).toEqual({...initialState, viewChangeCounter: 2});
        expect(common({...initialState, viewChangeCounter: 2}, {type: HOME_PAGE_UNLOADED})).toEqual({...initialState, viewChangeCounter: 3});
        expect(common({...initialState, viewChangeCounter: 3}, {type: PROFILE_PAGE_UNLOADED})).toEqual({...initialState, viewChangeCounter: 4});
        expect(common({...initialState, viewChangeCounter: 4}, {type: PROFILE_FAVORITES_PAGE_UNLOADED})).toEqual({...initialState, viewChangeCounter: 5});
        expect(common({...initialState, viewChangeCounter: 5}, {type: SETTINGS_PAGE_UNLOADED})).toEqual({...initialState, viewChangeCounter: 6});
        expect(common({...initialState, viewChangeCounter: 6}, {type: LOGIN_PAGE_UNLOADED})).toEqual({...initialState, viewChangeCounter: 7});
        expect(common({...initialState, viewChangeCounter: 7}, {type: REGISTER_PAGE_UNLOADED})).toEqual({...initialState, viewChangeCounter: 8});
    });
});