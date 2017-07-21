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
  
      <!-- Add filter by name ? -->
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
<style lang="scss" scoped>
.item-filter {
  clear: both;
  overflow: auto;
  padding: 40px 0 0px 0;
  background: url(/static/gaming-pattern.png);
}

.item-filter-container {
  margin: auto;
  max-width: 1500px;
}

.filter {
  width: 22%;
  border-radius: 32px;
  color: white;
  float: left;
  margin: 0px 4% 4% 0;
  padding: 10px;
  box-sizing: border-box;
  background: #E3350D;
  cursor: pointer;
  box-shadow: 4px 4px rgb(0, 0, 0);
  transition: all .3s;

  &:hover {
    background: #464a4c;
    color: white;
  }

  &:nth-child(4n) {
    margin: 0 0 4% 0;
  }
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
