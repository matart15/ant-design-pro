// @flow
import React from 'react'
import classNames from 'classnames'
import { Col } from 'antd'
import styles from './index.less'
import responsive from './responsive'

const Description = ({
  term,
  column = 0,
  className,
  children,
  ...restProps
}: {
  term?: Object | string,
  column?: number,
  className?: string,
  children: string | Object
}) => {
  const clsString = classNames(styles.description, className)
  return (
    <Col className={clsString} {...responsive[column]} {...restProps}>
      {term && <div className={styles.term}>{term}</div>}
      {children && <div className={styles.detail}>{children}</div>}
    </Col>
  )
}

export default Description
