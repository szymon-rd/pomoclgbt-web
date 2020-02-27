import React, { Dispatch } from 'react';
import MaterialPagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';
import { AppState } from '../../model/types';

interface PaginationProps {
  pages: number,
  currentPage: number,
  changePage: (page: number) => void
}

const Component = ({pages, currentPage, changePage}: PaginationProps) => {
  const onPaginationEvent = (ev: any, page: number) => changePage(page)
  return (
    <div className="pagination">
      <MaterialPagination count={pages} page={currentPage} onChange={onPaginationEvent} size="large" />
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({

})

const mapDispatchToProps = (dispatch: any) => ({

})

export const Pagination = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
