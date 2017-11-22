// @flow
import React, { Component } from 'react'
import { Tooltip } from 'antd'
import classNames from 'classnames'
import styles from './index.less'

type Props = {|
  lines: ?number,
  children: Object[],
  length?: number,
  suffixColor?: string,
  suffixOffset?: number,
  className?: string,
  tooltip?: boolean,
  style?: Object
|}
type State = {|
  text: string,
  targetCount: number
|}

/* eslint react/no-did-mount-set-state: 0 */
/* eslint no-param-reassign: 0 */

// $FlowFixMe
const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined

const EllipsisText = ({ text, length = 0, tooltip, ...other }) => {
  if (typeof text !== 'string') {
    throw new Error('Ellipsis children must be string.')
  }
  if (text.length <= length || length < 0) {
    return <span {...other}>{text}</span>
  }
  const tail = '...'
  let displayText
  if (length - tail.length <= 0) {
    displayText = ''
  } else {
    displayText = text.slice(0, length - tail.length)
  }

  if (tooltip) {
    return (
      <Tooltip title={text}>
        <span>
          {displayText}
          {tail}
        </span>
      </Tooltip>
    )
  }

  return (
    <span {...other}>
      {displayText}
      {tail}
    </span>
  )
}

export default class Ellipsis extends Component<Props, State> {
  state = {
    text: '',
    targetCount: 0
  }

  componentDidMount() {
    if (this.node) {
      this.computeLine()
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.lines !== nextProps.lines) {
      this.computeLine()
    }
  }

  node: ?Object = null
  shadow: ?Object = null
  shadowChildren: ?Object = null
  root = null
  content: ?Object = null
  computeLine = () => {
    const { lines } = this.props
    if (lines && !isSupportLineClamp) {
      const shadowChildren = this.shadowChildren || {}
      const text = shadowChildren.innerText || ''
      const lineHeight = parseInt(
        window.getComputedStyle(this.root).lineHeight,
        10
      )
      const targetHeight = lines * lineHeight
      const content = this.content || {}
      content.style.height = `${targetHeight}px`
      const totalHeight =
        (this.shadowChildren && this.shadowChildren.offsetHeight) || 0
      const shadowNode = (this.shadow && this.shadow.firstChild) || {}

      if (totalHeight <= targetHeight) {
        this.setState({
          text,
          targetCount: text.length
        })
        return
      }

      // bisection
      const len = text.length
      const mid = Math.floor(len / 2)

      const count = this.bisection(targetHeight, mid, 0, len, text, shadowNode)

      this.setState({
        text,
        targetCount: count
      })
    }
  }

  bisection = (
    th: number,
    m: number,
    b: number,
    e: number,
    text: string,
    shadowNode: Object
  ) => {
    const suffix = '...'
    let mid = m
    let end = e
    let begin = b
    shadowNode.innerHTML = text.substring(0, mid) + suffix
    let sh = shadowNode.offsetHeight

    if (sh <= th) {
      shadowNode.innerHTML = text.substring(0, mid + 1) + suffix
      sh = shadowNode.offsetHeight
      if (sh > th) {
        return mid
      }
      begin = mid
      mid = Math.floor((end - begin) / 2) + begin
      return this.bisection(th, mid, begin, end, text, shadowNode)
    }
    if (mid - 1 < 0) {
      return mid
    }
    shadowNode.innerHTML = text.substring(0, mid - 1) + suffix
    sh = shadowNode.offsetHeight
    if (sh <= th) {
      return mid - 1
    }
    end = mid
    mid = Math.floor((end - begin) / 2) + begin
    return this.bisection(th, mid, begin, end, text, shadowNode)
  }

  render() {
    const { text, targetCount } = this.state
    const {
      children,
      lines,
      length,
      className,
      tooltip,
      ...restProps
    } = this.props

    const cls = classNames(styles.ellipsis, className, {
      [styles.lines]: lines && !isSupportLineClamp,
      [styles.lineClamp]: lines && isSupportLineClamp
    })

    if (!lines && !length) {
      return (
        <span className={cls} {...restProps}>
          {children}
        </span>
      )
    }

    // length
    if (!lines) {
      return (
        <EllipsisText
          className={cls}
          length={length}
          text={children || ''}
          tooltip={tooltip}
          {...restProps}
        />
      )
    }

    const id = `antd-pro-ellipsis-${`${new Date().getTime()}${Math.floor(
      Math.random() * 100
    )}`}`

    // support document.body.style.webkitLineClamp
    if (isSupportLineClamp) {
      const style = `#${id}{-webkit-line-clamp:${lines};}`
      return (
        <div id={id} className={cls} {...restProps}>
          <style>{style}</style>
          {tooltip ? <Tooltip title={text}>{children}</Tooltip> : children}
        </div>
      )
    }

    const childNode = (
      <span
        ref={n => {
          this.node = n
        }}>
        {targetCount > 0 && text.substring(0, targetCount)}
        {targetCount > 0 && targetCount < text.length && '...'}
      </span>
    )

    return (
      <div
        {...restProps}
        ref={n => {
          this.node = n
        }}
        className={cls}>
        <div
          ref={n => {
            this.shadowChildren = n
          }}>
          {tooltip ? <Tooltip title={text}>{childNode}</Tooltip> : childNode}
          <div
            className={styles.shadow}
            ref={n => {
              this.shadow = n
            }}>
            {children}
          </div>
          <div
            className={styles.shadow}
            ref={n => {
              this.shadow = n
            }}>
            <span>{text}</span>
          </div>
        </div>
      </div>
    )
  }
}
