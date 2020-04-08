<template>
  <div id="details">
    <details-nav-bar class="details-navbar" @moveTo="moveTo" />
    <scroll class="content" ref="scroll" @scrollPosition="scrollPosition">
      <details-swiper :topImages="topImages" />
      <details-goods-base-info :goods="goods" />
      <details-shop-info :shop="shop" />
      <details-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <details-params-info :paramInfo="paramsInfo" ref="params" />
      <details-comment :commentInfo="commentInfo" ref="comment" />
      <goods-list :goodsData="recommoned" class="goods-list" ref="goodsList" />
    </scroll>
    <details-button-bar />
    <!-- <back-top /> -->
  </div>
</template>

<script>
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/details";

import { debounce } from "common/debounce";

import DetailsNavBar from "./DetailsNavBar";
import DetailsSwiper from "./DetailsSwiper";
import DetailsGoodsBaseInfo from "./DetailsGoodsBaseInfo";
import DetailsShopInfo from "./DetailsShopInfo";
import Scroll from "components/common/Scoll";
import DetailsGoodsInfo from "./DetailsGoodsInfo";
import DetailsParamsInfo from "./DetailsParamsInfo";
import DetailsComment from "./DetailsComment";
import GoodsList from "components/common/GoodsList";
import DetailsButtonBar from './DetailsButtonBar';
import BackTop from "components/content/BackTop";


export default {
  name: "detail",
  components: {
    DetailsNavBar,
    DetailsSwiper,
    DetailsGoodsBaseInfo,
    DetailsShopInfo,
    Scroll,
    DetailsGoodsInfo,
    DetailsParamsInfo,
    DetailsComment,
    GoodsList,
    DetailsButtonBar,
    BackTop
  },
  data() {
    return {
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommoned: [],
      moveHeight: [],
      scroll:null
    };
  },
  methods: {
    scrollPosition(position) {
      this.scroll = position;
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      this.moveHeight = [];
      this.moveHeight.push(0);
      this.moveHeight.push(this.$refs.params.$el.offsetTop);
      this.moveHeight.push(this.$refs.comment.$el.offsetTop);
      this.moveHeight.push(this.$refs.goodsList.$el.offsetTop);
    },
    moveTo(index) {
      this.$refs.scroll.scrollToAfter(-this.moveHeight[index] + 44, 500);
    }
  },
  created() {
    getDetail(this.$route.params.iid).then(res => {
      console.log(res);
      let data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.paramsInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });
    getRecommend().then(res => {
      this.recommoned = res.data.list;
    });
  }
};
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
#details {
  height: 100vh;
  position: relative;
  z-index: 1000;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px  - 58px);
}
.details-navbar {
  position: relative;
  z-index: 1001;
  background-color: #fff;
}
</style>
