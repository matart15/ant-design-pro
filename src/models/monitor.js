// @flow
import { queryTags } from '../services/api'

export default {
  namespace: 'monitor',

  state: {
    tags: []
  },

  effects: {
    *fetchTags(
      _: any,
      { call, put }: { call: Function, put: Function }
    ): Generator<*, *, *> {
      const response = yield call(queryTags)
      yield put({
        type: 'saveTags',
        payload: response.list
      })
    }
  },

  reducers: {
    saveTags(state: Object, action: Object) {
      return {
        ...state,
        tags: action.payload
      }
    }
  }
}
