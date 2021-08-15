<template> 
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
          @mouse-leave="mouseHasLeftNode(rowIndex, colIndex)"
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
          :isBackTracked="node.isBackTracked"
        />
    </div>
  </div>
  <DataPanel
    @set-start-node="settingStartNode()"
    @set-end-node="settingEndNode()"
    @reset-drawn-graph="resetDrawnPath()"
    @run-dijkstra="runDijkstra()"
    :allowedToDraw="this.allowedToDraw"
    :willFillWall="this.willFillWall"
    :isPlacingStartNode="this.isPlacingStartNode"
    :isPlacingEndNode="this.isPlacingEndNode"
    :isMouseDown="this.isMouseDown"
    :currentShortestDistance="this.currentShortestDistance"
    :highlightedShortestDistance="this.highlightedShortestDistance"/>
</template>

<script>
import Node from "./Node.vue"
import DataPanel from "./DataPanel.vue"
import { dijkstra } from "../algorithms/dijkstra";

export default {
    name: "PathfinderGrid",
    components: {
      Node,
      DataPanel,
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
        currentShortestDistance: Infinity,
        highlightedShortestDistance: Infinity,
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
        this.currentShortestDistance = Infinity;

        this.allowedToDraw = true;

        this.hasDrawnAlgorithm = false;
      },

      runDijkstra(){
        if (this.hasDrawnAlgorithm) {
          // reset the grid
          this.resetDrawnPath();
        }
        const visitedNodesInOrder = dijkstra(this.grid.slice(), this.startNodeReference, this.endNodeReference);
        console.log(visitedNodesInOrder);
        this.drawDijkstra(visitedNodesInOrder);
      },

      drawDijkstra(orderedNodeArray){
        this.allowedToDraw = false;
        const amountOfNodes = orderedNodeArray.length;
        setTimeout(() => {this.hasDrawnAlgorithm = true}, 10 * amountOfNodes);
        for (let i = 0; i < amountOfNodes; i++) {
          setTimeout(() => {
            orderedNodeArray[i].isDrawn = true;
          }, i * 10); 
        }
        this.currentShortestDistance = this.endNodeReference.distance;
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
          
          this.currentShortestDistance = Infinity;
        }

        if (this.isPlacingEndNode){
          this.endNodeReference.isEnd = false;

          node.isEnd = true;

          this.endNodeRow = rowIndex;

          this.endNodeCol = colIndex;

          this.endNodeReference = node;

          this.isPlacingEndNode = false;

          this.currentShortestDistance = Infinity;
        }

        if (node.isStart || node.isEnd) this.generateInitialGrid();

        if (!this.allowedToDraw || node.isStart || node.isEnd) return;

        this.isMouseDown = true;
        
        this.willFillWall = !node.isWall ? true : false;

        node.isWall = this.willFillWall ? true : false;
      },

      mouseEnteredNode(rowIndex, colIndex){
        const node = this.grid[rowIndex][colIndex];

        // check if the node isVisited and if it is drawn. If so, backtrack and style.
        if (this.hasDrawnAlgorithm && node.isDrawn) {
          this.highlightedShortestDistance = node.distance;

          let targetNode = node;

          while (targetNode !== null) {
            targetNode.isBackTracked = true;

            targetNode = targetNode.previousNode;
          }
        }

        if (!this.isMouseDown || node.isStart || node.isEnd || !this.allowedToDraw) return;

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
      },

      mouseHasLeftNode(rowIndex, colIndex){
        // wipe the backtracking colors if they were set previously.
        const node = this.grid[rowIndex][colIndex];

        if (this.hasDrawnAlgorithm && node.isDrawn) {
          this.highlightedShortestDistance = Infinity;
          let targetNode = node;

          while (targetNode !== null) {
            targetNode.isBackTracked = false;

            targetNode = targetNode.previousNode;
          }
        }
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
  @use "../global_style/colors" as c;
  #grid {
    border: 5px solid c.$primary-color;
    border-right: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
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

  @media screen and (max-width:600px){
  
    #grid {
      align-items: center;
    }
  }
</style>