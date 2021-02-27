<template>
  <div class="error-page">
    <div
      class="img"
      :style="{backgroundImage:`url(${img})`}"
    />
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，你访问的页面不存在</div>
      <div class="actions">
        <!-- <router-link :to="{path:'/'}"> -->
        <el-button type="primary" @click="handelBack">返回</el-button>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notfount',
  data() {
    return {
      img: require('../../assets/404.png')
    }
  },
  methods: {
    handelBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.error-page {
  background: #f0f2f5;
  margin-top: -30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .img {
    margin-right: 80px;
    height: 360px;
    width: 100%;
    max-width: 430px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }
  .content {
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .desc {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
</style>
