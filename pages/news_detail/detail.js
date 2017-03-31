Page({
  data: {
    art: {},
  },
  onReady () {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  onLoad (options) {
    var that = this;
    var WxParse = require('../../wxParse/wxParse.js');
    console.log("id:"+options.id);
    wx.request({
      url: 'https://i.jandan.net/?oxwlxojflwblxbsapi=get_post&include=content,title&id=' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
        if (res.data.post.content) {
          var body = res.data.post.content;
          body = body.match( /<p>.*?<\/p>/g );
          var ss = [];
          if (body) {
            for( var i = 0, len = body.length; i < len;i++ ) {
              ss[ i ] = /<img.*?>/.test( body[ i ] );
              if( ss[ i ] ) {
                body[ i ] = body[ i ].match( /(http:|https:).*?\.(jpg|jpeg|gif|png)/ );
              } else {
                body[ i ] = body[ i ].replace( /<p>/g, '' )
                .replace( /<\/p>/g, '' )
                .replace( /<strong>/g, '' )
                .replace( /<\/strong>/g, '' )
                .replace( /<a.*?\/a>/g, '' )
                .replace( /&nbsp;/g, ' ' )
                .replace( /&ldquo;/g, '"' )
                .replace( /&rdquo;/g, '"' );
              }
            }
          }
          res.data.post.content = body
        }
       that.setData({
         title: res.data.post.title,
         content: res.data.post.content,
         image: res.data.post.custom_fields
         //WxParse.wxParse('content', 'html', res.data.post.content, that, 5)
       })
      }
    })
  }
})
