import { connect } from 'react-redux'
import ACTIONS from './store/actions'
import Container from './Container'
import { BaseState } from '../../../../common/types'
import { Filter } from 'react-table'
import { Row } from './store/types'

const mapStateToProps = (state: BaseState) => ({
  data: state.reviewAndRun.grid.data,
  isLoading: state.reviewAndRun.grid.isLoading,
  filtered: state.reviewAndRun.grid.filtered,
  showError: state.reviewAndRun.grid.showError,
})

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch(ACTIONS.reset()),
  setFilteredRows: (rows: Row[], filters: Filter[]) => dispatch(ACTIONS.setFilteredRows(rows, filters)),
  checkSelectedBoxes: () => dispatch(ACTIONS.checkSelectedBoxes()),
  clearFilters: () => dispatch(ACTIONS.clearFilters()),
  selectAllRows: () => dispatch(ACTIONS.selectAllRows()),
  unselectAllRows: () => dispatch(ACTIONS.unselectAllRows()),
  setIsDirty: (isDirty: boolean) => dispatch(ACTIONS.setIsDirty(isDirty)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
