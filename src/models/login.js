// @flow
import { routerRedux } from 'dva/router'
import { fakeAccountLogin, fakeMobileLogin } from '../services/api'

export default {
  namespace: 'login',

  state: {
    status: undefined
  },

  effects: {
    *accountSubmit(
      { payload }: { payload: Object },
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeSubmitting',
        payload: true
      })
      const response = yield call(fakeAccountLogin, payload)
      yield put({
        type: 'changeLoginStatus',
        payload: response
      })
      yield put({
        type: 'changeSubmitting',
        payload: false
      })
    },
    *mobileSubmit(
      _: any,
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeSubmitting',
        payload: true
      })
      const response = yield call(fakeMobileLogin)
      yield put({
        type: 'changeLoginStatus',
        payload: response
      })
      yield put({
        type: 'changeSubmitting',
        payload: false
      })
    },
    *logout(_: any, { put }: { put: Function }): Generator<*, *, *> {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false
        }
      })
      yield put(routerRedux.push('/user/login'))
    }
  },

  reducers: {
    changeLoginStatus(state: Object, { payload }: { payload: Object }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type
      }
    },
    changeSubmitting(state: Object, { payload }: { payload: Object }) {
      return {
        ...state,
        submitting: payload
      }
    }
  }
}
