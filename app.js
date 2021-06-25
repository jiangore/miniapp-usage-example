//require('./libs/extension')

import {
  BGM
} from './utils/params'

const backgroundAudioManager = wx.getBackgroundAudioManager()

App({
  onLaunch: function (options) {
    // console.log('onLaunch', options);
    // 背景音乐
    // this.startPlayAudio()
    // 开启后台定位
    // this.startRealTimeLocation()
    // wx.onLocationChange(function (res) {
    //   console.log('location change', res)
    // })

    

    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            ss: res => {
              console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


    // 登录
    // this.login()
    // 写日志
    this.writeLogs()
    // 获取设备信息
    this.initSystemInfo()
  },
  onShow: function (options) {
    console.log('onShow', options);
    console.log('onShow', '生命周期回调——监听小程序启动或切前台');
  },
  onHide: function () {
    console.log('onHide 生命周期回调——监听小程序切后台');
  },
  onError: function () {
    console.log('onError 错误监听函数');
  },
  onPageNotFound: function () {
    console.log('onPageNotFound 页面不存在监听函数');
  },
  onUnhandledRejection: function () {
    console.log('未处理的 Promise 拒绝事件监听函数');
  },
  onThemeChange: function () {
    console.log('onThemeChange 监听系统主题变化');
  },
  startPlayAudio() {
    backgroundAudioManager.title = BGM.title
    backgroundAudioManager.epname = BGM.epname
    backgroundAudioManager.singer = BGM.singer
    backgroundAudioManager.coverImgUrl = BGM.coverImgUrl
    backgroundAudioManager.src = BGM.src
  },
  startRealTimeLocation() {
    wx.startLocationUpdate({
      success(res) {
        console.log('开启后台定位', res)
      },
      fail(res) {
        console.log('开启后台定位失败', res)
      }
    })
    /*
    wx.startLocationUpdateBackground({
      success(res) {
        console.log('开启后台定位', res)
      },
      fail(res) {
        console.log('开启后台定位失败', res)
      }
    })
    */
  },

  login() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
      }
    })
  },

  writeLogs() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  initSystemInfo() {
    wx.getSystemInfo({
      success: res => {
        console.log('systemInfo', res)
        this.globalData.systemInfo = res
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  globalData: {
    systemInfo: null,
    userInfo: null
  }
})