// @flow
import { queryBasicProfile, queryAdvancedProfile } from '../services/api'

export default {
  namespace: 'profile',

  state: {
    basicGoods: [],
    basicLoading: true,
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
    advancedLoading: true
  },

  effects: {
    *fetchBasic(
      _: any,
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeLoading',
        payload: { basicLoading: true }
      })
      const response = yield call(queryBasicProfile)
      yield put({
        type: 'show',
        payload: response
      })
      yield put({
        type: 'changeLoading',
        payload: { basicLoading: false }
      })
    },
    *fetchAdvanced(
      _: any,
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeLoading',
        payload: { advancedLoading: true }
      })
      const response = yield call(queryAdvancedProfile)
      yield put({
        type: 'show',
        payload: response
      })
      yield put({
        type: 'changeLoading',
        payload: { advancedLoading: false }
      })
    }
  },

  reducers: {
    show(state: Object, { payload }: { payload: Object }) {
      return {
        ...state,
        ...payload
      }
    },
    changeLoading(state: Object, { payload }: { payload: Object }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}
