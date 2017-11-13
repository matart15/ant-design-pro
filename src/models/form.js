// @flow
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { fakeSubmitForm } from '../services/api'

export default {
  namespace: 'form',

  state: {
    step: {},
    regularFormSubmitting: false,
    stepFormSubmitting: false,
    advancedFormSubmitting: false
  },

  effects: {
    *submitRegularForm(
      { payload }: { payload: Object },
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: true
      })
      yield call(fakeSubmitForm, payload)
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: false
      })
      message.success('提交成功')
    },
    *submitStepForm(
      { payload }: { payload: Object },
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeStepFormSubmitting',
        payload: true
      })
      yield call(fakeSubmitForm, payload)
      yield put({
        type: 'saveStepFormData',
        payload
      })
      yield put({
        type: 'changeStepFormSubmitting',
        payload: false
      })
      yield put(routerRedux.push('/form/step-form/result'))
    },
    *submitAdvancedForm(
      { payload }: { payload: Object },
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeAdvancedFormSubmitting',
        payload: true
      })
      yield call(fakeSubmitForm, payload)
      yield put({
        type: 'changeAdvancedFormSubmitting',
        payload: false
      })
      message.success('提交成功')
    }
  },

  reducers: {
    saveStepFormData(state: Object, { payload }: { payload: Object }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload
        }
      }
    },
    changeRegularFormSubmitting(
      state: Object,
      { payload }: { payload: Object }
    ) {
      return {
        ...state,
        regularFormSubmitting: payload
      }
    },
    changeStepFormSubmitting(state: Object, { payload }: { payload: Object }) {
      return {
        ...state,
        stepFormSubmitting: payload
      }
    },
    changeAdvancedFormSubmitting(
      state: Object,
      { payload }: { payload: Object }
    ) {
      return {
        ...state,
        advancedFormSubmitting: payload
      }
    }
  }
}
