<template>
  <div class="data-panel-wrapper">
    <div class="panel-info-wrapper">
      <p class="panel-info">
      Filling Wall: {{ this.willFillWall }}
      </p>
      <p class="panel-info">
      Allowed To Draw: {{ this.allowedToDraw }}
      </p>
      <p class="panel-info">
      Placing Start Node: {{ this.isPlacingStartNode }}
      </p>
      <p class="panel-info">
      Placing End Node: {{ this.isPlacingEndNode }}
      </p>
      <p class="panel-info">
      Is Mouse Down : {{ this.isMouseDown }}
      </p>
      <p class="panel-info">
      Shortest Path: {{ this.currentShortestDistance === Infinity ? "Doesn't exist" : this.currentShortestDistance }}
      </p>
      <p class="panel-info">
      highlightedShortestDistance: {{ this.highlightedShortestDistance === Infinity ? "Doesn't Exist" : this.highlightedShortestDistance }}
      </p>
    </div>
    <div class="button-panel-wrapper">
      <button @click="$emit('set-start-node')">
        Place Start Node
      </button>
      <button @click="$emit('set-end-node')">
        Place End Node
      </button>
      <button @click="$emit('reset-drawn-graph')">
        Clear Drawn Path
      </button>
      <button @click="$emit('run-dijkstra')">
        Visualize Djikstra's Algorithm.
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataPanel',
  props: {
    allowedToDraw: Boolean,
    willFillWall: Boolean,
    isPlacingStartNode: Boolean,
    isPlacingEndNode: Boolean,
    isMouseDown: Boolean,
    currentShortestDistance: Number,
    highlightedShortestDistance: Number,
  }
}
</script>

<style lang="scss" scoped>
  .button-panel-wrapper, .panel-info-wrapper {
    display: flex;
    flex-direction: column;
  }
</style>
