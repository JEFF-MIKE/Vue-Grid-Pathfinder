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
    <p v-if="this.hasWeight">
      {{ this.weight }}
    </p>
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
    hasWeight: Boolean,
    weight: Number,
  },
}
</script>

<style lang="scss" scoped>
  @use "../global_style/colors" as c;
  .node{
    border: 2px solid black;
    width: 20px; height: 20px;
    background: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
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

    &:hover{
      border-color: c.$alternative-primary-text-color;
    }

    p {
      font-size: 12px;
    }
  }

  .isDrawn {
    background: blue;

    p {
      color: white;
    }
  }

  .startNode {
    background: green;

    &:hover{
      border-color: #234F1E; // Mahogany
    }
  }

  .endNode {
    background: red;

    &:hover{
      border-color: #900d09; // Mahogany
    }
  }

  .startNode.isDrawn, .endNode.isDrawn{
    border-color: orange;
  }

  .isDrawn.isBackTracked {
    background: yellow;

    p {
      color: black;
    }
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