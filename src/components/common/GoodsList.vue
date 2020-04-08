<template>
  <div>
    <goods-list-item
      v-for="item in goodsData"
      :key="item.page"
      :itemData="item"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "goodsList",
  props: {
    goodsData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  },
  
};
</script>

<style></style>
