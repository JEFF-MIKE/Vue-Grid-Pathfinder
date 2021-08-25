<template>
    <div class="button-panel-wrapper">
      <!-- 
        Should Introduce VueX and transform below buttons into
        a button component.
      -->
      <button 
        @click="this.emitter.emit('set-start-node')"
        :class="{disabled: !this.allowedToDraw}"
        :disabled="!this.allowedToDraw"
        >
        {{ this.drawingMode === "Start Node" ? "Cancel Placing Start Node" : "Place Start Node" }}
      </button>
      <button 
        @click="this.emitter.emit('set-end-node')"
        :class="{disabled: !this.allowedToDraw}"
        :disabled="!this.allowedToDraw"
        >
        {{ this.drawingMode ==="End Node" ? "Cancel Placing End Node" : "Place End Node" }}
      </button>
      <button 
        @click="this.emitter.emit('set-weight-nodes')"
        :class="{disabled: !this.allowedToDraw}"
        :disabled="!this.allowedToDraw"
        >
        {{ this.drawingMode === "Weights" ? "Place Walls" : "Place Weights" }}
      </button>
      <button 
        @click="this.emitter.emit('reset-weights')"
        :class="{disabled: !this.allowedToDraw}"
        :disabled="!this.allowedToDraw"
        >
        Reset Weights
      </button>
      <button
        @click="this.emitter.emit('path-fill', false)"
        :class="{disabled: !this.allowedToDraw}"
        :disabled="!this.allowedToDraw">
        Fill With Path
      </button>
      <button
        @click="this.emitter.emit('wall-fill')"
        :class="{disabled: !this.allowedToDraw}"
        :disabled="!this.allowedToDraw">
        Fill With Wall
      </button>
      <button @click="this.emitter.emit('run-dijkstra')">
        <!-- make this a computed property... -->
        {{ (this.hasDrawnAlgorithm)  ? "Re-run Algorithm" : ""}}
        {{ (!this.hasDrawnAlgorithm && this.allowedToDraw) ? "Run Dijkstra's Algorithm" : "" }}
        {{ (!this.hasDrawnAlgorithm && !this.allowedToDraw) ? "Running..." : "" }}
      </button>
      <button 
        @click="this.emitter.emit('reset-drawn-graph')"
        :class="{disabled: !this.hasDrawnAlgorithm}"
        :disabled="!this.hasDrawnAlgorithm">
        Clear Drawn Path
      </button>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default ({
  name: "ButtonPanel",
  computed: {
    ...mapState(['allowedToDraw', 'hasDrawnAlgorithm']),
    ...mapGetters(['drawingMode']),
  }
});
</script>

<style lang="scss" scoped>
  @use "../global_style/colors" as c;

  .button-panel-wrapper {
    height: 305px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  .button-panel-wrapper{
    background: c.$secondary-color;
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

  .disabled {
    text-decoration: line-through;
    cursor: not-allowed;
  }

  @media screen and (max-width: 850px) {
    .button-panel-wrapper{
      height: 250px;
      padding: 15px 20px;
    }
  }

  @media screen and (max-width: 600px){
    button {
      font-size: 10px;
      width: 150px;
    }
  }
</style>