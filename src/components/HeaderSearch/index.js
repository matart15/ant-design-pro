// @flow
import React, { PureComponent } from 'react'
import { Input, Icon, AutoComplete } from 'antd'
import classNames from 'classnames'
import styles from './index.less'

type Props = {|
  className: string,
  placeholder: string,
  onSearch: Function,
  onPressEnter: Function,
  defaultActiveFirstOption: boolean,
  dataSource: string[]
|}
type State = {|
  searchMode: boolean,
  value: string
|}

export default class HeaderSearch extends PureComponent<Props, State> {
  static defaultProps = {
    defaultActiveFirstOption: false,
    onPressEnter: () => {},
    onSearch: () => {},
    className: '',
    placeholder: '',
    dataSource: []
  }
  state = {
    searchMode: false,
    value: ''
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  onKeyDown = (e: Object) => {
    if (e.key === 'Enter') {
      this.timeout = setTimeout(() => {
        this.props.onPressEnter(this.state.value) // Fix duplicate onPressEnter
      }, 0)
    }
  }
  onChange = (value: string) => {
    this.setState({ value })
    if (this.props.onChange) {
      this.props.onChange()
    }
  }
  timeout = null
  input = null
  enterSearchMode = () => {
    this.setState({ searchMode: true }, () => {
      if (this.input && this.state.searchMode) {
        this.input.focus()
      }
    })
  }
  leaveSearchMode = () => {
    this.setState({
      searchMode: false,
      value: ''
    })
  }
  render() {
    const { className, placeholder, ...restProps } = this.props
    const inputClass = classNames(styles.input, {
      [styles.show]: this.state.searchMode
    })
    return (
      <span
        className={classNames(className, styles.headerSearch)}
        onClick={this.enterSearchMode}>
        <Icon type="search" />
        <AutoComplete
          {...restProps}
          className={inputClass}
          value={this.state.value}
          onChange={this.onChange}>
          <Input
            placeholder={placeholder}
            ref={node => {
              this.input = node
            }}
            onKeyDown={this.onKeyDown}
            onBlur={this.leaveSearchMode}
          />
        </AutoComplete>
      </span>
    )
  }
}
