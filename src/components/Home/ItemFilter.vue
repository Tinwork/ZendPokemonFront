<template>
  <div class="item-filter">
    <div class="item-filter-container">
      <h1>Item Filter</h1>
      <div class="filter-container">
        <div class="filter">
          Filter 1
        </div>
        <div class="filter">
          Filter 2
        </div>
        <div class="filter">
          Filter 3
        </div>
        <div class="filter">
          Filter 4
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-filter'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-filter {
  clear: both;
  overflow: auto;
  margin: 20px 0;
}

.item-filter-container {
  margin: auto;
  max-width: 1500px;
}


.filter {
  width: 22%;
  float: left;
  margin: 0px 4% 4% 0;
  padding: 10px;
  box-sizing: border-box;
  background: grey;
}

.filter:nth-child(4n) {
  margin: 0 0 4% 0;
}

@media screen and (max-width: 1350px) {
  .item-filter-container {
    max-width: calc(100% - 220px);
  }
}

@media screen and (max-width: 700px) {
  .item-filter-container {
    max-width: calc(100% - 40px);
  }

  .filter-container {
    display: block;
  }

  .filter {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
