import api from '../../utils/request';
import http from '../../utils/http';


let cosUpload = require('../../utils/cos/index');
//获取应用实例
const app = getApp()
Page({
  data: {
    currentValue: 2,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    fileList: [
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片1',
        isImage: true,
        deletable: true
      }
    ],
  },
  onDrag(event) {
    this.setData({
      currentValue: event.detail.value,
    });
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  openSetting(e) {
    /*
    wx.openSetting({
      success (res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    });
    */
    wx.getSetting({
      success (res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
  },
  getUserMobile(e) {
    console.log(e.detail);
    
  },
  openScanCode() {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['barCode', 'qrCode'],
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    });
  },
  openMapPage() {
    wx.navigateTo({
      url: '/pages/map/index?userId=1'
    })
  },
  openH5Page() {
    wx.navigateTo({
      url: '/pages/h5/h5'
    })
  },
  cosUpload() {
    cosUpload({count: 1})
    .then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  onLoad: function () {
    /*
    http.get('/wallpaper/bing')
      .then(val => {
        console.log(val);

      }).catch(err => {
        console.log(err);
      });
*/
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})