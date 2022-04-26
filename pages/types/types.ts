export interface CreateReservationOrderParams {
  targetKimpRate: number | null
  quantity: number | null
  isBuy: boolean | null
}

export interface UpdateReservationOrderParams {
  id: number
  targetKimpRate: number
  unCompletedQuantity: number
}

export interface DeleteReservationOrderParams {
  id: number
}

export interface UserAuthenticateParams {
  email: string
  password: string
  doubleCheckAuthenticate: string
}

export interface UserAuthenticateResult {}

export interface getReservationOrderListResult {
  id: number
  coinName: string
  unCompletedQuantity: number
  completedQuantity: number
  position: boolean
  targetKimpRate: number
  createdAt: number
  endAt?: number
}

export interface CurrentCoinPricesResult {
  kimpPer: number
  upbitPrice: number
  binancePrice: number
  exchangeRatePrice: number
}

export interface UserAccountResults {
  upbitBuyAccountKRW: number
  upbitSellAccountBTC: number
  binanceBuyAccountUSDT: number
  binanceSellAccountBTC: number
  binanceLeverage: number
}
