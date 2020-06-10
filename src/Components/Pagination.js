import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    pageSize: 10
}

class Pagination extends React.Component {
    state = { 
        pager: {}
    }

    componentWillMount(){
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage)
        }
    }

    setPage = (page) => {
        var { items, pageSize } = this.props
        var pager = this.state.pager

        pager = this.getPager(items.length, page, pageSize)

        let pageOfItems = items.slice(pager.startIndex, pager.endIndex +1)

        this.setState({ pager: pager })

        this.props.onChangePage(pageOfItems)
    }

    getPager = (totalItems, currentPage, pageSize) => {

        currentPage = currentPage || 1;

        pageSize = pageSize || 10;

        var totalPages = Math.ceil(totalItems / pageSize)

        var startPage, endPage;
        if (totalPages <= 3) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 3;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }
        }

        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }

        return (
            <ul className="pagination">
                <li className="list-item">
                    <button disabled={pager.currentPage === 1} onClick={() => this.setPage(1)}>First</button>
                </li>
                <li className="list-item">
                    <button disabled={pager.currentPage === 1} onClick={() => this.setPage(pager.currentPage - 1)}>Prev</button>
                </li>
                {pager.pages.map((page, index) => 
                    <li key={index} className="list-item">
                        <button numbers disabled={pager.currentPage === page} onClick={() => this.setPage(page)}>{page}</button>
                    </li>
                )}
                <li className="list-item">
                    <button disabled={pager.currentPage === pager.totalPages} onClick={() => this.setPage(pager.currentPage + 1)}>
                        Next
                    </button>
                </li>
                <li className="list-item">
                    <button disabled={pager.currentPage === pager.totalPages} onClick={() => this.setPage(pager.totalPages)}>Last</button>
                </li>
            </ul>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
