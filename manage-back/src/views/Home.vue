<template>
  <div>
    <el-container class="el-conteiner">
      <div ref="menuAside"
           class="menu-aside">
        <el-aside width="200px"
                  class="aside-menu">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>导航一</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>导航二</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>导航三</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="3-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
      </div>
      <el-container class="content">

        <el-main>
          <div class="show-menu-box"
               @click="showTap($event)">显示</div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      letfMenu: true
    }
  },
  methods: {
    showTap (e) {
      const menu = this.$refs.menuAside
      menu.classList.add('menu-aside-c')
      console.log(menu)
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
