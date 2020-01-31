<template>
  <div id="details">
    <details-nav-bar />
    <details-swiper :topImages="topImages" />
  </div>
</template>

<script>
import DetailsNavBar from "./DetailsNavBar";
import { getDetail } from "network/details";
import DetailsSwiper from "./DetailsSwiper";
export default {
  name: "detail",
  components: {
    DetailsNavBar,
    DetailsSwiper
  },
  data() {
    return {
      topImages: []
    };
  },
  created() {
    getDetail(this.$route.params.iid).then(res => {
      console.log(res);
      this.topImages = res.result.itemInfo.topImages;
    });
  }
};
</script>

<style scpoed></style>
