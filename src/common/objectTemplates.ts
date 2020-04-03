import { OrderSeries as OrderSeriesType, OriginLocation, Store, RequestType } from './types'
import { CreateState as CreateStateType, ReplenishmentType } from '../pages/create/store/types'
import { HomeState as HomeStateType } from '../pages/home/store/types'
import { GridState as HomeGridStateType } from '../pages/home/components/grid/store/types'
import { OptionBarState as HomeOptionBarStateType } from '../pages/home/components/option_bar/store/types'
import { Error as ErrorType } from '../container/store/types'
import { ReviewAndRunState as ReviewAndRunStateType } from '../pages/review_and_run/store/types'
import { OrderSeriesDetail as OrderSeriesDetailType } from '../pages/review_and_run/components/grid/store/types'

const OrderSeries: OrderSeriesType = {
    orderSeriesKey: 1,
    name: 'hello moto',
    replenishmentTypeKey: 1,
    isForecast: true,
    statusKey: 1,
    createDate: 'never',
    createUserKey: 1,
    lastModifyDate: 'oopsie daisie',
    lastModifyUserKey: 1,
    user: { userKey: 1, userName: 'steven'},
    replenishmentType: {replenishmentTypeKey: 1, name: 'new'},
    inReview: true,
}

const CreateState: CreateStateType = {
  name: '',
  selectedReplenishmentType: null,
  replenishmentTypes: [],
  originLocations: [],
  availableOriginLocations: [],
  selectedOriginLocations: {},
  stores: [],
  states: {},
  selectedStores: {},
  selectedDate: '',
  requestTypes: [],
  selectedRequestTypes: {},
  skipPresentationLevels: false,
  shipUsingOnlyLowStockQuantities: false,
  disableOrdering: true,
  collapseState: {},
  collapseAll: true,
  filteredStates: [],
  showNoResult: false,
}

const HomeGridState: HomeGridStateType  = {
  orderSeriesResults: [OrderSeries],
  showTable: true,
}

const HomeOptionBarState: HomeOptionBarStateType = {
  orderSeries: [OrderSeries],
  selectedOrderSeries: {value: 1, label: '1'},
  isLoading: false,
}

const HomeState: HomeStateType = {
  optionBar: HomeOptionBarState,
  grid: HomeGridState,
}

interface CreateLookupsType {
  replenishmentTypes: ReplenishmentType[]
  originLocations: OriginLocation[]
  stores: Store[]
  requestTypes: RequestType[]
}

const replenishmentType: ReplenishmentType = {
  replenishmentTypeKey: 3, 
  name: 'hello',
}

const originLocation: OriginLocation = {
  locationKey: 3,
  name: '3',
}

const OrderSeriesDetail: OrderSeriesDetailType = {
  orderSeriesDetailKey: 1,
  orderSeriesKey: 1,
  tradingPartnerName: 'name',
  outToDate: '0001-01-01T:00:00:00',
  requestTypes: '1',
  safetyStockPercent: 1,
  shipUsingOnlyLowStockQuantities: false,
  skipPresentationLevels: false,
  storeKey: 101,
  targetDeliveryDate: '0001-01-01T:00:00:00',
  tradingPartnerLocationKey: 1,
  truckRouteKey: 1,
  weight: 1,
}

const defaultReviewAndRunGridState: any = {
  data: [OrderSeriesDetail],
  isLoading: false,
  loadingType: 0,
  filtered: [],
  selectedRows: {},
  showResultModal: false,
  filteredRows: [],

  storeObjects: {},
  selectedStores: {},
  originLocations: [],
  truckRoutes: [],
  stores: [],

  requestTypes: [],
  isDirty: false,
  deletedDetailIds: [],
  orderSeriesKey: 0,

  showError: [],
  selectedOriginLocations: {},
}

const defaultReviewAndRunModalsState: any = {
  selectedDate: '',

  showAddStoreModal: false,
  selectedAdditionalStores: [],
  showResultModal: false,
  showModal: false,
  runResultType: 1,

  runTimer: null,
  showOrderCreationWarningModal: false,
}

const ReviewAndRunState: ReviewAndRunStateType = {
  buttonArray: { isForecast: true, isLoading: false },
  titleBar: { name: 'test', statusKey: 1},
  grid: defaultReviewAndRunGridState,
  modals: defaultReviewAndRunModalsState,
}

const store: Store = {
  outToDates: 3,
  safetyStockPercent: 3,
  safetyStockPercentHigh: 3,
  safetyStockPercentNormal: 3,
  stateKey: 3,
  stateName: '3',
  storeKey: 3,
  storeName: '3',
  stateAbbreviation: '3',
  targetDeliveryDays: 3,
  truckRoute: '3',
  truckRouteKey: 3,
  weight: 3,
}

const requestType: RequestType = {
  key: 3,
  name: '3',
  abbreviation: '3',
}

const CreateLookups: CreateLookupsType = {
  replenishmentTypes: [replenishmentType],
  originLocations: [originLocation],
  stores: [store],
  requestTypes: [requestType],
}

const Error: ErrorType = {
    stack: 'Failed to Fetch',
    message: 'TypeError: Failed To Fetch',
    innerMessage: '',
    backTo: 'Home',
}

export default {
    OrderSeries,
    CreateState,
    CreateLookups,
    replenishmentType,
    originLocation,
    store,
    requestType,
    HomeState,
    HomeGridState,
    HomeOptionBarState,
    Error,
    ReviewAndRunState,
    OrderSeriesDetail,
}
