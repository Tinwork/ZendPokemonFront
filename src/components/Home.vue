<template>
  <div class="home">
    <ItemShow></ItemShow>
    <ItemFilter></ItemFilter>
    <ItemList></ItemList>
  </div>
</template>

<script>
import ItemList from '@/components/Home/ItemList'
import ItemShow from '@/components/Home/ItemShow'
import ItemFilter from '@/components/Home/ItemFilter'

export default {
  name: 'home',
  components: {
    ItemList,
    ItemShow,
    ItemFilter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  max-width: calc(100vw - 80px);
  margin-left: 80px;
  position: relative;
}
</style>
