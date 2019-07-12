import auth from '../../src/reducers/auth';
import {
    LOGIN,
    REGISTER,
    LOGIN_PAGE_UNLOADED,
    REGISTER_PAGE_UNLOADED,
    ASYNC_START,
    UPDATE_FIELD_AUTH
} from '../../src/constants/actionTypes';

describe('auth reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            email: "xoxach@mail.ru",
            inProgress: null,
            password: "321321321"
        }
    });

    it('should return the initial state', () => {
        expect(auth(undefined, {})).toEqual({})
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
        const actionRegister = {type: REGISTER};
        const actionLogin = {type: LOGIN};

        expect(auth(initialState, actionLoginError)).toEqual({...initialState, inProgress: false, errors: actionLoginError.payload.errors});
        expect(auth(initialState, actionRegisterError)).toEqual({...initialState, inProgress: false, errors: actionRegisterError.payload.errors});
        expect(auth(initialState, actionLogin)).toEqual({...initialState, inProgress: false, errors: null});
        expect(auth(initialState, actionRegister)).toEqual({...initialState, inProgress: false, errors: null});
    });

    it('LOGIN_PAGE_UNLOADED, REGISTER_PAGE_UNLOADED', () => {
        expect(auth(initialState, {type: LOGIN_PAGE_UNLOADED})).toEqual({});
        expect(auth(initialState, {type: REGISTER_PAGE_UNLOADED})).toEqual({});
        expect(auth({}, {type: LOGIN_PAGE_UNLOADED})).toEqual({});
        expect(auth({}, {type: REGISTER_PAGE_UNLOADED})).toEqual({});
    });

    it('ASYNC_START', () => {
        const actionWithLoginSubtype = {
            type: ASYNC_START,
            subtype: LOGIN,
        };
        const actionWithRegisterSubtype = {
            type: ASYNC_START,
            subtype: REGISTER,
        };
        const actionWithAnySubtype = {
            type: ASYNC_START,
            subtype: REGISTER_PAGE_UNLOADED,
        };

        expect(auth(initialState, actionWithLoginSubtype)).toEqual({...initialState, inProgress: true});
        expect(auth(initialState, actionWithRegisterSubtype)).toEqual({...initialState, inProgress: true});
        expect(auth(initialState, actionWithAnySubtype)).toEqual(initialState);
    });

    it('UPDATE_FIELD_AUTH', () => {
        const actionChangeEmail = {
            type: UPDATE_FIELD_AUTH,
            key: 'email',
            value: 'xoxach@mail.'
        };
        const actionChangePassword = {
            type: UPDATE_FIELD_AUTH,
            key: 'password',
            value: '111'
        };

        expect(auth(initialState, actionChangeEmail)).toEqual({...initialState, email: actionChangeEmail.value});
        expect(auth(initialState, actionChangePassword)).toEqual({...initialState, password: actionChangePassword.value});
    });
});
