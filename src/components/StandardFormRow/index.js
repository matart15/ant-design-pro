// @flow
import React from 'react'
import classNames from 'classnames'
import styles from './index.less'

export default ({
  title,
  children,
  last,
  block,
  grid,
  ...rest
}: {
  title: string,
  children: Object,
  last?: boolean,
  block?: boolean,
  grid?: boolean
}) => {
  const cls = classNames(styles.standardFormRow, {
    [styles.standardFormRowBlock]: block,
    [styles.standardFormRowLast]: last,
    [styles.standardFormRowGrid]: grid
  })

  return (
    <div className={cls} {...rest}>
      {title && (
        <div className={styles.label}>
          <span>{title}</span>
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  )
}
