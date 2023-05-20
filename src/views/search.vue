<template>
    <div class="serch">
          <img src="../img/搜索.png" class="serachBig">
          <input style="width:30rem" @keyup="search" ref="serchtext" class="serachInput">
        </div>
</template>

<script lang="ts">
import { reactive, ref,toRefs } from 'vue'
    export default {
        setup() {
            const obj = reactive({
                serchtext: ref()
            });
            
            const search = (event) => {
                if(event.keyCode === 13){
                    console.log(obj.serchtext.value)
                    obj.serchtext.value=""
                }
            }
            return({
                ...toRefs(obj),
                search
            })
        }
        
    }
</script>

<style lang="scss" scoped>
.serch {
  display: flex;
  flex-direction: row;
  justify-content: center; /*垂直居中*/
  align-items: center; /*水平居中*/
  height: 20vh; /*占满整个浏览器高度*/
  padding: 5%;
}
.serachInput{
  height: 2rem;
}
.serachBig{
  width: 2rem;
}
.serch{
  text-align: center;
  height: 20%;
}
</style>