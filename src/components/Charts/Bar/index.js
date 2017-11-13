// @flow
import React, { PureComponent } from 'react'
import G2 from 'g2'
import Debounce from 'lodash-decorators/debounce'
import equal from '../equal'
import styles from '../index.less'

type Props = {|
  data: Object[],
  autoLabel?: boolean,
  title: string,
  height: number,
  fit?: string,
  color?: string,
  margin?: number
|}
type State = {| autoHideXLabels: boolean |}
class Bar extends PureComponent<Props, State> {
  state = {
    autoHideXLabels: false
  }

  componentDidMount() {
    this.renderChart(this.props.data)

    window.addEventListener('resize', this.resize)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!equal(this.props, nextProps)) {
      this.renderChart(nextProps.data)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
    if (this.chart) {
      this.chart.destroy()
    }
  }
  chart = null
  node: ?Object = null
  @Debounce(200)
  resize = () => {
    if (!this.node) {
      return
    }
    const parentNode = this.node.parentNode || { clientWidth: 0 }
    const canvasWidth = parentNode.clientWidth || 0
    const { data = [], autoLabel = true } = this.props
    if (!autoLabel) {
      return
    }
    const minWidth = data.length * 30
    const { autoHideXLabels } = this.state

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true
        })
        this.renderChart(data)
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false
      })
      this.renderChart(data)
    }
  }

  renderChart(data: Object[]) {
    const { autoHideXLabels } = this.state
    const {
      height = 0,
      fit = true,
      color = 'rgba(24, 144, 255, 0.85)',
      margin = [32, 0, autoHideXLabels ? 8 : 32, 40]
    } = this.props

    if (!data || (data && data.length < 1)) {
      return
    }

    // clean
    if (!this.node) {
      return
    }
    this.node.innerHTML = ''

    const { Frame } = G2
    const frame = new Frame(data)

    const chart = new G2.Chart({
      container: this.node,
      forceFit: fit,
      height: height - 22,
      legend: null,
      plotCfg: {
        margin
      }
    })

    if (autoHideXLabels) {
      chart.axis('x', {
        title: false,
        tickLine: false,
        labels: false
      })
    } else {
      chart.axis('x', {
        title: false
      })
    }
    chart.axis('y', {
      title: false,
      line: false,
      tickLine: false
    })

    chart.source(frame, {
      x: {
        type: 'cat'
      },
      y: {
        min: 0
      }
    })

    chart.tooltip({
      title: null,
      crosshairs: false,
      map: {
        name: 'x'
      }
    })
    chart
      .interval()
      .position('x*y')
      .color(color)
      .style({
        fillOpacity: 1
      })
    chart.render()

    this.chart = chart
  }

  render() {
    const { height, title } = this.props

    return (
      <div className={styles.chart} style={{ height }}>
        <div>
          {title && <h4>{title}</h4>}
          <div
            ref={n => {
              this.node = n
            }}
          />
        </div>
      </div>
    )
  }
}

export default Bar
