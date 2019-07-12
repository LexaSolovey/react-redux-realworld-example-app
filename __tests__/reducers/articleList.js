import articleList from '../../src/reducers/articleList';
import {
    ARTICLE_FAVORITED,
    ARTICLE_UNFAVORITED,
    SET_PAGE,
    APPLY_TAG_FILTER,
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    CHANGE_TAB,
    PROFILE_PAGE_LOADED,
    PROFILE_PAGE_UNLOADED,
    PROFILE_FAVORITES_PAGE_LOADED,
    PROFILE_FAVORITES_PAGE_UNLOADED
} from '../../src/constants/actionTypes';
import articleListJson from '../data/articleList';

describe('article reducer', () => {
    let articles;

    beforeEach(() => {
        articles = articleListJson.articles;
    });

    it('should return the initial state', () => {
        expect(articleList(undefined, {})).toEqual({})
    });

    it('ARTICLE_FAVORITED', () => {
        const specifiedArticle = {
            article: {
                ...articles[0],
                favorited: true,
                favoritesCount: 1
            }
        };
        const action = {
            type: ARTICLE_FAVORITED,
            payload: specifiedArticle
        };
        const expectedArticles = articles;

        expectedArticles.splice(0, 1, specifiedArticle.article);
        const expectedValueAfterSpecifying = {
            articles: expectedArticles
        };

        expect(articleList({articles}, action)).toEqual(expectedValueAfterSpecifying);
    });

    it('ARTICLE_UNFAVORITED', () => {
        const specifiedArticle = {
            article: {
                ...articles[0],
                favorited: false,
                favoritesCount: 0
            }
        };
        const action = {
            type: ARTICLE_UNFAVORITED,
            payload: specifiedArticle
        };
        const expectedArticles = articles;

        expectedArticles.splice(0, 1, specifiedArticle.article);
        const expectedValueAfterSpecifying = {
            articles: expectedArticles
        };

        expect(articleList({articles}, action)).toEqual(expectedValueAfterSpecifying);
    });

    it('SET_PAGE', () => {
        const initialState = {
            articles,
            articlesCount: 500,
            currentPage: 1
        };
        const payload = {
            articles: articleList.articles2,
            articlesCount: 500
        };
        const action = {type: SET_PAGE, payload, page: 2};
        const expectedValue = {
            articles: articleList.articles2,
            articlesCount: 500,
            currentPage: 2
        };

        expect(articleList(initialState, action)).toEqual(expectedValue);
    });

    it('APPLY_TAG_FILTER', () => {
        const tag = 'dragons';
        const pager = () => {};
        const initialState = {
            articles,
            articlesCount: 500,
            currentPage: 2
        };
        const payload = {
            articles: articleList.articles2,
            articlesCount: 500
        };
        const action = {type: APPLY_TAG_FILTER, payload, tag, pager};
        const expectedValue = {
            pager,
            articles: articleList.articles2,
            articlesCount: 500,
            tag,
            tab: null,
            currentPage: 0
        };

        expect(articleList(initialState, action)).toEqual(expectedValue);
    });

    it('HOME_PAGE_LOADED', () => {
        const pager = () => {};
        const tags = ["butt", "dragons", "test", "training", "tags", "as", "coffee", "animation"];
        const tab = 'feed';
        const initialState = {
            articles,
            articlesCount: 500,
            currentPage: 2
        };
        const payload = [
            {tags},
            {articles: [], articlesCount: 0}
        ];
        const action = {type: HOME_PAGE_LOADED, payload, tab, pager};
        const expectedValue = {
            pager,
            articles: [],
            articlesCount: 0,
            tags,
            tab,
            currentPage: 0
        };

        expect(articleList(initialState, action)).toEqual(expectedValue);
    });

    it('HOME_PAGE_UNLOADED, PROFILE_PAGE_UNLOADED, PROFILE_FAVORITES_PAGE_UNLOADED', () => {
        const tags = ["butt", "dragons", "test", "training", "tags", "as", "coffee", "animation"];
        const tab = 'feed';
        const initialState = {
            articles,
            articlesCount: 500,
            currentPage: 2,
            tab,
            tags
        };
        const homeUnloadedAction = {type: HOME_PAGE_UNLOADED};
        const profileUnloadedAction = {type: PROFILE_PAGE_UNLOADED};
        const favoritesUnloadedAction = {type: PROFILE_FAVORITES_PAGE_UNLOADED};

        expect(articleList(initialState, homeUnloadedAction)).toEqual({});
        expect(articleList(initialState, profileUnloadedAction)).toEqual({});
        expect(articleList(initialState, favoritesUnloadedAction)).toEqual({});
    });

    it('CHANGE_TAB', () => {
        const pager = () => {};
        const initialState = {
            articles,
            articlesCount: 5,
            tab: 'feed'
        };
        const payload = {
            articles: articleList.articles2,
            articlesCount: 500,
        }
        const action = {type: CHANGE_TAB, payload, tab: 'all', pager};
        const revertAction = {type: CHANGE_TAB, payload: initialState, tab: 'feed', pager};
        const expectedValue = {
            pager,
            articles: articleList.articles2,
            articlesCount: 500,
            tag: null,
            tab: 'all',
            currentPage: 0
        };
        const revertedExpectedValue = {
            pager,
            articles,
            articlesCount: 5,
            tag: null,
            tab: 'feed',
            currentPage: 0
        };

        expect(articleList(initialState, action)).toEqual(expectedValue);
        expect(articleList(expectedValue, revertAction)).toEqual(revertedExpectedValue);
    });

    it('PROFILE_PAGE_LOADED, PROFILE_FAVORITES_PAGE_LOADED', () => {
        const pager = () => {};
        const initialState = {
            articles: [],
            articlesCount: 0,
            currentPage: 0
        };
        const profile = {
            bio: null,
            following: false,
            image: "https://static.productionready.io/images/smiley-cyrus.jpg",
            username: "xoxach",
        }

        const payload = [
            {profile},
            {articles: articleList.articles2, articlesCount: 5}
        ];
        const payloadForFavorites = [
            {profile},
            {articles, articlesCount: 5}
        ];
        const profilePageLoadedAction = {type: PROFILE_PAGE_LOADED, payload, pager};
        const profileFavoritesPageLoadedAction = {type: PROFILE_FAVORITES_PAGE_LOADED, payload: payloadForFavorites, pager};
        const expectedValue = {
            ...initialState,
            pager,
            articles: articleList.articles2,
            articlesCount: 5,
            currentPage: 0
        };
        const expectedValueFavorites = {
            pager,
            articles,
            articlesCount: 5,
            currentPage: 0
        };

        expect(articleList(initialState, profilePageLoadedAction)).toEqual(expectedValue);
        expect(articleList(expectedValue, profileFavoritesPageLoadedAction)).toEqual(expectedValueFavorites);
    });
})
