<template>
  <div class="alerts">
    <div :class="['alert', alert.className]" v-for="alert in alerts">
      <div @click="deleteAlert(alert)" class="close">X</div>
      <div class="content">{{ alert.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertManager',
  computed: {
    alerts () {
      return this.$store.getters.alerts
    }
  },
  methods: {
    deleteAlert (alert) {
      this.$store.commit('deleteAlert', alert)
    }
  }
}
</script>

<style scoped>
.alerts {
  position: absolute;
  min-width: 500px;
  max-width: 40vw;
  top: 10px;
  right: 1vw;
  z-index: 3;
}

.alert {
  width: 100%;
  min-height: 50px;
  background: antiquewhite;
  border-radius: 2px;
  margin: 10px 0;
  overflow: auto;
  position: relative;
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}

.content {
  margin: 20px 10px;
}

.danger {
  background: red;
}

.info {
  background: blue;
}

.success {
  background: green;
}
</style>