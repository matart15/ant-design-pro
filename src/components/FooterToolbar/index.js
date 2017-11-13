// @flow
import React from 'react'
import classNames from 'classnames'
import styles from './index.less'

export default (props: {
  children: any,
  className?: string,
  extra?: string
}) => {
  const { children, className, extra, ...restProps } = props
  return (
    <div className={classNames(className, styles.toolbar)} {...restProps}>
      <div className={styles.left}>{extra}</div>
      <div className={styles.right}>{children}</div>
    </div>
  )
}
