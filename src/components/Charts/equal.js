// @flow
/* eslint eqeqeq: 0 */

function equal(old, target) {
  let r = true
  Object.keys(old).forEach(prop => {
    if (typeof old[prop] === 'function' && typeof target[prop] === 'function') {
      if (old[prop].toString() != target[prop].toString()) {
        r = false
      }
    } else if (old[prop] != target[prop]) {
      r = false
    }
  })
  return r
}

export default equal
