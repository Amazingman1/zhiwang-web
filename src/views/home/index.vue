<template>
  <div class="container">
    <headerbase />
    <div class="main">
      <aside v-show="$route.path!='/workbench'" :class="collapsed">
        <el-menu
          v-show="!collapsed"
          :default-active="defaultactive"
          class="el-menu-vertical-demo"
          router
          unique-opened
          background-color="rgba(42,44,58,1)"
          text-color="#fff"
          active-text-color="#FFF"
          style="overflow-y: scroll;"
        >
          <template v-for="(item,index) in kk">
            <el-submenu v-if="item.children " :key="item.id" :index="index+''">
              <template slot="title">
                <i :class="item.iconCls" />
                {{ item.name }}
              </template>
              <div v-for="child in item.children" :key="child.path">
                <el-menu-item :index="child.path.split('?')[0]">{{ child.name }}</el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item v-if="!item.children" :key="item.path" :index="item.path.split('?')[0]">
              <i :class="item.iconCls" />
              {{ item.name }}
            </el-menu-item>
          </template>
        </el-menu>
      </aside>
      <router-view class="ly-main-view" />
    </div>
  </div>
</template>
<script>

import * as types from '@/store/mutation-types'

import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      navs: [],
      side: '',
      collapsed: false

    }
  },
  computed: {
    defaultactive: {
      get() {
        console.log(this.$store, 'this.$store.state')
        var a = this.$store.state.navName.name
        if (a) {
          if (!isNaN(a[a.length - 1])) {
            a = a
              .split('/')
              .slice(0, -1)
              .join('/') + '/1'
          } else {
            a = this.$store.state.navName.name
          }
        }
        return this.$store.state.navName.name
      }
    },
    kk: {
      get: function() {
        return this.$store.state.dictList
      }

    }
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.path !== from.path && to.meta.isnav) {
          this.navs = []

          if (to.matched.length > 1) {
            sessionStorage.name = to.meta.to
            sessionStorage.leftnav = to.matched[1].name
          } else {
            sessionStorage.name = to.meta.to

            sessionStorage.leftnav = to.name
          }
          sessionStorage.oldpath = to.path

          this.UPDATE_leftNav(JSON.parse(sessionStorage.sideRoutes))
        }
        var a = ''
        if (!isNaN(sessionStorage.oldpath[sessionStorage.oldpath.length - 1])) {
          a = sessionStorage.oldpath
            .split('/')
            .slice(0, -1)
            .join('/') + '/1'
        } else {
          a = sessionStorage.oldpath
        }
        this.UPDATE_navName({ name: a })
      }

    }

  },
  created() {
    console.log(types.GET_dict, 'types.GET_dict')

    this.$store.dispatch(types.GET_dict, {
      dictTypes: [
        'buy_car_purpose',
        'marriage_state'
      ]
    })

    if (sessionStorage.sideRoutes) {
      this.UPDATE_leftNav(JSON.parse(sessionStorage.sideRoutes))
    }
    var a = ''
    if (sessionStorage.oldpath) {
      if (!isNaN(sessionStorage.oldpath[sessionStorage.oldpath.length - 1])) {
        a = sessionStorage.oldpath
          .split('/')
          .slice(0, -1)
          .join('/') + '/1'
      } else {
        a = sessionStorage.oldpath
      }
    }
    this.UPDATE_navName({ name: a })
  },
  methods: {
    ...mapMutations(['UPDATE_navName', 'UPDATE_leftNav'])

  }
}
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .main {
    position: absolute;
    top: 50px;
    bottom: 0;
    display: flex;
    overflow: hidden;
    width: 100%;
    .main-right-top {
      position: absolute;
      top: 0;
      width: 100%;
      padding-left: 210px;
      transition: all .1s ease;
    }
    .main-right-top.is-collapsed {
      padding-left: 0;
    }
    aside {
      position: relative;
      flex: 0 0 210px;
      width: 210px;
      box-shadow: 2px 2px 2px rgba($color: #000, $alpha: .05);
      border-top: 1px solid #eee;
      transition: all .1s ease;

      ul {
        width: 100%!important;
      }
      .el-menu {
        z-index: 999;
        height: 100%;
        border-right: none;

        i {
          color: #666;
        }

        &-item {
          color: #a6c6ff;
          &:hover {
            color: #fff !important;
            background-color:  rgba(227, 1, 32, 1) !important;
            i {
              color: #fff !important;
            }
          }
          &.is-active {
            color: #fff;
            i {
              color: #fff !important;
            }
          }
        }
        .el-submenu .childOne {
          background: #fff !important;
        }
        .el-submenu .childOne:hover {
          background: rgba(227, 1, 32, 1) !important;
          i {
            color: #fff;
          }
        }
        .is-active {
          color: #fff;
          font-size: 14px;
          background-color:  rgba(227, 1, 32, 1)!important;
          border-right: none;
        }
        .el-submenu {
          border-left: none;
          .is-active {
            color: #fff !important;
            background-color:  rgba(227, 1, 32, 1) !important;
          }
        }
      }
      .collapsed {
        overflow-y: scroll;
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0;
          left: 60px;
          z-index: 99999;
          display: none;
          height: auto;
        }
      }
    }
    aside.is-collapsed {
      position: relative;
      flex: 0 0 0;
      width: 0;
    }

    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 210px;
      width: 210px;
    }
    .content-container {
      flex: 1;
      .breadcrumb-container {
        height: 30px;
        .title {
          float: left;
          margin-top: -3px;
          color: #475669;
        }
      }
      .content-wrapper {
        box-sizing: border-box;
      }
    }
    .handel-collapse {
      position: absolute;
      top: 50%;
      z-index: 5;
      width: 10px;
      height: 100px;
      margin-left: 1px;
      line-height: 100px;
      background-color: #e30120;
      border-radius: 0 10px 10px 0;
      transition: all .1s ease;
      cursor: pointer;
      i.is-collapsed {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 2px;
        border: 5px solid transparent;
        border-left-color: #fff ;
      }
      i.no-collapsed {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: -2px;
        border: 5px solid transparent;
        border-right-color: #fff ;
      }
    }
    .handel-collapse:hover {
      background-color: hsla(352, 99%, 45%, .7);
    }
    .handel-collapse.is-collapsed {
      left: 0;
      transform: translateY(-50%);
    }
    .handel-collapse.no-collapsed {
      left: 211px;
      transform: translateY(-50%);
    }
  }
}
</style>

