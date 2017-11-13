// @flow
import numeral from 'numeral'

export { default as ChartCard } from './ChartCard'
export { default as Bar } from './Bar'
export { default as Pie } from './Pie'
export { default as Radar } from './Radar'
export { default as Gauge } from './Gauge'
export { default as MiniArea } from './MiniArea'
export { default as MiniBar } from './MiniBar'
export { default as MiniProgress } from './MiniProgress'
export { default as Field } from './Field'
export { default as WaterWave } from './WaterWave'
export { default as TagCloud } from './TagCloud'
export { default as TimelineChart } from './TimelineChart'

export const yuan = (val: number) => `&yen; ${numeral(val).format('0,0')}`

// export default {
//   yuan,
//   Bar,
//   Pie,
//   Gauge,
//   Radar,
//   MiniBar,
//   MiniArea,
//   MiniProgress,
//   ChartCard,
//   Field,
//   WaterWave,
//   TagCloud,
//   TimelineChart,
// };
