<template>
  <div class="node"></div>
</template>

<script>
export default {
  name: 'Node',
  props: {
    rowIndex: Number,
    colIndex: Number,
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .node{
    border: 2px solid black;
    width: 20px; height: 20px;
  }
</style>