<template>
  <div class="data-panel-wrapper">
    <div class="panel-info-wrapper">
      <p class="panel-info">
      Filling Style: {{ this.willFillWall ? "Wall" : "Path" }}
      </p>
      <p class="panel-info">
      Allowed To Draw: {{ this.allowedToDraw ? "Yes" : "No" }}
      </p>
      <p class="panel-info">
      Placing Start Node: {{ this.isPlacingStartNode ? "Yes" : "No" }}
      </p>
      <p class="panel-info">
      Placing End Node: {{ this.isPlacingEndNode ? "Yes" : "No" }}
      </p>
      <p class="panel-info">
      Drawing: {{ this.isMouseDown ? "Yes" : "No" }}
      </p>
      <p class="panel-info">
      Shortest Path: {{ this.currentShortestDistance === Infinity ? "???" : this.currentShortestDistance }}
      </p>
      <p class="panel-info">
      highlight Distance: {{ this.highlightedShortestDistance === Infinity ? "???" : this.highlightedShortestDistance }}
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
        Visualize Djikstra's Algorithm
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
  @use "../global_style/colors" as c;

  .data-panel-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: c.$primary-color;
    width: 250px;
  }

  .button-panel-wrapper, .panel-info-wrapper {
    height: 305px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  .button-panel-wrapper{
    background: c.$secondary-color;
  }

  p {
    width: 200px;
    margin: 8px 0;
    text-align: start;
    color: c.$primary-text-color;
  }

  button {
    background: c.$button-color;
    color: c.$button-font-color;
    width: 200px;
    padding: 8px 4px;
    cursor: pointer;
    border: none;
    font-size: 13px;
  }
</style>
