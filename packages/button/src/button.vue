<template>
  <button class="yun-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'YunButton'
}
</script>

<style scoped lang="scss">
.yun-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  outline: none;
}
</style>
