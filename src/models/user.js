// @flow
import { query as queryUsers, queryCurrent } from '../services/user'

export default {
  namespace: 'user',

  state: {
    list: [],
    loading: false,
    currentUser: {}
  },

  effects: {
    *fetch(
      _: any,
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeLoading',
        payload: true
      })
      const response = yield call(queryUsers)
      yield put({
        type: 'save',
        payload: response
      })
      yield put({
        type: 'changeLoading',
        payload: false
      })
    },
    *fetchCurrent(
      _: any,
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      const response = yield call(queryCurrent)
      yield put({
        type: 'saveCurrentUser',
        payload: response
      })
    }
  },

  reducers: {
    save(state: Object, action: Object) {
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
    },
    saveCurrentUser(state: Object, action: Object) {
      return {
        ...state,
        currentUser: action.payload
      }
    },
    changeNotifyCount(state: Object, action: Object) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload
        }
      }
    }
  }
}
