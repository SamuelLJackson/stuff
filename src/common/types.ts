import { ContainerState } from '../container/store/types'
import { HomeState } from '../pages/home/store/types'
import { CreateState } from '../pages/create/store/types'
import { ReviewAndRunState } from '../pages/review_and_run/store/types'
import { UploadState } from '../pages/upload/store/types'
  
export interface OrderSeries {
  orderSeriesKey: number
  name: string
  replenishmentTypeKey: number
  isForecast: boolean
  statusKey: number
  createDate: string
  createUserKey: number
  lastModifyDate: string
  lastModifyUserKey: number
  user: User
  replenishmentType: ReplenishmentType
  inReview: boolean
}

export interface ReplenishmentType {
  replenishmentTypeKey: number
  name: string
}
  
export interface User {
  userKey: number
  userName: string
}

export interface OriginLocation {
  locationKey: number
  name: string
}

export interface SelectOption {
  value: number
  label: string
}

export interface RequestType {
  key: number
  name: string
  abbreviation: string
}

export interface Filter {
  id: string
  value: any
}

export interface Store {
  outToDates: number
  safetyStockPercent: number
  safetyStockPercentHigh: number
  safetyStockPercentNormal: number
  stateKey: number
  stateName: string
  storeKey: number
  storeName: string
  stateAbbreviation: string
  targetDeliveryDays: number
  truckRoute: string
  truckRouteKey: number
  weight: number
}

export interface TruckRoute {
  truckRouteKey: number
  name: string
  maxWeight: number
}

export interface BaseState {
  container: ContainerState
  home: HomeState
  create: CreateState
  reviewAndRun: ReviewAndRunState
  upload: UploadState
}

export const RESET_APP = 'RESET_APP'

interface ResetApp {
  type: typeof RESET_APP
  payload: any
}

export type BaseActionTypes = ResetApp
