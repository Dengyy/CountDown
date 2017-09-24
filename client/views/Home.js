import React from 'react'
import _ from 'lodash'
import CountDownBtn from '@/components/CountDownBtn'

class Demo1 extends React.Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    const config = {
      initText: 'click and start count down',
      countDownText: '{n}s later can click again',
      totalTime: 20,
      style: {
        fontSize: '20px'
      }
    }

    return (
      <label>
        <h2>Demo1</h2>
        <CountDownBtn {...config}></CountDownBtn>
      </label>
    )
  }
}

class Demo2 extends React.Component {
  constructor () {
    super()
    this.state = {
      btnDisabled: true,
      btnReset: false,
      errHint: ''
    }

    this.mobileChangeHandler = this.mobileChangeHandler.bind(this)
    this.btnHandler = this.btnHandler.bind(this)
  }
  mobileChangeHandler (e) {
    const value = _.trim(e.target.value)
    const mobileReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/

    this.setState({
      btnDisabled: !mobileReg.test(value)
    })
  }
  btnHandler () {
    this.setState({
      errHint: '',
      btnReset: false
    })
    // fetch api
    setTimeout(() => {
      this.setState({
        btnReset: true,
        errHint: '请求出错，请重试'
      })
    }, 2000)
  }
  render () {
    const {btnDisabled, btnReset, errHint} = this.state

    return (
      <label>
        <h2>Demo2</h2>
        <input placeholder="请输入手机号" onChange={this.mobileChangeHandler}/>
        <span onClick={this.btnHandler}>
          <CountDownBtn disabled={btnDisabled} reset={btnReset}></CountDownBtn>
        </span>
        <p className={errHint && 'err-hint'}>{errHint}</p>
      </label>
    )
  }
}

class Home extends React.Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    return (
      <div>
        <Demo1></Demo1>
        <Demo2></Demo2>
      </div>
    )
  }
}

export default Home
