// @flow
import React, { PureComponent } from 'react'
import G2 from 'g2'
import equal from '../equal'
import styles from '../index.less'

type Props = {
  data: Object[],
  height?: number,
  fit?: number,
  color?: string
}

class MiniBar extends PureComponent<Props> {
  componentDidMount() {
    this.renderChart(this.props.data)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!equal(this.props, nextProps)) {
      this.renderChart(nextProps.data)
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy()
    }
  }

  chart = null
  node = null

  renderChart(data: Object[]) {
    const { height = 0, fit = true, color = '#1890FF' } = this.props

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
      height: height + 54,
      plotCfg: {
        margin: [36, 5, 30, 5]
      },
      legend: null
    })

    chart.axis(false)

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
    chart.render()

    this.chart = chart
  }

  render() {
    const { height } = this.props

    return (
      <div className={styles.miniChart} style={{ height }}>
        <div className={styles.chartContent}>
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

export default MiniBar
