<template>
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar" style="height: auto;">
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu tree" data-widget="tree">
        <li class="header">MAIN NAVIGATION</li>
        <li class="active treeview menu-open">
          <a href="">
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li :class="{active: this.$route.name === 'Portal'}"><router-link to="portal"><i class="fa fa-circle-o"></i>ポータル</router-link></li>
            <li :class="{active: this.$route.name === 'MasterMaintenance'}"><router-link to="MasterMaintenance"><i class="fa fa-circle-o"></i>マスタメンテナンス</router-link></li>
          </ul>
        </li>
        〜中略〜
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
export default {
  name: 'MyAside'
}
</script>