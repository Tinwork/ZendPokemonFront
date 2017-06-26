<template>
  <div class="create">
    <form-pokemon mode="create"></form-pokemon>
  </div>
</template>

<script>
import Form from './Form'
export default {
  name: 'pokemonCreate',
  components: {
    'form-pokemon': Form
  }
}
</script>