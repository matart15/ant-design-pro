// @flow
import { queryRule, removeRule, addRule } from '../services/api'

export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {}
    },
    loading: true
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
      const response = yield call(queryRule, payload)
      yield put({
        type: 'save',
        payload: response
      })
      yield put({
        type: 'changeLoading',
        payload: false
      })
    },
    *add(
      { payload, callback }: { payload: Object, callback: Function },
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeLoading',
        payload: true
      })
      const response = yield call(addRule, payload)
      yield put({
        type: 'save',
        payload: response
      })
      yield put({
        type: 'changeLoading',
        payload: false
      })

      if (callback) callback()
    },
    *remove(
      { payload, callback }: { payload: Object, callback: Function },
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeLoading',
        payload: true
      })
      const response = yield call(removeRule, payload)
      yield put({
        type: 'save',
        payload: response
      })
      yield put({
        type: 'changeLoading',
        payload: false
      })

      if (callback) callback()
    }
  },

  reducers: {
    save(state: Object, action: Object) {
      return {
        ...state,
        data: action.payload
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
