// @flow
import React, { Component } from 'react'
import classNames from 'classnames'
import { Tag, Icon } from 'antd'

import styles from './index.less'

type Props = {|
  onChange: Function,
  children: Object[],
  className?: string,
  style?: Object,
  initialValue?: string[],
  expandable: boolean
|}
type State = {|
  expand: boolean,
  checkedTags: string[]
|}

const { CheckableTag } = Tag

const TagSelectOption = ({
  children,
  checked,
  onChange = () => {},
  value
}: {
  children: string,
  checked?: boolean,
  onChange?: Function,
  value: string
}) => (
  <CheckableTag
    checked={checked}
    key={value}
    onChange={state => onChange(value, state)}>
    {children}
  </CheckableTag>
)
// TagSelectOption.defaultProps = {
//   displayName: 'TagSelectOption'
// }

class TagSelect extends Component<Props, State> {
  static defaultProps = {
    initialValue: []
  }
  static Option = TagSelectOption
  state = {
    expand: false,
    checkedTags: this.props.initialValue || []
  }

  onSelectAll = (checked: boolean) => {
    const { onChange } = this.props
    let checkedTags = []
    if (checked) {
      checkedTags = this.getAllTags()
    }

    this.setState({ checkedTags })

    if (onChange) {
      onChange(checkedTags)
    }
  }

  getAllTags() {
    const { children } = this.props
    const checkedTags = children
      .filter(child => this.isTagSelectOption(child))
      .map(child => child.props.value)
    return checkedTags
  }

  handleTagChange = (value: string, checked: boolean) => {
    const { onChange } = this.props
    const { checkedTags } = this.state

    const index = checkedTags.indexOf(value)
    if (checked && index === -1) {
      checkedTags.push(value)
    } else if (!checked && index > -1) {
      checkedTags.splice(index, 1)
    }

    this.setState({ checkedTags })

    if (onChange) {
      onChange(checkedTags)
    }
  }

  handleExpand = () => {
    this.setState({
      expand: !this.state.expand
    })
  }

  isTagSelectOption = (node: Object) =>
    node &&
    node.type &&
    (node.type.isTagSelectOption || node.type.displayName === 'TagSelectOption')

  render() {
    const { checkedTags, expand } = this.state
    const { children, className, style, expandable } = this.props

    const checkedAll = this.getAllTags().length === checkedTags.length

    const cls = classNames(styles.tagSelect, className, {
      [styles.hasExpandTag]: expandable,
      [styles.expanded]: expand
    })

    return (
      <div className={cls} style={style}>
        <CheckableTag
          checked={checkedAll}
          key="tag-select-__all__"
          onChange={this.onSelectAll}>
          全部
        </CheckableTag>
        {checkedTags &&
          children.map(child => {
            if (this.isTagSelectOption(child)) {
              return React.cloneElement(child, {
                key: `tag-select-${child.props.value}`,
                checked: checkedTags.indexOf(child.props.value) > -1,
                onChange: this.handleTagChange
              })
            }
            return child
          })}
        {expandable && (
          <a className={styles.trigger} onClick={this.handleExpand}>
            {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
          </a>
        )}
      </div>
    )
  }
}

export default TagSelect
