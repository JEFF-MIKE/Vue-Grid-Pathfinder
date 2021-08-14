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
            :key="(node.nodeId)"
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
    <p>
      Placing Start Node: {{ this.isPlacingStartNode }}
    </p>
    <p>
      Placing End Node: {{ this.isPlacingEndNode }}
    </p>
    <p>
      Is Mouse Down : {{ this.isMouseDown }}
    </p>
    <button @click="settingStartNode()">
      Place Start Node
    </button>
    <button @click="settingEndNode()">
      Place End Node
    </button>
    <button @click="resetDrawnPath()">
      Clear Drawn Path
    </button>
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
        hasDrawnAlgorithm: false,
        isMouseDown: false,
        willFillWall: false,
        allowedToDraw: true,
        isPlacingStartNode: false,
        isPlacingEndNode: false,
      }
    },
    methods: {
      generateInitialGrid() {
        const tempGrid = [];
        let nodeId = 1;
        for (let row = 0; row < this.rowCount; row++) {
          const currentRow = [];
          for (let col = 0; col < this.colCount; col++) {
            const currentNode = this.createNode(row, col, nodeId);
            nodeId++;
            if (currentNode.isStart) this.startNodeReference = currentNode
            if (currentNode.isEnd) this.endNodeReference = currentNode 
            currentRow.push(currentNode);
          }
          tempGrid.push(currentRow)
        }
        this.grid = tempGrid;
      },

      createNode(row, col, nodeId) {
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
          isBackTracked: false,
          nodeId,
        }
      },
      resetDrawnPath(includeWall = false){
        /*
        This method will go through an existing grid and change the following properties:
        isDrawn,
        previousNode,
        isVisited,
        isBackTracked,
        distance.
        */
        if (!this.hasDrawnAlgorithm) return;
        for (let row = 0; row < this.rowCount; row++){
          for (let col = 0; col < this.colCount; col++){
            const node = this.grid[row][col];
            const newNode = {
              ...node,
              isDrawn: false,
              previousNode: null,
              isVisited: false,
              isBackTracked: false,
              distance: Infinity,
            }
            if (includeWall) newNode.isWall = false;
            this.grid[row][col] = newNode;
            // we actually remove the previous references with the new assignment,
            // so we need to re-assign it.
            if (newNode.isStart) this.startNodeReference = newNode;
            if (newNode.isEnd) this.endNodeReference = newNode;
          }
        }
        console.log(this.grid.length, this.grid[0].length);
      },
      runDijkstra(){
        if (this.hasDrawnAlgorithm) {
          // reset the grid
          this.resetDrawnPath();
          this.hasDrawnAlgorithm = false;
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
        this.hasDrawnAlgorithm = true;
      },

      setMouseDown(rowIndex, colIndex) {
        const node = this.grid[rowIndex][colIndex];

        // check if we're either in startMode or endMode
        // if we are, reset the start or end node here.

        // We will also make sure a start/end node cannot be a wall.
        if (this.isPlacingStartNode){
          this.startNodeReference.isStart = false;
          node.isStart = true;
          this.startNodeRow = rowIndex;
          this.startNodeCol = colIndex;

          this.startNodeReference = node;

          this.isPlacingStartNode = false;
        }

        if (this.isPlacingEndNode){
          this.endNodeReference.isEnd = false;
          node.isEnd = true;
          this.endNodeRow = rowIndex;
          this.endNodeCol = colIndex;

          this.endNodeReference = node;

          this.isPlacingEndNode = false;
        }

        if (node.isStart || node.isEnd) this.generateInitialGrid();

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

      settingStartNode(){
        if (this.isPlacingEndNode) this.isPlacingEndNode = false;
        this.isPlacingStartNode = true;
      },

      settingEndNode(){
        if (this.isPlacingStartNode) this.isPlacingStartNode = true;
        this.isPlacingEndNode = true;
      }
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