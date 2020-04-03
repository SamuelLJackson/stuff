const handleHorizontalOverflow = () => {
  const tbodies = document.getElementsByClassName('rt-tbody')
  const theaders = document.getElementsByClassName('rt-thead')
  for (let i = 0; i < tbodies.length; ++i) {
    const tbody = tbodies[i] as HTMLElement
    tbody.style.width = `${window.innerWidth - 40}px`

    tbody.onscroll = () => {
      for (let j = 0; j < theaders.length; ++j) {
        theaders[j].scrollLeft = tbodies[i].scrollLeft
      }
    }
  }
}

const alignTableWithFilterScroll = (index: number) => {
  const filterBar = document.getElementsByClassName('-filters')[
    index
  ] as HTMLElement
  const headerGroupsBar = document.getElementsByClassName('-headerGroups')[
    index
  ]
  const headerBar = document.getElementsByClassName('-header')[index]
  const tableBody = document.getElementsByClassName('rt-tbody')[
    index
  ] as HTMLElement

  filterBar.onscroll = () => {
    if (headerGroupsBar) {
      headerGroupsBar.scrollLeft = filterBar.scrollLeft
    }
    headerBar.scrollLeft = filterBar.scrollLeft
    tableBody.scrollLeft = filterBar.scrollLeft
  }

  tableBody.onscroll = () => {
    if (headerGroupsBar) {
      headerGroupsBar.scrollLeft = tableBody.scrollLeft
    }
    headerBar.scrollLeft = tableBody.scrollLeft
    filterBar.scrollLeft = tableBody.scrollLeft
  }
}

const resizeGridOnZoom = () => {  
  window.addEventListener('resize', () => {
    const pageContainer: any = document.getElementsByClassName('page-container')[0]
    const reactTables: any = document.getElementsByClassName('ReactTable')
    if (reactTables.length === 1) {
      reactTables[0].style.height = `${window.innerHeight - 224}px`
    }
    pageContainer.style.height = `${window.innerHeight - 80}px`
  });
}

export default {
  handleHorizontalOverflow,
  alignTableWithFilterScroll,
  resizeGridOnZoom,
}
