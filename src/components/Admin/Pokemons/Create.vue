<template>
  <div class="create">
    <form-pokemon></form-pokemon>
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