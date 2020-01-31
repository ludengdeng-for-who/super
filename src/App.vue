<template>
  <div id="app">
    <!-- 排除的是根据组件的name属性 -->
    <keep-alive exclude="detail">
      <router-view />
    </keep-alive>
    <tab-bar :tabDatas="tabDatas" class="tab" />
  </div>
</template>

<script>
import TabBar from "components/common/TabBar";
export default {
  name: "app",
  components: {
    TabBar
  },
  data() {
    return {
      tabDatas: [
        { title: "首页", iconClass: "iconfont icon-shouye", path: "/home" },
        {
          title: "购物车",
          iconClass: "iconfont icon-gouwucheman",
          path: "/gouwuche"
        },
        { title: "商品", iconClass: "iconfont icon-shangpin", path: "/goods" },
        { title: "我的", iconClass: "iconfont icon-tubiao-", path: "/about" }
      ]
    };
  }
};
</script>

<style>
@import "assets/css/base.css";
.tab {
  z-index: 999;
}
</style>
