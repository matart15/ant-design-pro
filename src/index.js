import dva from 'dva'
import 'moment/locale/zh-cn'
import models from './models'
import './polyfill'
import './g2'
// import { browserHistory } from 'dva/router';
import './index.less'
import router from './router'

// 1. Initialize
const app = dva({
  // history: browserHistory,
})

// 2. Plugins
// app.use({});

// 3. Model move to router
models.forEach(m => {
  if (m.namespace) {
    app.model(m)
  } else {
    app.model(m.default)
  }
})

// 4. Router
app.router(router)

// 5. Start
app.start('#root')
