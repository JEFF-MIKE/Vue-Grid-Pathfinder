<template>
    <div id="grid">
      <div
        class="row"
        :key="rowIndex" 
        v-for="(row, rowIndex) in rowCount">
        <div
          class="col"
          :key="colIndex"
          v-for="(col, colIndex) in colCount">
            <Node
              :rowIndex="rowIndex"
              :colIndex="colIndex" />
          </div>
      </div>

    </div>
</template>

<script>
import Node from "./Node.vue"
export default {
    name: "PathfinderGrid",
    components: {
      Node
    },
    data(){
      return {
        nodes: [],
        rowCount: 25,
        colCount: 25,
      }
    },
    mounted(){
      this.$nextTick(() => {
        for (let row = 0; row < this.rowCount; row++) {
          const currentRow = [];
          for (let col = 0; col < this.colCount; col++) {
            currentRow.push([]);
          }
          this.nodes.push(currentRow)
        }
      });
    },
}
</script>

<style lang="scss" scoped>
  #grid {
    border: 5px solid green;
    display: inline-block;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  } 

  .col {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>