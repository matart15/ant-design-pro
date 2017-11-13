// @flow
import React, { Component } from 'react'
import { Tooltip } from 'antd'
import classNames from 'classnames'
import styles from './index.less'

type Props = {|
  lines: ?number,
  cover: boolean,
  children: Object[],
  length?: number,
  suffixColor?: string,
  suffixOffset?: number,
  className?: string,
  tooltip?: boolean,
  style?: Object
|}
type State = {|
  lineHeight: number,
  text: string,
  targetCount: number
|}

/* eslint react/no-did-mount-set-state: 0 */
/* eslint no-param-reassign: 0 */

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
      <span>
        {displayText}
        <Tooltip title={text}>{tail}</Tooltip>
      </span>
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
    lineHeight: 0,
    text: '',
    targetCount: 0
  }

  componentDidMount() {
    const { lines, cover } = this.props
    if (this.node) {
      if (lines && cover) {
        this.setState({
          lineHeight: parseInt(
            window.getComputedStyle(this.node).lineHeight,
            10
          )
        })
      }
      this.computeLine()
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      this.props.lines !== nextProps.lines ||
      this.props.cover !== nextProps.cover
    ) {
      this.setState({
        lineHeight: parseInt(window.getComputedStyle(this.node).lineHeight, 10)
      })
      this.computeLine()
    }
  }

  node: ?Object = null
  shadow: ?Object = null
  shadowChildren: ?Object = null
  computeLine = () => {
    const { lines, cover } = this.props
    if (lines && !cover) {
      const fontSize =
        parseInt(window.getComputedStyle(this.node).fontSize, 10) || 14
      const shadowChildren = this.shadowChildren || {}
      const text = shadowChildren.innerText
      const node = this.node || {}
      const targetWidth =
        (node.offsetWidth || node.parentNode.offsetWidth) * lines
      const shadow = this.shadow || {}
      const shadowNode = shadow.firstChild

      // bisection
      const tw = targetWidth - lines * (fontSize / 2) - fontSize
      const len = text.length
      const mid = Math.floor(len / 2)

      const count = this.bisection(tw, mid, 0, len, text, shadowNode)

      this.setState({
        text,
        targetCount: count
      })
    }
  }

  bisection = (
    tw: number,
    m: number,
    b: number,
    e: number,
    text: string,
    shadowNode: Object
  ) => {
    let mid = m
    let end = e
    let begin = b
    shadowNode.innerHTML = text.substring(0, mid)
    let sw = shadowNode.offsetWidth

    if (sw < tw) {
      shadowNode.innerHTML = text.substring(0, mid + 1)
      sw = shadowNode.offsetWidth
      if (sw >= tw) {
        return mid
      }
      begin = mid
      mid = Math.floor((end - begin) / 2) + begin
      return this.bisection(tw, mid, begin, end, text, shadowNode)
    }
    if (mid - 1 < 0) {
      return mid
    }
    shadowNode.innerHTML = text.substring(0, mid - 1)
    sw = shadowNode.offsetWidth
    if (sw <= tw) {
      return mid
    }
    end = mid
    mid = Math.floor((end - begin) / 2) + begin
    return this.bisection(tw, mid, begin, end, text, shadowNode)
  }

  render() {
    const { text, targetCount, lineHeight } = this.state
    const {
      children,
      lines,
      length,
      cover = false,
      suffixColor = '#fff',
      suffixOffset = 0,
      className,
      tooltip,
      ...restProps
    } = this.props

    const cls = classNames(styles.ellipsis, className, {
      [styles.lines]: lines && !cover,
      [styles.linesCover]: lines && cover
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

    // lines cover
    if (cover) {
      const id = `antd-pro-ellipsis-${`${new Date().getTime()}${Math.floor(
        Math.random() * 100
      )}`}`
      const style = `#${id}:before{background-color:${
        suffixColor
      };padding-left:${suffixOffset}px;}`
      return (
        <div
          {...restProps}
          id={id}
          ref={n => {
            this.node = n
          }}
          className={cls}
          style={{
            ...restProps.style,
            maxHeight: `${lines * lineHeight}px`
          }}>
          <style>{style}</style>
          {children}
        </div>
      )
    }

    // lines no cover
    const suffix = tooltip ? <Tooltip title={text}>...</Tooltip> : '...'

    return (
      <div
        {...restProps}
        ref={n => {
          this.node = n
        }}
        className={cls}>
        {targetCount > 0 && text.substring(0, targetCount)}
        {targetCount > 0 && targetCount < text.length && suffix}
        <div
          className={styles.shadow}
          ref={n => {
            this.shadowChildren = n
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
    )
  }
}
