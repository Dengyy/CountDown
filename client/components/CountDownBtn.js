import React from 'react'
import ProtoTypes from 'prop-types'
import _ from 'lodash'

const COUNT_DOWN_INTERVAL = 1000

class CountDownBtn extends React.Component {
  constructor (props) {
    super()
    this.state = {
      startCountDown: false,
      remainTime: props.totalTime,
      lastExecTime: null
    }

    this.countDownHandler = this.countDownHandler.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.reset && nextProps.reset !== this.props.reset) {
      this.reset()
    }
  }
  componentWillUnmount () {
    this.reset()
  }
  reset () {
    clearTimeout(this.timer)
    this.setState({
      startCountDown: false,
      remainTime: this.props.totalTime,
      lastExecTime: null
    })
  }
  countDownHandler (e) {
    this.setState({
      startCountDown: true
    })

    this.countDown()
  }
  countDown () {
    let now = new Date()

    if (!this.state.lastExecTime) {
      this.setState({
        lastExecTime: now
      })
    }

    let diff = now - (this.state.lastExecTime || now)
    let nextExecTime = 0

    if (diff >= 0 && diff <= COUNT_DOWN_INTERVAL) {
      nextExecTime = COUNT_DOWN_INTERVAL - diff
    } else if (diff > COUNT_DOWN_INTERVAL) {
      this.setState({
        remainTime: this.state.remainTime - Math.floor(diff / COUNT_DOWN_INTERVAL)
      })
      nextExecTime = COUNT_DOWN_INTERVAL - diff % COUNT_DOWN_INTERVAL
    } else {
      throw new Error('Now time is latter than lastExecTime')
    }

    this.timer = setTimeout(() => {
      if (this.state.remainTime <= 0) {
        this.reset()
        return
      }

      this.setState({
        remainTime: this.state.remainTime - 1,
        lastExecTime: new Date()
      })

      this.countDown()
    }, nextExecTime)
  }
  render () {
    const { startCountDown, remainTime } = this.state
    const { initText, countDownText, disabled } = this.props

    const replacedText = countDownText.replace('{n}', remainTime)
    let buttonProps = _.omit(this.props, _.keys(CountDownBtn.protoTypes))

    buttonProps = (disabled || startCountDown) ? {
      ...buttonProps,
      disabled: true
    } : buttonProps

    return (
      <button {...buttonProps} onClick={this.countDownHandler}>
        { startCountDown ? `${replacedText}` : initText }
      </button>
    )
  }
}

CountDownBtn.defaultProps = {
  initText: '点击开始倒计时',
  countDownText: '{n}s后可再次发送',
  totalTime: 20
}

CountDownBtn.protoTypes = {
  initText: ProtoTypes.string,
  countDownText: ProtoTypes.string,
  totalTime: ProtoTypes.number,
  disabled: ProtoTypes.boolean
}

export default CountDownBtn
