<template>
  <div class="detailsNavBar">
    <nav-bar>
      <div slot="left" class="detailsNavBarLeft"  @click="backClick">
        <img src="~assets/images/common/返回.png" alt="" />
      </div>
      <div slot="center" class="detailsNavBarInfo">
        <div
          v-for="(item, index) in titles"
          :key="item"
          class="detailsNavBarItem"
          @click="itemClick(index)"
          :class="{ active: currentIdnex === index }"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/NavBar";
export default {
  name: "detailsNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIdnex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIdnex = index;
    },
    backClick(){
        this.$router.go(-1);
    }
  }
};
</script>

<style scpoed>
.detailsNavBarInfo {
  padding: 0 10px;
  display: flex;
  justify-content: space-around;
}
.detailsNavBarItem {
  font-size: 13px;
}
.detailsNavBarLeft img {
  margin-top: 12px;
  width: 20px;
  height: 20px;
}
.active{
    color: orange;
}
</style>
