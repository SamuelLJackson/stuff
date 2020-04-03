import saveBlobAs from './saveBlobAs'
import { Error } from '../container/store/types'

const handleJSON = (response: any) => {

  return new Promise((resolve, reject) => {

    if (response.status !== 200) {
      const error: Error = {
        stack: response.statusText,
        message: response.status,
        innerMessage: response.url,
        backTo: '',
      }
      reject(error)
    } else {
      resolve(response.json().then((json: any) => json))
    }
  })
}

const handleExcel = (response: any, fileName: string) => {
  const partA = 'application/vnd'
  const partB = '.openxmlformats-officedocument'
  const partC = '.spreadsheetml.sheet'
  const excelFileType = partA + partB + partC

  if (response.ok) {
    response.arrayBuffer().then((buffer: any) => {
      const excelFile = new Blob([buffer], { type: excelFileType })
      saveBlobAs(excelFile, `${fileName}.xlsx`)
    })

    return Promise.resolve()
  } else {
    return response.json().then((json: any) => json)
  }
}

export default {
  handleJSON,
  handleExcel,
}
