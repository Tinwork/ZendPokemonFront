<template>
  <div class="item-list">
    <div class="item-list-container">
      <h1>Item List</h1>
      <div class="item-list-content">
        <div class="item">
          Filter 1
        </div>
        <div class="item">
          Filter 2
        </div>
        <div class="item">
          Filter 3
        </div>
        <div class="item">
          Filter 4
        </div>
        <div class="item">
          Filter 1
        </div>
        <div class="item">
          Filter 2
        </div>
        <div class="item">
          Filter 3
        </div>
        <div class="item">
          Filter 4
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-list'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-list-container {
  margin: auto;
  max-width: 1500px;
}

.item {
  width: 22%;
  min-height: 100px;
  background: gray;
  margin: 0px 4% 4% 0;
  float: left;
  text-align: center;
}

.item:nth-child(4n) {
  margin: 0 0 4% 0;
}

@media screen and (max-width: 1350px) {
  .item-list-container {
    max-width: calc(100% - 220px);
  }
}
</style>
