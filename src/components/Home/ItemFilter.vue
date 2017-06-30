<template>
  <div class="item-filter">
    <div class="item-filter-container">
      <div class="filter-container">
        <div class="filter" @click="filterBy('id', 'more')">
          Filtrer par ID asc
        </div>
        <div class="filter" @click="filterBy('id', 'less')">
          Filtrer par ID desc
        </div>
        <div class="filter" @click="filterBy('name', 'asc')">
          Filtrer par nom asc
        </div>
        <div class="filter" @click="filterBy('name', 'desc')">
          Filter par nom desc
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-filter',
  methods: {
    filterBy(action, comparaison) {
      if (action === 'id') {
        this.$store.commit('filterById', comparaison)
      } else if (action === 'desc') {
        this.$store.commit('filterByName', comparaison)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-filter {
  clear: both;
  overflow: auto;
  margin: 40px 0 20px 0;
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
  background: #ccc;
  cursor: pointer;
  border: 1px solid #464a4c;
  box-shadow: 4px 4px #464a4c;
  transition: all .3s;
}

.filter:hover {
  background: #464a4c;
  color: white;
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
