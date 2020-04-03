import React from 'react'
import { Row } from '../store/types'

export default (row: Row) => (
    <div>
      <span title="Target Delivery Date Does not match">
        <div
          style={{
            overflow: 'visible',
            height: '55px',
            width: '140px',
            marginBottom: '-15px',
            marginTop: '-15px',
            marginLeft: '-15px',
          }}
        >
          <div
            style={{
              paddingLeft: '12px',
              paddingTop: '10px',
            }}
          >
            {row.original.targetDeliveryDate}
          </div>
        </div>
      </span>
    </div>
)
