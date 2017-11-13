// @flow
import { fakeChartData } from '../services/api'

export default {
  namespace: 'chart',

  state: {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: []
  },

  effects: {
    *fetch(
      _: any,
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      const response = yield call(fakeChartData)
      yield put({
        type: 'save',
        payload: response
      })
    },
    *fetchSalesData(
      _: any,
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      const response = yield call(fakeChartData)
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData
        }
      })
    }
  },

  reducers: {
    save(state: Object, { payload }: { payload: Object }) {
      return {
        ...state,
        ...payload
      }
    },
    setter(state: Object, { payload }: { payload: Object }) {
      return {
        ...state,
        ...payload
      }
    },
    clear() {
      return {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: []
      }
    }
  }
}
