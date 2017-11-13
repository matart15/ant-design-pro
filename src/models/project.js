// @flow
import { queryProjectNotice } from '../services/api'

export default {
  namespace: 'project',

  state: {
    notice: [],
    loading: true
  },

  effects: {
    *fetchNotice(
      _: any,
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeLoading',
        payload: true
      })
      const response = yield call(queryProjectNotice)
      yield put({
        type: 'saveNotice',
        payload: Array.isArray(response) ? response : []
      })
      yield put({
        type: 'changeLoading',
        payload: false
      })
    }
  },

  reducers: {
    saveNotice(state: Object, action: Object) {
      return {
        ...state,
        notice: action.payload
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
