export interface UploadState {
    isLoading: boolean
    showModal: boolean
    isFileSelected: boolean
    successCount: number
    failureCount: number
    rejectedRows: RejectedRow[]
    hasUploadFilePermission: boolean
}

interface RejectedRow {
    itemCode: string
    originlocation: string
    destinationLocation: string
    isPrimary: string
    errors: string
}

export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_SHOW_MODAL = 'SET_SHOW_MODAL'
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS'
export const SET_IS_FILE_SELECTED = 'SET_IS_FILE_SELECTED'
export const RESET_UPLOAD = 'RESET_UPLOAD'
export const SET_HAS_UPLOAD_FILE_PERMISSION = 'SET_HAS_UPLOAD_FILE_PERMISSION'

interface SetIsLoading {
    type: typeof SET_IS_LOADING
    payload: boolean
}

interface SetShowModal {
    type: typeof SET_SHOW_MODAL
    payload: boolean
}

interface SetResults {
    type: typeof RECEIVE_RESULTS
    payload: any
}

interface SetIsFileSelected {
    type: typeof SET_IS_FILE_SELECTED
    payload: boolean
}

interface ResetUpload {
    type: typeof RESET_UPLOAD
    payload: any
}

interface SetHasUploadFilePermission {
    type: typeof SET_HAS_UPLOAD_FILE_PERMISSION
    payload: boolean
  }

export type UploadActionTypes =
| SetIsLoading
| SetShowModal
| SetResults
| SetIsFileSelected
| ResetUpload
| SetHasUploadFilePermission
