<template>
  <div class="types">
    <h1>Types</h1>
  
    <router-link :to="{ name: 'TypesIndex' }">Index</router-link>
    <router-link :to="{ name: 'TypesCreate' }">Create</router-link>
  
    <router-view class="nested-child"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Types'
}
</script>