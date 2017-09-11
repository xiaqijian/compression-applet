//index.js
//获取应用实例
var app = getApp();
var postData = require('../../data/index-data.js');
var QQMapWX = require('../../qqmap-wx-jssdk.js');
var demo;

Page({
  data: {
    posts_key:{},
    lunbo_img:[
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    addressdata:{},
    page:10,
    moretext:true,
    scrollTop: 0,
    floorstatus: false,
    scrollTop: 0,

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    var demo = new QQMapWX({
      key: 'ONEBZ-YW6K4-6FCUW-DS72K-LYTTO-MWBP4'
    });
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(){
      //更新数据
      that.setData({
        posts_key: postData.postList.slice(0,10),
        lunbo_img: postData.lunbo_img
      })
    }),
      wx.getLocation({
        type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
        success: function (res) {
          console.log(res);
          demo.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function (res) {
              that.setData({
                addressdata: res.result.address
              })
            },
            fail: function (res) {
              console.log(res);
            },
            complete: function (res) {
              console.log(res);
            }
          });
          console.log(this.data.latitude)
          var setdata = {
            latitude: res.latitude,
            longitude: res.longitude
          }
          that.setData({
            'addressdata':setdata
          });
        }
      }),
      
    demo.reverseGeocoder({
      location: {
        latitude: this.data.addressdata.latitude,
        longitude: this.data.addressdata.longitude,
      },
      success: function (res) {
       that.setData({
         addressdata:res.result.address
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
  getMore: function () {
    var that =this;
    this.data.page = this.data.page+10
    wx.stopPullDownRefresh();
    that.setData({
    posts_key: postData.postList.slice(0, this.data.page),
    });
    if (this.data.posts_key.length === postData.postList.length){
      that.setData({
        moretext: false
      })
    }
  },
   goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  },
   scroll: function (e, res) {
     // 容器滚动时将此时的滚动距离赋值给 this.data.scrollTop
     if (e.detail.scrollTop > 500) {
       this.setData({
         floorstatus: true
       });
     } else {
       this.setData({
         floorstatus: false
       });
     }
   }
   
  
})

