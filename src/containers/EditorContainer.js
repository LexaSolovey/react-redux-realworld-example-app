import React, { Component } from 'react';
import { connect } from 'react-redux';

import agent from '../agent';
import {
    ADD_TAG,
    EDITOR_PAGE_LOADED,
    REMOVE_TAG,
    ARTICLE_SUBMITTED,
    EDITOR_PAGE_UNLOADED,
    UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

import ListErrors from '../components/ListErrors';
import Editor from '../components/Editor';

const mapStateToProps = ({editor}) => ({editor});

const mapDispatchToProps = dispatch => ({
    onAddTag: () => dispatch({ type: ADD_TAG }),
    onLoad: payload => dispatch({ type: EDITOR_PAGE_LOADED, payload }),
    onRemoveTag: tag => dispatch({ type: REMOVE_TAG, tag }),
    onSubmit: payload => dispatch({ type: ARTICLE_SUBMITTED, payload }),
    onUnload: () => dispatch({ type: EDITOR_PAGE_UNLOADED }),
    onUpdateField: (key, value) => dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

class EditorContainer extends Component {
    submitForm = (event) => {
        event.preventDefault();
        const {title, description, body, tagList, articleSlug} = this.props;
        const article = { title, description, body, tagList};
        const slug = { slug: articleSlug };
        const promise = articleSlug 
            ? agent.Articles.update(Object.assign(article, slug)) 
            : agent.Articles.create(article);

        this.props.onSubmit(promise);
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.slug !== nextProps.match.params.slug) {
            if (nextProps.match.params.slug) {
                this.props.onUnload();
                return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
            }
            this.props.onLoad(null);
        }
    }

    componentWillMount() {
        if (this.props.match.params.slug) {
            return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
        }
        this.props.onLoad(null);
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        return (
            <div className="editor-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">
                            <ListErrors errors={this.props.errors}></ListErrors>
                            <Editor
                                {...this.props.editor}
                                onRemoveTag={this.props.onRemoveTag}
                                onAddTag={this.props.onAddTag}
                                onUpdateField={this.props.onUpdateField}
                                submitForm={this.submitForm}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
