<template>
    <div>控制台</div>
</template>
<script>
  export default {
    mounted () {
      this.$store.commit('setPageTitle', '控制台')
    },
  }
</script>