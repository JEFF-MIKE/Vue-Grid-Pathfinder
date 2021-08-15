<template>
  <div
    draggable="false"
    @mousedown="$emit('mouse-down', rowIndex, colIndex)"
    @mouseenter="$emit('mouse-enter', rowIndex, colIndex)"
    @mouseup="$emit('mouse-up')"
    @mouseleave="$emit('mouse-leave', rowIndex, colIndex)"
    class="node"
    :class="{startNode: isStart, endNode: isEnd, isDrawn: isDrawn, isWall: isWall, isBackTracked: isBackTracked}"
  >
  </div>
</template>

<script>
export default {
  name: 'Node',
  props: {
    rowIndex: Number,
    colIndex: Number,
    isStart: Boolean,
    isEnd: Boolean,
    isVisited: Boolean,
    isDrawn: Boolean,
    distance: Number,
    isWall: Boolean,
    isBackTracked: Boolean,
  },
}
</script>

<style lang="scss" scoped>
  @use "../global_style/colors" as c;
  .node{
    border: 2px solid black;
    width: 20px; height: 20px;
    background: #FFFFFF;
    /* Below prevents annoying dragging behaviours when drawing.*/
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    user-select: none;

    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    -ms-user-drag: none;
    user-drag: none;
  }

  .isDrawn {
    background: blue;
  }

  .startNode {
    background: green;
  }

  .endNode {
    background: red;
  }

  .startNode.isDrawn, .endNode.isDrawn{
    border-color: orange;
  }

  .isDrawn.isBackTracked {
    background: yellow;
  }

  .startNode.isDrawn.isDrawn.isBackTracked {
    border-color: green;
  }

  .endNode.isDrawn.isBackTracked {
    border-color: red;
  }

  .isWall{
    background: gray;;
  }

  @media screen and (max-width: 600px) {
    .node {
      width: 16px; height: 16px;
      border: 1px solid black;
    }
  }
</style>