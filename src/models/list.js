// @flow
import { queryFakeList } from '../services/api'

export default {
  namespace: 'list',

  state: {
    list: [],
    loading: false
  },

  effects: {
    *fetch(
      { payload }: { payload: Object },
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeLoading',
        payload: true
      })
      const response = yield call(queryFakeList, payload)
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : []
      })
      yield put({
        type: 'changeLoading',
        payload: false
      })
    }
  },

  reducers: {
    appendList(state: Object, action: Object) {
      return {
        ...state,
        list: state.list.concat(action.payload)
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
