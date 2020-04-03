const triggerUnselectAll = () => {
    const rows: any = document.getElementsByClassName('rt-tr')
    for (let i=2; i< rows.length; ++i) {
        if (rows[i].classList.contains('-padRow') || rows[i].classList.contains('cursor-pointer')) {
            break
        }
        showRowAsDisabled(rows[i].getAttribute('id'))
    }
}

const showSelect = (rowId: string) => {
    const row: any = document.getElementById(rowId)

    for (let i=1; i<row.childNodes.length; ++i) {
        row.childNodes[i].style.fontWeight = 'bold'
    }
    row.childNodes[0].childNodes[0].childNodes[0].checked = true

    row.childNodes[3].removeEventListener('click', preventChildActions, true)
    row.childNodes[3].childNodes[0].childNodes[0].disabled = false
    row.childNodes[3].childNodes[0].childNodes[0].setAttribute('class', 'review-grid-datepicker selected-targetDeliveryDate')

    row.childNodes[4].removeEventListener('click', preventChildActions, true)
    row.childNodes[4].childNodes[0].childNodes[0].disabled = false
    row.childNodes[4].childNodes[0].childNodes[0].setAttribute('class', 'review-grid-datepicker selected-outToDate')

    row.childNodes[6].childNodes[0].disabled = false
    row.childNodes[6].childNodes[0].style.backgroundColor = 'white'
    row.childNodes[6].childNodes[0].setAttribute('class', 'review-grid-select selected-skipPresentationLevels')

    row.childNodes[7].childNodes[0].disabled = false
    row.childNodes[7].childNodes[0].style.backgroundColor = 'white'
    row.childNodes[7].childNodes[0].setAttribute('class', 'review-grid-select selected-shipUsingOnlyLowStockQuantities')

    row.childNodes[8].childNodes[0].disabled = false
    row.childNodes[8].childNodes[0].style.backgroundColor = 'white'
    row.childNodes[8].childNodes[0].setAttribute('class', 'review-grid-select selected-truckRouteKey') 

    row.childNodes[9].removeEventListener('click', preventChildActions, true)
    row.childNodes[9].childNodes[0].setAttribute('class', 'multi-select-container selected-requestTypes')
    row.childNodes[9].childNodes[0].style.backgroundColor = 'white'
    row.childNodes[9].childNodes[0].childNodes[0].childNodes[1].style.display = 'block'
    row.childNodes[9].childNodes[0].childNodes[0].childNodes[2].style.display = 'block'
    for(let i=0; i<row.childNodes[9].childNodes[0].childNodes[0].childNodes[0].childNodes.length; ++i) {
        row.childNodes[9].childNodes[0].childNodes[0].childNodes[0].childNodes[i].style.backgroundColor = 'lightgray'
        row.childNodes[9].childNodes[0].childNodes[0].childNodes[0].childNodes[i].style.fontWeight = 'bold'        
        row.childNodes[9].childNodes[0].childNodes[0].childNodes[0].childNodes[i].childNodes[1].style.display = 'block'        
    }
}

const showRowAsDisabled = (rowId: string) => {
    const row: any = document.getElementById(rowId)

    for (let i=1; i<row.childNodes.length; ++i) {
        row.childNodes[i].style.fontWeight = 'normal'
    }
    if(row.childNodes[0].childNodes[0].childNodes[0] != null)
      row.childNodes[0].childNodes[0].childNodes[0].checked = false

    row.childNodes[3].addEventListener('click', preventChildActions, true)
    row.childNodes[3].childNodes[0].childNodes[0].disabled = true
    row.childNodes[3].childNodes[0].childNodes[0].setAttribute('class', 'review-grid-datepicker')

    row.childNodes[4].addEventListener('click', preventChildActions, true)
    row.childNodes[4].childNodes[0].childNodes[0].disabled = true
    row.childNodes[4].childNodes[0].childNodes[0].setAttribute('class', 'review-grid-datepicker')

    row.childNodes[6].childNodes[0].disabled = true
    row.childNodes[6].childNodes[0].style.backgroundColor = 'lightgray'
    row.childNodes[6].childNodes[0].setAttribute('class', 'review-grid-select')

    row.childNodes[7].childNodes[0].disabled = true
    row.childNodes[7].childNodes[0].style.backgroundColor = 'lightgray'
    row.childNodes[7].childNodes[0].setAttribute('class', 'review-grid-select')

    row.childNodes[8].childNodes[0].disabled = true
    row.childNodes[8].childNodes[0].style.backgroundColor = 'lightgray'
    row.childNodes[8].childNodes[0].setAttribute('class', 'review-grid-select')

    row.childNodes[9].addEventListener('click', preventChildActions, true)
    row.childNodes[9].childNodes[0].setAttribute('class', 'multi-select-container')
    row.childNodes[9].childNodes[0].style.backgroundColor = 'lightgray'
    row.childNodes[9].childNodes[0].childNodes[0].childNodes[1].style.display = 'none'
    row.childNodes[9].childNodes[0].childNodes[0].childNodes[2].style.display = 'none'
    for(let i=0; i<row.childNodes[9].childNodes[0].childNodes[0].childNodes[0].childNodes.length; ++i) {
        row.childNodes[9].childNodes[0].childNodes[0].childNodes[0].childNodes[i].style.backgroundColor = 'gray'
        row.childNodes[9].childNodes[0].childNodes[0].childNodes[0].childNodes[i].style.fontWeight = 'inherit'        
        row.childNodes[9].childNodes[0].childNodes[0].childNodes[0].childNodes[i].childNodes[1].style.display = 'none'
    }
}

const preventChildActions = (event: any) => event.stopPropagation()

export default {
    triggerUnselectAll,
    showRowAsDisabled,
    showSelect,
}
