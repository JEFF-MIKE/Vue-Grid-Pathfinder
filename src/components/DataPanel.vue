<template>
  <div class="data-panel-wrapper">
    <InfoPanel />
    <ButtonPanel />
  </div>
</template>

<script>
import ButtonPanel from './ButtonPanel.vue';
import InfoPanel from './InfoPanel.vue';

export default {
  name: 'DataPanel',
  props: {
    isMouseDown: Boolean,
    weight: Number,
  },
  components: {
    ButtonPanel,
    InfoPanel,
  },
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
  

  @media screen and (max-width:850px){
    .data-panel-wrapper {
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      height: 300px
    }
  }
</style>
