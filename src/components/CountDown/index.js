// @flow
import React, { Component } from 'react'

type Props = {|
  target: Date,
  onEnd?: Function,
  format?: Function
|}
type State = {| lastTime: number |}

function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val
}

class CountDown extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const { lastTime } = this.initTime(props)

    this.state = {
      lastTime
    }
  }

  componentDidMount() {
    this.tick()
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.target !== nextProps.target) {
      const { lastTime } = this.initTime(nextProps)
      this.setState({
        lastTime
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  timer = 0
  interval = 1000
  initTime = (props: Props) => {
    let lastTime = 0
    let targetTime = 0
    try {
      if (Object.prototype.toString.call(props.target) === '[object Date]') {
        targetTime = props.target.getTime()
      } else {
        targetTime = new Date(props.target).getTime()
      }
    } catch (e) {
      throw new Error(`invalid target prop ${e}`)
    }

    lastTime = targetTime - new Date().getTime()

    return {
      lastTime
    }
  }
  // defaultFormat = time => (
  //  <span>{moment(time).format('hh:mm:ss')}</span>
  // );
  defaultFormat = (time: number) => {
    const hours = 60 * 60 * 1000
    const minutes = 60 * 1000

    const hNumber = Math.floor(time / hours)
    const h = fixedZero(hNumber)
    const mNumber = Math.floor((time - hNumber * hours) / minutes)
    const m = fixedZero(mNumber)
    const sNumber = Math.floor(
      (time - hNumber * hours - mNumber * minutes) / 1000
    )
    const s = fixedZero(sNumber)
    return (
      <span>
        {h}:{m}:{s}
      </span>
    )
  }
  tick = () => {
    const { onEnd } = this.props
    let { lastTime } = this.state

    this.timer = setTimeout(() => {
      if (lastTime < this.interval) {
        clearTimeout(this.timer)
        this.setState({
          lastTime: 0
        })

        if (onEnd) {
          onEnd()
        }
      } else {
        lastTime -= this.interval
        this.setState({
          lastTime
        })

        this.tick()
      }
    }, this.interval)
  }

  render() {
    const { format = this.defaultFormat, ...rest } = this.props
    const { lastTime } = this.state

    const result = format(lastTime)

    return <span {...rest}>{result}</span>
  }
}

export default CountDown
