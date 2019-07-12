import settings from '../../src/reducers/settings';
import { 
    SETTINGS_SAVED,
    SETTINGS_PAGE_UNLOADED,
    ASYNC_START
 } from '../../src/constants/actionTypes';


describe('settings reducer', () => {
    it('should return the initial state, SETTINGS_PAGE_UNLOADED', () => {
        expect(settings(undefined, {})).toEqual({})
        expect(settings({}, {type: SETTINGS_PAGE_UNLOADED})).toEqual({})
    });

    it('SETTINGS_SAVED', () => {
        const actionError = {
            type: SETTINGS_SAVED,
            payload: {errors: ['cannot POST https://conduit.productionready.io/api/users/dlogin (404)']},
            error: true
        };

        expect(settings({}, actionError)).toEqual({inProgress: false, errors: actionError.payload.errors});
        expect(settings({}, {type: SETTINGS_SAVED})).toEqual({inProgress: false, errors: null});
    });

    it('ASYNC_START', () => {
        expect(settings({}, {type: ASYNC_START})).toEqual({inProgress: true});
    });

});