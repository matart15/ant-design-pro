// @flow
import { fakeRegister } from '../services/api'

export default {
  namespace: 'register',

  state: {
    status: undefined
  },

  effects: {
    *submit(
      _: any,
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeSubmitting',
        payload: true
      })
      const response = yield call(fakeRegister)
      yield put({
        type: 'registerHandle',
        payload: response
      })
      yield put({
        type: 'changeSubmitting',
        payload: false
      })
    }
  },

  reducers: {
    registerHandle(state: Object, { payload }: { payload: Object }) {
      return {
        ...state,
        status: payload.status
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
