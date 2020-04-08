<template>
  <div id="home">
    <nav-bar class="navBarFromF">
      <span slot="center">购物街</span>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tabControlFromF tabControl1"
      @tabClick="tabClick"
      ref="TabControl2"
      v-show="isBackControl"
    />
    <scroll
      class="content"
      ref="scroll"
      @scroll="scrollDown"
      :probe-type="3"
      @pullintUp="loadMore"
    >
      <home-swiper :banners="banners" @backTop="backTop" />
      <home-recommend :recommends="recommends" />
      <fatrue-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tabControlFromF"
        @tabClick="tabClick"
        ref="TabControl1"
      />
      <goods-list :goodsData="goods[currentItem].list" class="goodsListFromF" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
import NavBar from "components/common/NavBar";
import HomeSwiper from "./HomeSwiper";
import HomeRecommend from "./HomeRecommend";
import FatrueView from "./FatrueView";
import GoodsList from "components/common/GoodsList";
import Scroll from "components/common/Scoll";
import BackTop from "components/content/BackTop";

import { debounce } from "common/debounce";

import TabControl from "./TabControl";

import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FatrueView,
    GoodsList,
    Scroll,
    BackTop,
    TabControl
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentItem: "pop",
      isShow: false,
      isShowHeight: 0,
      isBackControl: false,
      saveY: 0
    };
  },
  mounted() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    /****************************************************************/
    let refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("imgLoadNo", () => {
      refresh();
    });
  },
  methods: {
    /********************************************************************/
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
      });
      this.goods[type].page += 1;
      this.$refs.scroll.finishPullUp();
    },
    /********************************************************************/
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentItem = "pop";
          break;
        case 1:
          this.currentItem = "new";
          break;
        case 2:
          this.currentItem = "sell";
          break;
      }
      this.$refs.TabControl1.currentIndex = index;
      this.$refs.TabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(500);
    },
    scrollDown(position) {
      this.isShow = -position.y > 1000;
      this.isBackControl = -position.y > this.isShowHeight;
    },
    loadMore() {
      this.getHomeGoods(this.currentItem);
      this.$refs.scroll.refresh();
    },
    backTop() {
      this.isShowHeight = this.$refs.TabControl1.$el.offsetTop;
    }
    /******************* 防抖 ****************************************/
  },
  activated() {
    this.$refs.scroll.scrollToAfter(this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  position: relative;
  height: 100vh;
}
.navBarFromF {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 999;
}
.tabControlFromF {
  position: sticky;
  top: 44px;
  z-index: 999;
  background-color: #fff;
}
.goodsListFromF {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 5px;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
