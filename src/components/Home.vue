<template>
  <div @click="searchingShow = false; hotShow =false">
    <div class="header">
      <div class="Nav-menu">
        <div class="left">
          <a href="/" class="logo"></a>
          <a href="/" class="home a">首页</a>
          <a href="/" class="discovery a">发现</a>
        </div>
        <div class="center">
          <div class="SelectOption">
            <div class="line" @click.stop="searchingShow = !searchingShow;hotShow =false">
              <div class="text">采集</div>
              <i class="ic-arrow-down"></i>
            </div>
            <div class="searching-menu" v-show="searchingShow">
              <div class="searching-menu-item">采集</div>
              <div class="searching-menu-item">画板</div>
              <div class="searching-menu-item">用户</div>
              <div class="searching-menu-item">我的采集</div>
              <div class="searching-menu-item">我的画板</div>
            </div>
            <div class="hot-menu" v-show="hotShow">
              <div class="title">
                <span>最近搜索</span>
                <span class="clear" @click="clear">清空</span>
              </div>
              <ul class="hot">
                <li v-for="(item, index) in histroylist" :key="index">
                  <a href="/">{{ item }}</a>
                </li>
              </ul>
            </div>
            <input
              type="text"
              placeholder="搜索你喜欢的"
              @click.stop="focus"
              v-model="histroy"
              @keyup.enter="enter"
            />
            <a
              href="/"
              class="search"
              @click.stop="search"
              v-show="!histroy"
            ></a>
            <div class="icon" @click.stop="histroy = ''" v-show="histroy">
              &#xe628;
            </div>
          </div>
        </div>
        <div class="right">
          <div class="new">
            <a href="/">花瓣好课</a>
            <div class="newtext">NEW</div>
          </div>
          <a
            href="/"
            class="newicon icon1"
            @mouseover="isShow"
            @mouseout="isShow"
          >
            <div class="nav-link" v-show="navlinkShow">
              <ul class="top-link">
                <li
                  class="link-item"
                  v-for="(item, index) in navLink"
                  :key="index"
                >
                  <div
                    class="icon"
                    :style="{ backgroundPositionY: -90 * index + 'px' }"
                  ></div>
                  <p class="name">{{ item.name }}</p>
                  <p class="title">{{ item.title }}</p>
                </li>
              </ul>
              <ul class="bottom-link">
                <li class="link-item">移动客户端</li>
                <li class="link-item">浏览器采集工具</li>
                <li class="link-item">关于</li>
                <li class="link-item">帮助中心</li>
                <li class="link-item">用户反馈</li>
              </ul>
            </div>
          </a>

          <a href="/" class="newicon icon2"></a>
          <a href="/" class="newicon avatar">
            <div class="a">
              <div class="i">298</div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="page">
      <div class="wrapper" ref="wrapper">
        <div class="context"  v-if="listdata.length > 0" ref="imgs">
          <div class="column userdata">
            
              <div class="top">
                <img src="../assets/avatar.jpg" alt="">
                <h1>哔了个汪汪</h1>
                <span></span>
              </div>
              <div class="center">
                <div class="box">
                  <p class="count">2</p>
                  <p class="title">采集</p>
                </div>
                <div class="box">
                   <p class="count">2</p>
                  <p class="title">花板</p>
                </div>
                <div class="box">
                   <p class="count">2</p>
                  <p class="title">粉丝</p>
                </div>
              </div>
              <div class="bottom"></div>
            
          </div>
          <div class="column"  v-for="(item, index) in listdata" :key="index" ref="imgs"
          :class="{'current': index+1 === currentCard }" @mouseover="cardmouseover(index)" @mouseout="cardmouseout(index)">
            
              <!-- <a
                
                :href="item.link"
                class="img"
                :style="{ backgroundImage: 'url(' + item.imgUrl + ')' }"
                >111</a
              > -->
              <div class="hideen" :style= "{display : 'none'}" ref="left">
                <div class="left">
                  <span class="text">采集</span>
                  <span class="icon">
                    <img src="../assets/icon-quick.svg" alt="">
                  </span>
                </div>
              </div>
              <a :href="item.link" class="img">
                <img v-lazy="item.imgUrl " alt="" >
              </a>
              <p class="text"  :data-text ="item.text" :style="{display: 'block'}" ref="text" >
                {{setText(item.text)}}
                
                <a class="more" @click="moreText(index)">{{ellipsis(item.text)}}</a>
              </p>
              <p class="textmore" :style="{display: 'none'}" ref="textmore">{{item.text}}</p>
              <div class="stats">
                <span class="repin" v-if="item.repin_count > 0">
                  <i class="repin-icon"></i>
                  {{item.repin_count}}
                </span>
                <span class="like" v-if="item.like_count > 0">
                  <i class="like-icon"></i>
                  {{item.like_count}}
                </span>
              </div>
              <div class="author">
                <img :src="item.avatar" alt="" width="34" height="34">
                <div class="text">
                  <a href="">{{item.username}}</a>
                  <span>采集于</span>
                  <p>{{item.title}}</p>
                </div>
                <div class="btn">{{setcount(item.pin_count)}}</div>
              </div>
            
          </div>
        </div>
      </div>
    </div>
    <div id="elevator_box" class="elevator-box">
      <div class="go-top" v-show="goTopBtn" @click="goTop">
        <i class="ic-arrow-down"></i>
      </div>
      <div class="help"></div>
      <div class="plus"></div>
       </div>
  </div>
</template>

<script>
import axios from 'axios'





export default {
  data() {
    return {
      searchingShow: false,
      hotShow: false,
      histroy: "",
      histroylist: [],
      navlinkShow: false,
      Mout: true,
      textmini: true,
      text: false,
      currentCard: -1,
      cardTop: 0,
      goTopBtn:false,
      navLink: [
        {
          name: "设计大赛",
          title: "暂无进行中的比赛",
        },
        {
          name: "花瓣Pro",
          title: "花瓣本地客户端",
        },
        {
          name: "花瓣美思",
          title: "设计师对接平台",
        },
        {
          name: "花瓣好课",
          title: "优选设计好课",
        },
      ],
      listdata: []
    };
  },
  updated() {
    // setTimeout(() => {
    //     console.log(this.$refs.imgs[0])
    // })

    
    
  },
  mounted() {
    window.addEventListener('scroll',this.scrollTo)
   setTimeout( () => {
     this.waterFall()
   },500)
  
    
    this.histroylist =
      JSON.parse(window.localStorage.getItem("searchRecentWords")) || [];
  },
  created() {
     class Card{
  constructor(pins) {
    this.imgUrl =  `//hbimg.huabanimg.com/${pins.file.key}_/fw/480/format/webp` || ''
    this.link = pins.link
    this.avatar=  `//hbimg.huabanimg.com/${pins.user.avatar.key}_sq75sf/format/webp` || ''
    this.text = pins.raw_text 
    this.repin_count = pins.repin_count
    this.like_count= pins.like_count
    this.username = pins.user.username || ''
    this.title = pins.board.title
    this.pin_count = pins.board.pin_count 
  }
}
    axios.get('http://localhost:4000/api/card').then((res) => {
      res.data.forEach(item => {
        this.listdata.push(new Card(item))
      }); 
        console.log(this.listdata);
    })
  },
  computed: {
   
  },

  methods: {
    scrollTo() {
      let scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrolltop = scrolltop
      if(scrolltop > 60) {
        this.goTopBtn = true
      }else{
        this.goTopBtn =false
      }

    },
    goTop() {
      let timer = setInterval(() => {
        let speed = Math.floor(-this.scrolltop/5)
        document.documentElement.scrollTop  = this.scrolltop + speed
      
        if(this.scrolltop === 0) {
          clearInterval(timer)
        }
      }, 20);
    },
    setcount(num) {
       return num >= 1e3 && num < 1e4 ? (num / 1e3).toFixed(1) + 'k' : num >= 1e4 ? (num / 1e4).toFixed(1) + 'w' : num
    },
    cardmouseover(index) {
      index = index +1
      this.currentCard = index
      
      this.cardTop = this.$refs.imgs.children[index].style.top.substring(0,this.$refs.imgs.children[index].style.top.length-2)
    this.$refs.imgs.children[index].style.top= this.$refs.imgs.children[index].style.top.substring(0,this.$refs.imgs.children[index].style.top.length-2)  - 3 + 'px'
    this.$refs.imgs.children[index].children[0].style.display = 'block'
    
    this.$refs.imgs.children[index].children[1].style.opacity = '0.85'
    
    },
    cardmouseout(index) {
      index = index +1
     this.currentCard = -1
     this.$refs.imgs.children[index].style.top= this.cardTop + 'px'
     this.$refs.imgs.children[index].children[0].style.display = 'none'
     this.$refs.imgs.children[index].children[1].style.opacity = '1'
    },
    waterFall() {
          let gap = 14
      let cards = this.$refs.imgs.children
        // let pageclientWidth= this.$refs.wrapper.clientWidth
      
        let itemWidth = 280
        let columns = 6
        // let columns= parseInt(pageclientWidth / (itemWidth + gap))
        console.log(columns);
        let arr = []
        
        for (let i = 0; i < cards.length; i++) {
          if(i < columns) {
            this.$refs.imgs.children[i].style.top = 0
            // cards[i].style.top= 0 
            this.$refs.imgs.children[i].style.left = (itemWidth + gap) * i + 'px'
            arr.push(this.$refs.imgs.children[i].offsetHeight)
            console.log(arr);
          }else{
            let minHeight = arr[0]
            let index = 0
            for (let j = 0; j < arr.length; j++) {
              if(minHeight > arr[j] ) {
                minHeight  =arr[j]
                index = j
              }
              
            }
           
            this.$refs.imgs.children[i].style.top = arr[index] + gap + 'px'
            this.$refs.imgs.children[i].style.left = this.$refs.imgs.children[index].offsetLeft + 'px'
            arr[index] = arr[index] + this.$refs.imgs.children[i].offsetHeight + gap
          }
          
        
    }
    },
    ellipsis(text) {
      if(text.length < 55 ) {
        return ''
      }
      return '...'
    },
    moreText(e) {
      
      console.log(this.$refs.text[e].innerText); 
     
      //  this.$refs.text[e].innerText= this.$refs.text[e].dataset.text
    this.$refs.text[e].style.display = 'none',
       this.$refs.textmore[e].style.display = 'block'
       this.$forceUpdate()
    },

    setText(s) {
     
      if(s.length> 55){
        return s.substring(0,40)
      }
      else {
        return s
      }
   },
    isShow() {
   
        this.navlinkShow =!this.navlinkShow

     
      
    },

    focus() {
 
      console.log(this.histroylist);

      if (this.histroy || !this.histroylist.length) {
        this.hotShow = false ;
        return;
      }
      this.searchingShow =false
      this.hotShow = !this.hotShow;
    },
    search() {
      console.log(this.histroylist);
      let word = this.histroy.trim();
      if (word.match(/^[ ]*$/)) {
        return;
      }
      if (this.histroylist.indexOf(word) < 0) {
        this.histroylist.unshift(word);
      }
      if (this.histroylist > 20) {
        this.histroylist.pop();
      }
      window.localStorage.setItem(
        "searchRecentWords",
        JSON.stringify(this.histroylist)
      );

      //  JSON.parse(window.localStorage.getItem('searchRecentWords')).push(this.histroy)
    },
    clear() {
      this.hotShow = false;
      window.localStorage.removeItem("searchRecentWords");
      this.histroylist = [];
    },
    enter() {
      if (!this.histroy) {
        return;
      }
      this.search();
      location.reload();
    },
      
  },
  watch: {
    histroy(val) {
      if (val) {
        this.hotShow = false;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background-color: #fff;
  z-index: 1000;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
}

.Nav-menu {
  padding: 0 10%;
  display: flex;
  align-items: center;
  text-align: center;
  height: 100%;

  .left {
    flex: 0 0 240px;
    display: flex;
    align-items: center;
    min-width: 240px;

    .logo {
      display: inline-block;
      background: url('../assets/logo.svg');
      width: 80px;
      height: 28px;
      margin-right: 25px;
    }

    .a {
      margin-right: 20px;

      &.home {
        color: #c90000;
      }

      &.discovery {
        color: #444;

        &:hover {
          color: #c90000;
        }
      }
    }
  }

  .center {
    flex: 1;
    height: 100%;
    padding: 5px 0;
    position: relative;

    .SelectOption {
      border: 1px solid #ddd;
      border-radius: 2px;
      height: 100%;
      display: flex;
      background-color: #fafafa;
      align-items: center;
      position: relative;

      .searching-menu {
        position: absolute;
        left: 0;
        top: 38px;
        width: 200px;
        padding: 15px 0;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.07), 0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 0 0 1px rgba(0, 0, 0, 0.05);

        .searching-menu-item {
          padding: 10px 15px;
          text-align: left;
          cursor: pointer;

          &:hover {
            background-color: #f7f7f7;
          }

          &:first-child {
            background-color: #f7f7f7;
          }
        }
      }

      .hot-menu {
        position: absolute;
        left: 0;
        top: 38px;
        width: 850px;
        max-height: 150px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.07), 0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 0 0 1px rgba(0, 0, 0, 0.05);

        .title {
          margin: 20px 10px;
          position: relative;
          height: 20px;

          span {
            color: #999;
            position: absolute;
            left: 10px;
          }

          .clear {
            display: block;
            position: absolute;
            right: 15px;
            text-align: right;
            color: #9e7e6b;
            cursor: pointer;
          }
        }

        .hot {
          margin: 0px 16px 4px 16px;
          max-height: 70px;
          overflow: hidden;

          li {
            padding: 5px 8px;
            margin-right: 10px;
            margin-bottom: 10px;
            float: left;
            border-radius: 2px;
            background-color: #f7f7f7;
            border: 1px solid #ddd;
            font-size: 14px;
          }
        }
      }

      .line {
        padding: 8px 10px;
        min-width: 76px;
        height: 100%;

        .text {
          display: inline-block;
        }

        .ic-arrow-down {
          background: url('../assets/ic-arrow-down.svg');
          width: 12px;
          height: 12px;
          display: inline-block;
          margin-left: 8px;
        }
      }

      input {
        flex: 1;
        background-color: #fafafa;
        outline-style: none;
      }

      .search {
        background: url('../assets/menu_sprite.svg') 5px -93px no-repeat;
        width: 32px;
        height: 32px;
        cursor: pointer;
      }

      .icon {
        position: relative;
        left: -4px;
        font-size: 18px;
        font-style: normal;
        cursor: pointer;
        font-family: 'iconfont' !important;
        color: #ccc;

        &:hover {
          color: #424242;
        }
      }
    }
  }

  .right {
    flex: 0 0 300px;
    display: flex;
    align-items: center;
    margin-left: 30px;

    .new {
      flex: 2.4;
      background-color: #f0f0f0;
      border-radius: 3px;
      height: 30px;
      position: relative;

      a {
        position: absolute;
        left: 0;
        line-height: 30px;
        color: red;
      }

      .newtext {
        position: absolute;
        right: 5px;
        top: 5px;
        color: #fff;
        line-height: 18px;
        border-radius: 3px;
        font-size: 10px;
        background-color: #ffb449;
        width: 50px;
        height: 18px;
      }
    }

    .newicon {
      flex: 1;
      border-right: 1px solid #ccc;

      &.icon1 {
        background: url('../assets/menu_sprite.svg') -45px -830px no-repeat;
        width: 46px;
        height: 48px;
        position: relative;

        &:hover {
          background-color: #000;
        }
      }

      .nav-link {
        transition: all 11s linear 5s;
        position: absolute;
        top: 48px;
        width: 300px;
        right: 0;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.07), 0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 0 0 1px rgba(0, 0, 0, 0.05);

        .top-link {
          padding: 10px;

          .link-item {
            padding-top: 15px;
            padding-bottom: 10px;
            display: inline-block;
            width: 140px;
            height: 150px;
            vertical-align: middle;

            &:hover {
              border: 1px solid #ccc;
            }

            .icon {
              background: url('../assets/icon_nav_links.svg') no-repeat;
              width: 70px;
              height: 70px;
              text-align: center;
              display: inline-block;
            }

            .name {
              font-size: 16px;
              line-height: 35px;
              color: #191919;
            }

            .title {
              color: #191919;
              font-size: 13px;
              line-height: 30px;
            }
          }
        }

        .bottom-link {
          border-top: 1px solid #cccccc;
          margin: 10px 10px;
          padding: 10px 10px 0;
          height: 80px;
          text-align: center;
          display: inline-block;

          .link-item {
            display: inline-block;
            margin: 10px 10px;
            font-size: 15px;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }

      &.icon2 {
        background: url('../assets/menu_sprite.svg') 20px -187px no-repeat;
        width: 46px;
        height: 48px;

        &:hover {
          background-color: #000;
        }
      }

      &.avatar {
        height: 48px;
        position: relative;

        .a {
          position: absolute;
          background-color: #ccc;
          width: 34px;
          height: 34px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: url('../assets/avatar.jpg');
          background-size: contain;

          .i {
            position: absolute;
            background-color: red;
            color: #fff;
            font-size: 2px;
            right: -5px;
            top: -5px;
            padding: 2px;
            border-radius: 3px;
          }
        }
      }
    }
  }
}

.page 
  width: 100%;
  background-color: #ccc;

  .wrapper 
    width: 100%

    .context 
      width 80%
      margin: 0 auto;
      position: relative;
      left  5%

      .column 
        transition: all .15s ease-in-out,box-shadow .15s ease-in-out
        position: absolute;
        background-color: #fff;
        overflow: hidden;
        width: 280px;
        border-radius 5px
        box-shadow: 0 1px 3px rgba(0,0,0,.02), 0 4px 8px rgba(0,0,0,.02)
        &.current
          
          box-shadow: 0 1px 8px rgba(0,0,0,.04), 0 4px 25px rgba(0,0,0,.03),
          0 10px 40px rgba(0,0,0,.1)
        &.userdata
          height 200px
          .top
            margin 16px
            display flex
            align-items center
            img 
              
              width 70px
              height 70px
              border-radius 3px
              border 1px solid #f5f5f5
              
              margin-right  auto
            h1
              flex 1
              display inline-block
              font-size 19px
              font-weight bold
            span
              flex 0.2
          .center
            display flex
            padding-top 10px
            .box
              flex 1
              .title
                margin-top 10px
                font-size 14px
                color #999
              .count
                font-weight 700
              
            
              
          
        .hideen
          position absolute
          top 5px
          left  5px
          color #fff
          z-index 100
          .left 
            width 90px
            height 40px
            display flex
            border-radius 3px
            background #ec414d
            align-items center
            cursor pointer
            .text
              flex 1
              text-align center
              display inline-block
              font-size 16px
              line-height 40px
              border-top-left-radius 3px
              border-bottom-left-radius 3px
              &:hover
                background #c82323
            .icon
              flex 0.5
              border-left: 1px solid #c73841
              line-height 40px
              background #ec414d
              border-top-right-radius 3px
              border-bottom-right-radius 3px
              &:hover
                background #c82323
              img 
                height 14px
                width 14px
            
                
              
        .img
          background-color #fff
          display block
          
          
          width: 280px;
          img
            width: 280px;

        .textmore
          padding 0 16px
          margin 10px 0
        
          line-height 1.3em
          text-align left 
          font-size 14px
      
        .text
          padding 0 16px
          margin 10px 0
          word-wrap: break-word
          line-height 1.3em
          text-align left 
          font-size 14px
          overflow hidden
          a
            font-size 15px
            color #000
            cursor pointer
            &:hover
              text-decoration underline
        .stats
          text-align left 
          padding 0 15px
          margin 10px 0
          
          .repin
            display inline-block
            margin-right 10px
            font-size 12px
            
            .repin-icon
              background url('../assets/bt.icon.svg') 
              width 12px
              height 12px
              background-position -30px 0
              display inline-block
              vertical-align bottom 
              
          .like
            display inline-block
            margin-right 10px
            font-size 12px
            .like-icon
              background url('../assets/bt.icon.svg') 
              width 12px
              height 12px
              background-position 0 0
              display inline-block
              vertical-align bottom 
        .author
          border-top 1px solid #f5f5f5
          padding 0 12px
          height 60px
          display flex
          align-items center
          img 
            border-radius 50%
            display block
          .text
            font-size 14px
            a
              color: #9e7e6b
              margin-right 5px
            p
              margin-top 5px
              color: #9e7e6b
            span 
              color #999
          .btn
            font-size 14px
            color: #9e7e6b
            border: 1px solid #e6e6e6
            height 24px
            line-height 24px
            padding 0 5px
            margin-left: auto
            cursor pointer
            &:hover
              background-color #eee
              color #3a3a3a
.elevator-box
  position fixed
  right 15px
  bottom 10px
  div
    display: block;
    margin-bottom: 5px;
    width: 50px;
    height: 46px;
    border-radius: 2px;
    background: url('../assets/ic-arrow-down.svg') 12px 10px no-repeat;
    background-color: #444;
    background-color: rgba(0,0,0,.6);
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
   


  
</style>