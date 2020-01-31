<template>
  <div class="navBar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "navBar"
};
</script>

<style>
.navBar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
}
.left,
.right {
  width: 60px;
}
.center {
  flex: 1;
}
</style>
