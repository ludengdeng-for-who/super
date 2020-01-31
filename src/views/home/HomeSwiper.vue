<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.title">
        <a href="">
          <img :src="item.image" alt="" @load="load" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: ["banners"],
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    load() {
      if (!this.isLoad) {
        this.$emit("backTop");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style></style>
