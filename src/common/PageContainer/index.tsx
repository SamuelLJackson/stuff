import React from 'react'
import { useDispatch } from 'react-redux'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import CONTAINER_ACTIONS from '../../container/store/actions'
import { constants } from '..'
import { PageContainerProps } from './types'

export default (props: PageContainerProps) => {
  const dispatch = useDispatch()

  let previousCrumbs = []
  let activeMargin = { marginLeft: 16 }

  if (props.previous !== undefined && typeof props.previous !== 'undefined') {
    activeMargin = {marginLeft: 0}
    for (let i = 0; i<props.previous.length; ++i) {
      const routeName = '/' + props.previous[i].charAt(0).toLowerCase() + props.previous[i].substring(1).replace(/ /g, '')
      previousCrumbs.push(
        <BreadcrumbItem
          className="clickable-blue-text"
          key={`breadcrumb - ${i}`}
          style={{ marginLeft: 16 }}
          tabIndex={i + 1}
          onClick={() => {
            dispatch(CONTAINER_ACTIONS.updateSelectedView(routeName))
          }}
          onKeyUp={event => {
            if (
              event.keyCode === constants.KeyCodes.SPACE_BAR ||
              event.keyCode === constants.KeyCodes.ENTER
            ) {
              dispatch(CONTAINER_ACTIONS.updateSelectedView(routeName))
            }
          }}
        >
          {props.previous[i]}
        </BreadcrumbItem>
      )
    }
  }

  return (
    <div
      className="flex-column-container page-container"
      style={{ height: window.innerHeight - 80 }}
    >
      <Breadcrumb>
        {previousCrumbs}
        <BreadcrumbItem style={activeMargin} active>{props.active}</BreadcrumbItem>
      </Breadcrumb>
      {props.children}
    </div>
  )
}
