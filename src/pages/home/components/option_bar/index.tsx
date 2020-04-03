import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CONTAINER_ACTIONS from '../../../../container/store/actions'
import Select from 'react-select'
import { Spinner } from 'reactstrap'
import { SelectOption, OrderSeries } from '../../../../common/types'
import ACTIONS from './store/actions'
import { BaseState } from '../../../../common/types'

export default () => {
    const dispatch = useDispatch()

    const hasCreatePermission = useSelector((state: BaseState) => state.container.hasCreatePermission)

    const selectedOrderSeries = useSelector(
      (state: BaseState) => state.home.optionBar.selectedOrderSeries
    )

    let orderSeriesOptions: SelectOption[] = []

    const orderSeries = useSelector((state: BaseState) => state.home.optionBar.orderSeries)
    if (orderSeries !== undefined) {
        orderSeriesOptions = orderSeries.map((orderSeries: OrderSeries) => ({
        value: orderSeries.orderSeriesKey,
        label: String(orderSeries.orderSeriesKey),
        }))
    }
    
    const isLoading = useSelector((state: BaseState) => state.home.optionBar.isLoading)
    const createButtonTitle = hasCreatePermission ? 'navigate to form for creating order series' : 'You do not have permission to create order series'
    
    return (
        <div>
            <div className="section-container">
                <div title={createButtonTitle}>
                    <button
                        className="btn btn-primary create"
                        disabled={!hasCreatePermission}
                        onClick={() => dispatch(CONTAINER_ACTIONS.updateSelectedView('/create'))}
                    >
                        Create Order Series
                    </button>
                </div>
            </div>
            <div className="section-container">
                <Select
                    className="order-series-select"
                    placeholder="Enter Order Series Number"
                    options={orderSeriesOptions}
                    value={selectedOrderSeries}
                    isClearable={true}
                    onChange={(orderSeries: any) =>
                        dispatch(ACTIONS.setOrderSeries(orderSeries))
                    }
                />
                    {selectedOrderSeries === null && (
                <button
                    className="btn btn-warning search"
                    style={{ marginLeft: 10 }}
                    title='display all order series'
                    onClick={() => dispatch(ACTIONS.requestAllOrderSeries())}
                >
                    Show All
                </button>
                )}
                {selectedOrderSeries !== null && (
                <button
                    className="btn btn-warning search"
                    style={{ marginLeft: 10 }}
                    title='Display information on specific order series'
                    onClick={() =>
                    dispatch(
                        ACTIONS.requestOrderSeriesOutput(selectedOrderSeries.value)
                    )
                    }
                >
                    Search
                </button>
                )}
                {
                    isLoading
                    &&
                    <Spinner style={{marginLeft: '10px', marginTop: '3px'}} color="warning" />
                }
            </div>
        </div>
    )
}