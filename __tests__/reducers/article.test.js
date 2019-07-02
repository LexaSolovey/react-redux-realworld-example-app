import article from '../../src/reducers/article';
import articleListJson from '../data/articleList'; 
import {
    ARTICLE_PAGE_LOADED,
    ARTICLE_PAGE_UNLOADED,
    ADD_COMMENT,
    DELETE_COMMENT
} from '../../src/constants/actionTypes';

describe('article reducer', () => {
    const testArticle = articleListJson.articles[0];
    const firstComment = {
        author: {username: "xoxach", bio: null, image: "https://static.productionready.io/images/smiley-cyrus.jpg", following: false},
        body: "firstComment",
        createdAt: "2019-06-28T17:13:40.168Z",
        id: 41964,
        updatedAt: "2019-06-28T17:13:40.168Z",  
    };
    const secondComment = {
        author: {username: "xoxach", bio: null, image: "https://static.productionready.io/images/smiley-cyrus.jpg", following: false},
        body: "secondComment",
        createdAt: "2019-06-28T17:13:41.168Z",
        id: 41965,
        updatedAt: "2019-06-28T17:13:41.168Z",  
    };

    it('should return the initial state', () => {
        expect(article(undefined, {})).toEqual({})
    });

    it('ARTICLE_PAGE_LOADED', () => {
        const action = {
            type: ARTICLE_PAGE_LOADED,
            payload: [
                {article: testArticle},
                {comments: []}
            ]
        };
        expect(article({}, action)).toEqual({
            article: action.payload[0].article, comments: action.payload[1].comments
        });
    });

    it('ARTICLE_PAGE_UNLOADED', () => {
        expect(article({}, {type: ARTICLE_PAGE_UNLOADED})).toEqual({})
    });

    it('ADD_COMMENT in case of error', () => {
        const error = {
            error: "Bad Request",
            status: "400"
        };
        const addComment = {
            type: ADD_COMMENT,
            error: true,
            payload: error
        }
        expect(article({article: testArticle}, addComment)).toEqual({
            article: testArticle,
            commentErrors: error,
            comments: null
        });
    });

    it('ADD_COMMENT in case of seccess', () => {
        const createCommentActionCreator = (comment) => ({
            type: ADD_COMMENT,
            payload: {comment}
        });
        const expectedValueInFirstCase = {
            commentErrors: null,
            comments: [firstComment]
        };

        expect(article({}, createCommentActionCreator(firstComment))).toEqual(expectedValueInFirstCase);

        expect(article(expectedValueInFirstCase, createCommentActionCreator(secondComment))).toEqual({
            commentErrors: null,
            comments: [firstComment, secondComment]
        });
    });

    it('DELETE_COMMENT', () => {
        const deleteCommentActionCreator = (commentId) => ({
            type: DELETE_COMMENT,
            commentId
        });
        const initialState = {
            article: testArticle,
            comments: [firstComment, secondComment]
        };
        const expectedValueInFirstCase = {
            article: testArticle,
            comments: [secondComment]
        };
        const expectedValueInSecondCase = {
            article: testArticle,
            comments: []
        };

        expect(article(initialState, deleteCommentActionCreator(firstComment.id))).toEqual(expectedValueInFirstCase);
        expect(article(expectedValueInFirstCase, deleteCommentActionCreator(secondComment.id))).toEqual({article: testArticle, comments: []});
        expect(article(expectedValueInSecondCase, deleteCommentActionCreator(secondComment.id))).toEqual({article: testArticle, comments: []});
    });
});
