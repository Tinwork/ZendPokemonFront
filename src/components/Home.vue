<template>
  <div class="home">
    <ItemList></ItemList>
    <ItemShow></ItemShow>
    <ItemFilter></ItemFilter>
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

</style>
