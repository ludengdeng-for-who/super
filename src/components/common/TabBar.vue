<template>
  <div class="tabBar">
    <div
      :class="{
        tabBarItem: true,
        iconfontActive: $route.path === tabDatas[index].path
      }"
      v-for="(item, index) in tabDatas"
      :key="index"
      @click="clickHandler(index)"
    >
      <div :class="item.iconClass"></div>
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabDatas: {
      type: Array,
      required: true
    },
    activeColor: {
      type: String,
      required: false,
      default: "orange"
    }
  },
  methods: {
    clickHandler(index) {
      this.$route.path !== this.tabDatas[index].path &&
        this.$router.push(this.tabDatas[index].path);
    }
  }
};
</script>

<style scpoed>
.tabBar {
  background-color: #f6f6f6;
  display: flex;
  height: 49px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, .2);
}
.tabBarItem {
  flex: 1;
  text-align: center;
}
.iconfont {
  font-size: 20px;
  margin:4px 0 0 4px;
}
.iconfontActive {
  color: orange;
}
</style>
