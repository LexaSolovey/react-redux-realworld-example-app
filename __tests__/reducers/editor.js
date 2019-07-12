import editor from '../../src/reducers/editor';
import {
    EDITOR_PAGE_LOADED,
    EDITOR_PAGE_UNLOADED,
    ARTICLE_SUBMITTED,
    ASYNC_START,
    ADD_TAG,
    REMOVE_TAG,
    UPDATE_FIELD_EDITOR
} from '../../src/constants/actionTypes';
import { articles } from '../data/articleList';


describe('common reducer', () => {
    const newArticle = {
        articleSlug: '',
        title: '',
        description: '',
        body: '',
        tagInput: '',
        tagList: []
    };

    it('should return the initial state, EDITOR_PAGE_UNLOADED', () => {
        expect(editor(undefined, {})).toEqual({})
        expect(editor(undefined, {type: EDITOR_PAGE_UNLOADED})).toEqual({})
    });

    it('EDITOR_PAGE_LOADED', () => {
        const actionNewArticle = {
            type: EDITOR_PAGE_LOADED,
            payload: null,
        };
        const actionEditArticle = {
            type: EDITOR_PAGE_LOADED,
            payload: {article: articles[0]},
        };
        const expectedValueForEditArticle = {
            articleSlug: articles[0].slug,
            title: articles[0].title,
            description: articles[0].description,
            body: articles[0].body,
            tagInput: '',
            tagList: articles[0].tagList
        };

        expect(editor({}, actionNewArticle)).toEqual(newArticle);
        expect(editor({}, actionEditArticle)).toEqual(expectedValueForEditArticle);
    });

    it('ARTICLE_SUBMITTED', () => {
        const actionError = {
            type: ARTICLE_SUBMITTED,
            payload: {errors: ['cannot POST https://conduit.productionready.io/api/users/dlogin (404)']},
            error: true
        };

        expect(editor({}, {type: ARTICLE_SUBMITTED})).toEqual({inProgress: null, errors: null});
        expect(editor({}, actionError)).toEqual({inProgress: null, errors: actionError.payload.errors});
    });

    it('ASYNC_START', () => {
        const actionWithSubmittedSubtype = {
            type: ASYNC_START,
            subtype: ARTICLE_SUBMITTED,
        };
        const actionWithAnySubtype = {
            type: ASYNC_START,
            subtype: EDITOR_PAGE_LOADED,
        };

        expect(editor({}, actionWithSubmittedSubtype)).toEqual({inProgress: true});
        expect(editor({}, actionWithAnySubtype)).toEqual({});
    });

    it('ADD_TAG', () => {
        const newArticleWithSpecifiedTagInput = {
            ...newArticle,
            tagInput: 'God'
        };
        const articleWithSpecifiedTagInput2 = {
            ...newArticle,
            tagList: ['God'],
            tagInput: 'save'
        };
        const articleWithSpecifiedTagInput3 = {
            ...newArticle,
            tagList: ['God', 'save'],
            tagInput: 'the Queen'
        };
        const expectedValue1 = {
            ...newArticle,
            tagList: ['God']
        };
        const expectedValue2 = {
            ...newArticle,
            tagList: ['God', 'save']
        };
        const expectedValue3 = {
            ...newArticle,
            tagList: ['God', 'save', 'the Queen']
        };
        const action = {type: ADD_TAG};

        expect(editor(newArticleWithSpecifiedTagInput, action)).toEqual(expectedValue1);
        expect(editor(articleWithSpecifiedTagInput2, action)).toEqual(expectedValue2);
        expect(editor(articleWithSpecifiedTagInput3, action)).toEqual(expectedValue3);
    });

    it('REMOVE_TAG', () => {
        const articleWithSpecifiedTagList = {
            ...newArticle,
            tagList: ['God', 'save'],
        };
        const expectedValue1 = {
            ...newArticle,
            tagList: ['save']
        };
        const expectedValue2 = {
            ...newArticle,
            tagList: []
        };

        expect(editor(articleWithSpecifiedTagList, {type: REMOVE_TAG, tag: 'God'})).toEqual(expectedValue1);
        expect(editor(expectedValue1, {type: REMOVE_TAG, tag: 'save'})).toEqual(expectedValue2);
        expect(editor(expectedValue2, {type: REMOVE_TAG, tag: 'the Queen'})).toEqual(expectedValue2);
    });

    it('UPDATE_FIELD_EDITOR', () => {
        const expectedValue1 = {
            ...newArticle,
            title: 'testTitle'
        };
        const expectedValue2 = {
            ...newArticle,
            title: 'testTitle',
            description: "testDesc"
        };
        const expectedValue3 = {
            ...newArticle,
            title: 'testTitle',
            description: 'testDesc',
            body: 'testBody'
        };
        const expectedValue4 = {
            ...newArticle,
            title: 'testTitle',
            description: 'testDesc',
            body: 'testBody',
            tagInput: 'testTag'
        };
        const actionCreator = (key, value) => ({
            type: UPDATE_FIELD_EDITOR,
            key,
            value
        });

        expect(editor(newArticle, actionCreator('title', 'testTitle'))).toEqual(expectedValue1);
        expect(editor(expectedValue1, actionCreator('description', 'testDesc'))).toEqual(expectedValue2);
        expect(editor(expectedValue2, actionCreator('body', 'testBody'))).toEqual(expectedValue3);
        expect(editor(expectedValue3, actionCreator('tagInput', 'testTag'))).toEqual(expectedValue4);
    });
});