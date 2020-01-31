<template>
  <div class="tabControl">
    <div
      v-for="(item, index) in titles"
      :key="item"
      class="tabControlItem"
      :class="{ active: index === currentIndex }"
    >
      <div @click="itemClick(index)">
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index);
    }
  }
};
</script>

<style>
.tabControl {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
}
.tabControlItem {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.active span {
  padding: 5px;
  border-bottom: 3px solid var(--color-tint);
}
</style>
