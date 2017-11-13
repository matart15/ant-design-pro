// @flow
import { queryNotices } from '../services/api'

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    fetchingNotices: false
  },

  effects: {
    *fetchNotices(
      _: any,
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      yield put({
        type: 'changeNoticeLoading',
        payload: true
      })
      const data = yield call(queryNotices)
      yield put({
        type: 'saveNotices',
        payload: data
      })
    },
    *clearNotices(
      { payload }: { payload: Object },
      { put, select }: { put: Function, select: Function }
    ): Generator<*, *, *> {
      const count = yield select(state => state.global.notices.length)
      yield put({
        type: 'user/changeNotifyCount',
        payload: count
      })

      yield put({
        type: 'saveClearedNotices',
        payload
      })
    }
  },

  reducers: {
    changeLayoutCollapsed(state: Object, { payload }: { payload: Object }) {
      return {
        ...state,
        collapsed: payload
      }
    },
    saveNotices(state: Object, { payload }: { payload: Object }) {
      return {
        ...state,
        notices: payload,
        fetchingNotices: false
      }
    },
    saveClearedNotices(state: Object, { payload }: { payload: Object }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload)
      }
    },
    changeNoticeLoading(state: Object, { payload }: { payload: Object }) {
      return {
        ...state,
        fetchingNotices: payload
      }
    }
  },

  subscriptions: {
    setup({ history }: { history: Object }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search)
        }
      })
    }
  }
}
