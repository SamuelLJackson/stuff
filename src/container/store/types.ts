export const UPDATE_SELECTED_MAIN_VIEW = 'UPDATE_SELECTED_MAIN_VIEW'
export const SET_ERROR = 'SET_ERROR'
export const RESET_APP = 'RESET_APP'
export const RESET = 'RESET_CONTAINER'
export const SET_SHOW_CREATE_BREADCRUMB = 'SET_SHOW_CREATE_BREADCRUMB'
export const SET_HAS_CREATE_PERMISSION = 'SET_HAS_CREATE_PERMISSION'
export const SET_HAS_RUN_PERMISSION = 'SET_HAS_RUN_PERMISSION'
export const SET_HAS_EDIT_SOMEONE_ELSES_ORDER_SERIES_PERMISSION = 'SET_HAS_EDIT_SOMEONE_ELSES_ORDER_SERIES_PERMISSION'
export const SET_HAS_EDIT_ORDER_SERIES_PERMISSION = 'SET_HAS_EDIT_THIS_ORDER_SERIES_PERMISSION'

export interface Error {
  message: string
  stack: string
  innerMessage: string
  backTo: string
}

export const BaseError: Error = {
  message: '',
  stack: '',
  innerMessage: '',
  backTo: 'Home'
}

export interface ContainerState {
  error: Error
  hasCreatePermission: boolean
  hasRunPermission: boolean
  hasEditSomeoneElsesOrderSeriesPermission: boolean
  hasEditOrderSeriesPermission: boolean
}

export interface UpdateSelectedView {
  type: typeof UPDATE_SELECTED_MAIN_VIEW
  payload: string
}

export interface SetShowCreateBreadcrumb {
  type: typeof SET_SHOW_CREATE_BREADCRUMB
  payload: boolean
}

export interface SetError {
  type: typeof SET_ERROR
  payload: Error
}

export interface SetHasCreatePermission {
  type: typeof SET_HAS_CREATE_PERMISSION
  payload: boolean
}

export interface SetHasRunPermission {
  type: typeof SET_HAS_RUN_PERMISSION
  payload: boolean
}

export interface SetHasEditSomeoneElsesOrderSeriesPermission {
  type: typeof SET_HAS_EDIT_SOMEONE_ELSES_ORDER_SERIES_PERMISSION
  payload: boolean
}

export interface SetHasEditOrderSeriesPermission {
  type: typeof SET_HAS_EDIT_ORDER_SERIES_PERMISSION
  payload: boolean
}

export interface Reset {
  type: typeof RESET
  payload: any
}

export type ContainerActionTypes =
  | UpdateSelectedView
  | SetError
  | SetHasCreatePermission
  | SetHasRunPermission
  | SetHasEditSomeoneElsesOrderSeriesPermission
  | SetHasEditOrderSeriesPermission
  | Reset
