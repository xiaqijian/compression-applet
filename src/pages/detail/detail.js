// detail.js
var app = getApp();
var detailData = require('../../data/detail-data.js');
var QQMapWX = require('../../qqmap-wx-jssdk.js');
var demo;
Page({
  data: {
    detail_key: {},
    detail_id:0,
    imgalist: [],
    addressdata: {},
    rec_shop_1:{},
    rec_shop_2: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){
    console.log(options.detail_id)
    var that = this;
    var count = options.detail_id;
    var env_img = detailData.detailList.slice(count - 1, count)[0].environment_banner;
    
    var len = env_img.length;
    var imglis = []
    for(var i=0;i<len;i++){
      imglis.push(env_img[i].ev_img)
    }
    var num = Number(count);
    console.log(detailData.detailList[num+1]);
    console.log(typeof num);
    that.setData({
      detail_key: detailData.detailList.slice(count - 1, count)[0],
      rec_shop_1:detailData.detailList[count],
      rec_shop_2:detailData.detailList[num + 1],
      detail_id: options.detail_id,
      imgalist: imglis
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (){
      //更新数据
      
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgalist // 需要预览的图片http链接列表  
    }) 
  },
  calling: function () {
    var that=this;
    wx.makePhoneCall({
      phoneNumber: this.data.detail_key.tell_number.toString(),
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  openLocation: function () {
    var demo = new QQMapWX({
      key: 'ONEBZ-YW6K4-6FCUW-DS72K-LYTTO-MWBP4'
    });
    var that=this;
    demo.geocoder({
      address: this.data.detail_key.address,
      success: function (res) {
          wx.openLocation({
            latitude:res.result.location.lat,
            longitude:res.result.location.lng,
            scale: 28
          })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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