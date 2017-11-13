// @flow
import React from 'react'
import { Icon } from 'antd'
import classNames from 'classnames'
import styles from './index.less'

export default ({
  theme = '',
  title,
  subTitle,
  total,
  subTotal,
  status,
  suffix,
  gap,
  ...rest
}: {
  theme?: string,
  title?: string,
  subTitle: string | Object,
  total: string | Object | number,
  subTotal?: number,
  status?: string,
  suffix?: string,
  gap?: number
}) => (
  <div
    className={classNames(styles.numberInfo, {
      [styles[`numberInfo${theme}`]]: theme
    })}
    {...rest}>
    {title && <div className={styles.numberInfoTitle}>{title}</div>}
    {subTitle && <div className={styles.numberInfoSubTitle}>{subTitle}</div>}
    <div
      className={styles.numberInfoValue}
      style={gap ? { marginTop: gap } : null}>
      <span>
        {total}
        {suffix && <em className={styles.suffix}>{suffix}</em>}
      </span>
      {(status || subTotal) && (
        <span className={styles.subTotal}>
          {subTotal}
          {status && <Icon type={`caret-${status}`} />}
        </span>
      )}
    </div>
  </div>
)
