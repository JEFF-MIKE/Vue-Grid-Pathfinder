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
      Highlighted Distance: {{ this.highlightedShortestDistance === Infinity ? "???" : this.highlightedShortestDistance }}
      </p>
    </div>
    <div class="button-panel-wrapper">
      <!-- 
        Should Introduce VueX and transform below buttons into
        a button component.
      -->
      <button 
        @click="$emit('set-start-node')"
        :class="{disabled: !this.allowedToDraw}"
        :enabled="this.allowedToDraw"
        >
        Place Start Node
      </button>
      <button 
        @click="$emit('set-end-node')"
        :class="{disabled: !this.allowedToDraw}"
        :enabled="this.allowedToDraw"
        >
        Place End Node
      </button>
      <button
        @click="$emit('path-fill')"
        :class="{disabled: !this.allowedToDraw}"
        :enabled="this.allowedToDraw">
        Fill With Path
      </button>
      <button
        @click="$emit('wall-fill')"
        :class="{disabled: !this.allowedToDraw}"
        :enabled="this.allowedToDraw">
        Fill With Wall
      </button>
      <button @click="$emit('run-dijkstra')">
        <!-- make this a computed property... -->
        {{ (this.hasDrawnAlgorithm)  ? "Re-run Algorithm" : ""}}
        {{ (!this.hasDrawnAlgorithm && this.allowedToDraw) ? "Run Dijkstra's Algorithm" : "" }}
        {{ (!this.hasDrawnAlgorithm && ! this.allowedToDraw) ? "Running..." : "" }}
      </button>
      <button 
        @click="$emit('reset-drawn-graph')"
        :class="{disabled: !this.hasDrawnAlgorithm}"
        :enabled="this.hasDrawnAlgorithm">
        Clear Drawn Path
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
    hasDrawnAlgorithm: Number,
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

    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
</style>
