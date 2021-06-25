Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageStyle: false,
    scrollTop: 0,
    offsetTop: 0,
    statusBarHeight: 0,
    navBarHeight: 46,
    dropdownHeight: 50,
    headerTop: 0,
    contentTop: 0,
    contentMinHeight: '1000rpx',
    option1: [{
        text: '全部商品',
        value: 0
      },
      {
        text: '新款商品',
        value: 1
      },
      {
        text: '活动商品',
        value: 2
      },
    ],
    option2: [{
        text: '默认排序',
        value: 'a'
      },
      {
        text: '好评排序',
        value: 'b'
      },
      {
        text: '销量排序',
        value: 'c'
      },
    ],
    total: 2,
    value1: 0,
    value2: 'a',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let {
      statusBarHeight,
      screenHeight
    } = getApp().globalData.systemInfo
    
    let navBarHeight = this.data.navBarHeight
    let offsetTop = parseInt(statusBarHeight) + parseInt(navBarHeight)
    let contentMinHeight = parseInt(screenHeight) - offsetTop
    this.setData({
      statusBarHeight,
      offsetTop,
      contentMinHeight: (contentMinHeight * 2 + 2) + 'rpx'
    })
  },

  onScroll(event) {
    /*
    wx.createSelectorQuery()
      .select('#scroller')
      .boundingClientRect((res) => {
        this.setData({
          scrollTop: event.detail.scrollTop,
          offsetTop: res.top,
        });
      })
      .exec();
    */

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.createSelectorQuery()
      .select('#header')
      .boundingClientRect((res) => {
        console.log('header', res);
      })
      .exec();
    wx.createSelectorQuery()
      .select('#content')
      .boundingClientRect((res) => {
        console.log('content', res);
        this.setData({
          contentTop: res.top
        })
      })
      .exec();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  topMenu() {
    let top = parseInt(this.data.contentTop)
    let h1 = parseInt(this.data.statusBarHeight)
    let h2 = parseInt(this.data.navBarHeight)
    let scrollTop = top - (h1 + h2)
    console.log('scrollTop', scrollTop);
    wx.pageScrollTo({
      duration: 0,
      scrollTop
    })
  },
  change() {
    setTimeout(() => {
      this.setData({
        total: 15
      })
    }, 2000)
  },
  openDropdown(e) {
    this.setData({
      pageStyle: true
    })
  },
  openedDropdown(e) {
    this.topMenu()
    // dropdown-item绝对位置
    let offsetTop = this.data.offsetTop
    let dropdownHeight = 50
    let top = parseInt(offsetTop) + parseInt(dropdownHeight)
    let id = e.currentTarget.id
    this.selectComponent(`#${id}`).updateTop(top)
  },
  closeDropdown() {
    this.setData({
      pageStyle: false
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
