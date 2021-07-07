<template>
<div>
  <div class="head">
    <pagehead />
  </div>
  <div class="layout">
    <div class="layout-left">
      <index />
    </div>
    <div class="layout-right">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>

<script>
import index from '../index'
import pagehead from '../../publiccompents/head'
export default {
components: {
  index,
  pagehead
}
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.layout-right {
  width: 90vw;
  margin-left: 15px;
  border: 1px solid #dedede;
}
</style>