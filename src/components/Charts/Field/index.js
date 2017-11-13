// @flow
import React from 'react'

import styles from './index.less'

const Field = ({ label, value, ...rest }: { label: string, value: string }) => (
  <p className={styles.field} {...rest}>
    <span>{label}</span>
    <span>{value}</span>
  </p>
)

export default Field
