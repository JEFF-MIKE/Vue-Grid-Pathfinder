<template>
  <button @click="runDijkstra()">
    Visualize Djikstra's Algorithm.
  </button>
    <div 
      id="grid"
      @mouseleave="setMouseUp()">
      <div
        class="row"
        :key="rowIndex" 
        v-for="(row, rowIndex) in grid">
          <Node
            @mouse-down="setMouseDown(rowIndex, colIndex)"
            @mouse-enter="mouseEnteredNode(rowIndex, colIndex)"
            @mouse-up="setMouseUp()"
            v-for="(node, colIndex) in row"
            :key="((node.row+1) * (node.col+1))"
            :rowIndex="rowIndex"
            :colIndex="colIndex"
            :isStart="node.isStart"
            :isEnd="node.isEnd"
            :isVisited="node.isVisited"
            :isDrawn="node.isDrawn"
            :distance="node.distance"
            :isWall="node.isWall"
          />
      </div>
    </div>
    <p>
      Drawing Wall: {{ this.willFillWall }}
    </p>
    <p>
      Allowed To Draw: {{ this.allowedToDraw }}
    </p>
</template>

<script>
import Node from "./Node.vue"
import { dijkstra } from "../algorithms/dijkstra";

export default {
    name: "PathfinderGrid",
    components: {
      Node
    },
    data(){
      return {
        grid: [],
        rowCount: 25,
        colCount: 25,
        startNodeRow: 10,
        startNodeCol: 5,
        endNodeRow: 10,
        endNodeCol: 20,
        hasStartNode: true,
        hasEndNode: true,
        startNodeReference: null,
        endNodeReference: null,
        hasDrawnGrid: false,
        isMouseDown: false,
        willFillWall: false,
        allowedToDraw: true,
      }
    },
    methods: {
      generateInitialGrid() {
        const tempGrid = [];
        for (let row = 0; row < this.rowCount; row++) {
          const currentRow = [];
          for (let col = 0; col < this.colCount; col++) {
            const currentNode = this.createNode(row, col);

            if (currentNode.isStart) this.startNodeReference = currentNode
            if (currentNode.isEnd) this.endNodeReference = currentNode 
            currentRow.push(currentNode);
          }
          tempGrid.push(currentRow)
        }
        this.grid = tempGrid;
      },

      createNode(row, col) {
        return {
          col,
          row,
          isStart: row === this.startNodeRow && col == this.startNodeCol,
          isEnd: row === this.endNodeRow && col === this.endNodeCol,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null,
          isDrawn: false,
        }
      },

      runDijkstra(){
        if (this.hasDrawnGrid) {
          // reset the grid
          this.generateInitialGrid();
          this.hasDrawnGrid = false;
        }
        const visitedNodesInOrder = dijkstra(this.grid.slice(), this.startNodeReference, this.endNodeReference);
        console.log(visitedNodesInOrder);
        this.drawDijkstra(visitedNodesInOrder);
      },

      drawDijkstra(orderedNodeArray){
        this.allowedToDraw = false;
        const amountOfNodes = orderedNodeArray.length;
        for (let i = 0; i < amountOfNodes; i++) {
          setTimeout(() => {
            orderedNodeArray[i].isDrawn = true;
          }, i * 10);

          if (i === amountOfNodes - 1){
            setTimeout(() => {
              this.allowedToDraw = true
            }, i * 10);
          } 
        }
        this.hasDrawnGrid = true;
      },

      setMouseDown(rowIndex, colIndex) {
        const node = this.grid[rowIndex][colIndex];

        if (!this.allowedToDraw || node.isStart || node.isEnd) return;

        this.isMouseDown = true;
        
        this.willFillWall = !node.isWall ? true : false;

        node.isWall = this.willFillWall ? true : false;
      },

      mouseEnteredNode(rowIndex, colIndex){
        const node = this.grid[rowIndex][colIndex];
        if (!this.isMouseDown || node.isStart || node.isEnd) return;


        node.isWall = this.willFillWall ? true : false; 
      },

      setMouseUp() {
        this.isMouseDown = false;
      },
    },
    mounted(){
      this.$nextTick(() => {
        this.generateInitialGrid();
      });
    },
}
</script>

<style lang="scss" scoped>
  #grid {
    border: 5px solid green;
    display: inline-block;
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

  .row {
    display: flex;
    flex-direction: row;
  } 
</style>