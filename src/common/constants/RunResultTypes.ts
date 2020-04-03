const RunResultTypes: { [typeName: string]: number } = {
    ORDER_CREATION: 1,
    FORECAST: 2,
    WARNING_ORDER_CREATION: 3,
    WARNING_FORECAST: 4,
    IN_REVIEW: 5,
    PROCESSING: 6,
    NO_ITEMS: 7,
}

export default RunResultTypes
