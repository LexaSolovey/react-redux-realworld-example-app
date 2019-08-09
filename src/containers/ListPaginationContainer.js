import React, { Component } from 'react'
import agent from '../agent';
import { connect } from 'react-redux';

import { SET_PAGE } from '../constants/actionTypes';

import ListPagination from '../components/ListPagination';

export const mapDispatchToProps = dispatch => ({
    onSetPage: (page, payload) =>
      dispatch({ type: SET_PAGE, page, payload })
});

const mapStateToProps = ({ articleList }) => ({...articleList});

export class ListPaginationContainer extends Component {
    setPage = (page) => {
        if (this.props.pager) {
            this.props.onSetPage(page, this.props.pager(page));
        } else {
            this.props.onSetPage(page, agent.Articles.all(page))
        }
    };

    render() {
        return (
            <ListPagination
                pager={this.props.pager}
                articlesCount={this.props.articlesCount}
                currentPage={this.props.currentPage}
                setPage={this.setPage}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPaginationContainer);
