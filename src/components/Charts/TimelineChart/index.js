// @flow
import React, { Component } from 'react'
import G2 from 'g2'
import Slider from 'g2-plugin-slider'
import styles from './index.less'

type Props = {|
  data: Object[],
  height?: number,
  title?: string,
  margin?: number[],
  titleMap: Object,
  borderWidth?: number
|}
class TimelineChart extends Component<Props> {
  componentDidMount() {
    this.renderChart(this.props.data)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.data !== this.props.data) {
      this.renderChart(nextProps.data)
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy()
    }
    if (this.slider) {
      this.slider.destroy()
    }
  }

  chart = null
  slider = null
  node = null
  sliderId = `timeline-chart-slider-${Math.random() * 1000}`

  renderChart(data: Object[]) {
    const {
      height = 400,
      margin = [60, 20, 40, 40],
      titleMap,
      borderWidth = 2
    } = this.props

    if (!data || (data && data.length < 1)) {
      return
    }

    // clean
    if (this.sliderId) {
      const s = document.getElementById(this.sliderId)
      if (s) {
        s.innerHTML = ''
      }
    }
    if (!this.node) {
      return
    }
    this.node.innerHTML = ''

    const chart = new G2.Chart({
      container: this.node,
      forceFit: true,
      height,
      plotCfg: {
        margin
      }
    })

    chart.axis('x', {
      title: false
    })
    chart.axis('y1', {
      title: false
    })
    chart.axis('y2', false)

    chart.legend({
      mode: false,
      position: 'top'
    })

    chart.source(data, {
      x: {
        type: 'timeCat',
        tickCount: 16,
        mask: 'HH:MM',
        range: [0, 1]
      },
      y1: {
        alias: titleMap.y1,
        min: 0
      },
      y2: {
        alias: titleMap.y2,
        min: 0
      }
    })

    chart
      .line()
      .position('x*y1')
      .color('#1890FF')
      .size(borderWidth)
    chart
      .line()
      .position('x*y2')
      .color('#2FC25B')
      .size(borderWidth)

    this.chart = chart

    /* eslint new-cap:0 */
    const slider = new Slider({
      domId: this.sliderId,
      height: 26,
      xDim: 'x',
      yDim: 'y1',
      charts: [chart]
    })
    slider.render()

    this.slider = slider
  }

  render() {
    const { height, title } = this.props

    return (
      <div className={styles.timelineChart} style={{ height }}>
        <div>
          {title && <h4>{title}</h4>}
          <div
            ref={n => {
              this.node = n
            }}
          />
          <div id={this.sliderId} />
        </div>
      </div>
    )
  }
}

export default TimelineChart
