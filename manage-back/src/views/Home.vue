<template>
  <div>
    <el-container class="el-conteiner">
      <div ref="menuAside"
           class="menu-aside">
        <el-aside width="200px"
                  class="aside-menu">
          <el-menu>
            <!-- 通过条件判断是否添加点击事件 -->
            <el-submenu v-for="(item, index) in getRouteArr"
                        :key="index"
                        @click.native="!item.subMenu&&routerClick(item.path)"
                        :index="returnIndex(index)">
              <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
              <el-menu-item-group v-if="item.subMenu">
                <template slot="title">选择书籍分类</template>
                <el-menu-item :index="index+'-'+indexS"
                              v-for="(itemS, indexS) in item.subMenu"
                              @click="routerClick(item.path,indexS+1)"
                              :key="indexS">{{itemS.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </div>
      <el-container class="content">

        <el-main>
          <div class="show-menu-box"
               @click="showTap($event)">显示</div>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      letfMenu: true
    }
  },
  computed: {
    getRouteArr () {
      return this.$router.options.routes[0].children
    },
    // 列表中的index为字符串
    returnIndex () {
      return (i) => {
        return i + ''
      }
    },
    // 使用mapState辅助函数简化操作
    ...mapState([
      'classificationType' // 将this.classificationType映射为this.$store.state.classificationType
    ])

  },

  mounted () {
  },
  methods: {
    ...mapMutations([
      'changeActionType'
    ]),
    showTap (e) {
      const menu = this.$refs.menuAside
      menu.classList.add('menu-aside-c')
    },
    routerClick (path, i) {
      // 如果是当前页就不跳转
      const currentPath = this.$router.history.current.path

      if (typeof i === 'number') {
        // 改变vuex中的值
        this.changeActionType(i)
      }
      if (path && path !== currentPath) {
        this.$router.push({
          path
        })
      }
    }
  }
}
</script>
<style lang="less">
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
div.menu-aside-c {
  display: block;
}
@media screen and(max-width:950px) {
  .menu-aside {
    display: none;
  }
  .el-conteiner {
    .content {
      div.show-menu-box {
        display: block;
      }
    }
  }
}

.el-aside {
  color: #333;
}
.el-conteiner {
  height: 100%;
  .content {
    height: 100%;
    overflow: auto;
    position: relative;
    .show-menu-box {
      position: absolute;
      left: 10px;
      top: 10px;
      display: none;
    }
  }
}
</style>
