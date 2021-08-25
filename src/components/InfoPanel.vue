<template>
    <div class="panel-info-wrapper">
      <p 
        class="panel-info"
        :class="{disabled: !this.allowedToDraw}"
        >
      Placing: {{ this.drawingMode }}
      </p>
      <p class="panel-info">
      {{ this.allowedToDraw ? "Currently Allowed To Draw" : "Not Allowed To Draw!" }}
      </p>
      <p class="panel-info">
      Shortest Path: {{ this.currentShortestDistance === Infinity ? "N/A" : this.currentShortestDistance }}
      </p>
      <p class="panel-info">
      Highlighted Distance: {{ this.highlightedDistance === Infinity ? "N/A" : this.highlightedDistance }}
      </p>
      <div 
        class="panel-div"
        :class="{disabled: !this.allowedToDraw}">
        <p class="panel-info">Weight Amount:</p>
        <input
          class="number-input"
          type="number"
          :disabled="!this.allowedToDraw"
          v-model="weight"/>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
export default ({
  name: "InfoPanel",
  computed: {
    ...mapState(['allowedToDraw', 'currentShortestDistance', 'highlightedDistance']),
    ...mapGetters(['drawingMode']),
    weight: {
      get(){ return this.$store.state.weightAmount},
      set(newWeightValue){ this.$store.commit('updateWeightAmount', newWeightValue)},
    },
  },
})
</script>

<style lang="scss" scoped>
  @use "../global_style/colors" as c;

  .panel-info-wrapper {
    height: 305px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  .disabled {
    text-decoration: line-through;
    cursor: not-allowed;
  }

  .panel-div {
    display: flex;
    width: 200px;
      

    p {
      width: 80%;
    }

    .number-input {
      width: 20%;
    }
  }

  p {
    width: 200px;
    margin: 8px 0;
    text-align: start;
    color: c.$primary-text-color;
  }

  @media screen and (max-width: 850px) {
    .panel-info-wrapper {
      height: 250px;
      padding: 15px 20px;
    }
  }

  @media screen and (max-width: 600px){
    .panel-info, .panel-div{
      font-size: 10px;
      width: 150px;
    }
  }
</style>
