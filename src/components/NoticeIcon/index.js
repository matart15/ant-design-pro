// @flow
import React, { PureComponent } from 'react'
import { Popover, Icon, Tabs, Badge, Spin } from 'antd'
import classNames from 'classnames'
import List from './NoticeList'
import styles from './index.less'

type Props = {|
  onItemClick: Function,
  onPopupVisibleChange: Function,
  onTabChange: Function,
  onClear: Function,
  loading?: boolean,
  locale?: {
    emptyText: string,
    clear: string
  },
  emptyImage?: string,
  children: Object[],
  className: string,
  count: number,
  popupAlign: Object,
  popupVisible?: boolean
|}
type State = {|
  tabType: string
|}

const { TabPane } = Tabs

export default class NoticeIcon extends PureComponent<Props, State> {
  static defaultProps = {
    onItemClick: () => {},
    onPopupVisibleChange: () => {},
    onTabChange: () => {},
    onClear: () => {},
    loading: false,
    locale: {
      emptyText: '暂无数据',
      clear: '清空'
    },
    emptyImage:
      'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'
  }
  static Tab = TabPane
  constructor(props: Props) {
    super(props)
    if (props.children && props.children[0]) {
      this.state.tabType = props.children[0].props.title
    }
  }
  state = { tabType: '' }
  onItemClick = (item: Object, tabProps: Object) => {
    this.props.onItemClick(item, tabProps)
  }
  onTabChange = (tabType: string) => {
    this.setState({ tabType })
    this.props.onTabChange(tabType)
  }
  getNotificationBox() {
    const { children, loading, locale } = this.props
    if (!children) {
      return null
    }
    const panes = children.map(child => {
      const title =
        child.props.list && child.props.list.length > 0
          ? `${child.props.title} (${child.props.list.length})`
          : child.props.title
      return (
        <TabPane tab={title} key={child.props.title}>
          <List
            {...child.props}
            data={child.props.list}
            onClick={item => this.onItemClick(item, child.props)}
            onClear={() => this.props.onClear(child.props.title)}
            title={child.props.title}
            locale={locale}
          />
        </TabPane>
      )
    })
    return (
      <Spin spinning={loading} delay={0}>
        <Tabs className={styles.tabs} onChange={this.onTabChange}>
          {panes}
        </Tabs>
      </Spin>
    )
  }
  render() {
    const { className, count, popupAlign, onPopupVisibleChange } = this.props
    const noticeButtonClass = classNames(className, styles.noticeButton)
    const notificationBox = this.getNotificationBox()
    const trigger = (
      <span className={noticeButtonClass}>
        <Badge count={count} className={styles.badge}>
          <Icon type="bell" className={styles.icon} />
        </Badge>
      </span>
    )
    if (!notificationBox) {
      return trigger
    }
    const popoverProps = {}
    if ('popupVisible' in this.props) {
      popoverProps.visible = this.props.popupVisible
    }
    return (
      <Popover
        placement="bottomRight"
        content={notificationBox}
        popupClassName={styles.popover}
        trigger="click"
        arrowPointAtCenter
        popupAlign={popupAlign}
        onVisibleChange={onPopupVisibleChange}
        {...popoverProps}>
        {trigger}
      </Popover>
    )
  }
}
