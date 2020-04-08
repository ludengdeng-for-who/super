<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScoll from "better-scroll";
export default {
  name: "scoll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScoll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    //监听滚动的位置
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position) || this.$emit("scrollPosition", position);
    });
    //监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullintUp");
    });
  },
  methods: {
    scrollTo(time = 300) {
      this.scroll.scrollTo(0, 0, time);
    },
    scrollToAfter(y, time) {
      this.scroll.scrollTo(0, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll.refresh();
    }
  }
};
</script>

<style scoped></style>
