import React, { useEffect } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { BaseState } from '../../common/types'
import ACTIONS from './store/actions'
import ResultsModal from './ResultsModal'
import Loading from './Loading'
import PageContainer from '../../common/PageContainer'

export default () => {
    const dispatch = useDispatch()

    useEffect(() => {    
      dispatch(ACTIONS.checkUploadFilePermission())      
      const input: any = document.getElementById("excel-file")
      if (input !== null) {
          input.onchange = () => {
            const input: any = document.getElementById("excel-file")           
            
            dispatch(ACTIONS.setIsFileSelected(input.files.length === 1))  
          }
      }
    })
    const isFileSelected = useSelector((state: BaseState) => state.upload.isFileSelected)
    const isLoading = useSelector((state: BaseState) => state.upload.isLoading)
    const hasUploadFilePermission = useSelector((state: BaseState) => state.upload.hasUploadFilePermission)
    const uploadTitle = hasUploadFilePermission ? (isFileSelected ? 'Upload file' : 'You must choose a file to upload.') : 'You do not have permission to upload files'

    return (
        <PageContainer active={'Update Shipping Route'} isBase={false}>
            <div className="section-container">
                <input 
                    id="excel-file" 
                    type="file" 
                    style={{
                        border: '1px solid black',
                        borderRadius: 5,
                        padding: 3,
                    }}/>
                <div title={uploadTitle}>
                    <button 
                        className="btn btn-warning"
                        disabled={!(hasUploadFilePermission && isFileSelected)}
                        style={{marginLeft: 8}}
                        onClick={() => dispatch(ACTIONS.postUpload())}
                    >
                        Upload
                    </button>
                </div>
                <button
                    className="btn btn-warning"
                    style={{marginLeft: 8}}
                    onClick={() => dispatch(ACTIONS.requestTemplate())}
                >
                    Download Template
                </button>          
            </div>
            {
                isLoading
                &&
                <div style={{
                    opacity: 1,
                    zIndex: 5,
                    display: 'block',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    background: 'rgba(255,255,255,0.8)',
                    transition: 'all .3s ease',
                }}></div>
            }
            <ResultsModal />
            <Loading />
        </PageContainer>
    )
}
