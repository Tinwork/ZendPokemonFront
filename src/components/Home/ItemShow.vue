<template>
  <div class="item-show">
    <a class="navigation left fa fa-angle-left" @click="prevPokemon"></a>
    <a class="navigation right fa fa-angle-right" @click="nextPokemon"></a>
    <div class="item-show-container">
      <h1>Title</h1>
      <div class="item-show-content">
        <div class="item-show-content-left">
          <img src="qsdsqd">
        </div>
        <div class="item-show-content-right">
          <div class="item-show-content-label">
            <h3>Label</h3>
            <p>
              <strong>Label</strong>
              Contenu ...
            </p>
            <p>
              <strong>Label</strong>
              Contenu ...
            </p>
            <p>
              <strong>Label</strong>
              Contenu ...
            </p>
          </div>
          <div class="item-show-content-evolution">
            <h3>Evolution</h3>
            <a>
              <img src="qsdqsd" alt="">
            </a>
            <a>
              <img src="qsdqsd" alt="">
            </a>
            <a>
              <img src="qsdqsd" alt="">
            </a>
          </div>
          <div class="item-show-content-localization">
            <h3>Localiser ce pokemon</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-show',
  methods: {
    nextPokemon: function () {
      console.log(this)
    },
    prevPokemon: function () {
      console.log(this)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-show {
  position: relative;
  overflow: auto;
  border-bottom: 3px solid;
}

.navigation {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
  cursor: pointer;
}

.navigation.left {
  left: 20px;
}

.navigation.right {
  right: 20px;
}

.item-show-container {
  border: 3px solid;
  box-sizing: border-box;
  padding: 20px;
  max-width: 1100px;
  margin: 40px auto;
}

.item-show-content {
  clear: both;
  overflow: auto;
  min-height: 400px;
}

.item-show-content h1 {
  margin: 0.67em 0 1em;
}

.item-show-content-right {
  width: 65%;
  height: 100%;
  float: left;
  min-height: 400px;
  text-align: left;
  box-sizing: border-box;
  padding: 0 30px;
}

.item-show-content-left {
  width: 35%;
  height: 100%;
  float: left;
  min-height: 400px;
}

.item-show-content-left img {
  min-height: 400px;
  width: 100%;
}

.item-show-content-evolution img {
  width: 50px;
  height: 50px;
  margin: 0 10px;
}

.item-show-content-evolution img:first-child {
  width: 50px;
  height: 50px;
  margin: 0;
}

@media screen and (max-width: 1350px) {
  .item-show-container {
    max-width: calc(100% - 220px);
  }
}


@media screen and (max-width: 700px) {
  .item-show-container {
    max-width: calc(100% - 40px);
    margin: 100px auto 80px;
  }

  .navigation {
    bottom: 15px;
    top: inherit;
  }
}

</style>
