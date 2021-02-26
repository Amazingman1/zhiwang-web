<template>
  <div>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />

  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  },
  mounted(){
    console.log(this.$route)
  }
};
</script>

<style lang="scss">
@import './styles/app.scss';
</style>
