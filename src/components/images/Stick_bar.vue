<template>
  <div class="text-white text-xs mb-5">
    <span class="mr-4">C-RATIO</span>         {{c_ratio}}%
      <div id="stick-wrapper">
         <img src="~@/assets/images/exchange/stick1.png" id="stick1"/>
         <img src="~@/assets/images/exchange/stick2.png" id="stick2" :style="stick_width" />
      </div>
    <span class="mr-4">TARGET</span>          {{target}}%  
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Stick_bar',
  props:{
    c_ratio:{type:Number,default:0},
    target:{type:Number,default:0}
  },
  setup(props) {
    let stick_width="width:"+props.c_ratio+"%";
    function hey(){
      alert(stick_width);
    }

    return {
      hey,
      stick_width
    };
  }
});
</script>

<style>
  #stick-wrapper{
   position: relative;
   width: 80%;
   height: 10px;
   display: inline-block;
  }
  #stick1{
   width: 100%;
   height: 100%;
   top: 0px;
   left: 0px;
   box-shadow: 0px 0px 30px 0px white;
  }
  #stick2{
   height: 100%;
   position: absolute;
   top: 0px;
   left: 0px;
  }
</style>
