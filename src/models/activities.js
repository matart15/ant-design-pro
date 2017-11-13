// @flow
import { queryActivities } from '../services/api'

export default {
  namespace: 'activities',

  state: {
    list: [],
    loading: true
  },

  effects: {
    *fetchList(
      _: any,
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeLoading',
        payload: true
      })
      const response = yield call(queryActivities)
      yield put({
        type: 'saveList',
        payload: Array.isArray(response) ? response : []
      })
      yield put({
        type: 'changeLoading',
        payload: false
      })
    }
  },

  reducers: {
    saveList(state: Object, action: Object) {
      return {
        ...state,
        list: action.payload
      }
    },
    changeLoading(state: Object, action: Object) {
      return {
        ...state,
        loading: action.payload
      }
    }
  }
}
