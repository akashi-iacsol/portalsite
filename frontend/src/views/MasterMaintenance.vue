<template>
  <div>
    <section class="content-header">
      <h1>マスタメンテナンス画面</h1>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-body">
              <div class="row space-top">
                <div class="col-md-4 col-md-offset-1">
                  <button type="button" class="btn btn-block btn-primary btn-lg" @click="EmpMaintenance">社員マスタ</button>
                </div>
                <div class="col-md-1"/>
                <div class="col-md-4 col-md-offset-1">
                  <button type="button" class="btn btn-block btn-primary btn-lg">部署マスタ</button>
                </div>
                <div class="col-md-1"/>
              </div>
              <div class="row space-top">
                <div class="col-md-4 col-md-offset-1">
                  <button type="button" class="btn btn-block btn-primary btn-lg">役職マスタ</button>
                </div>
                <div class="col-md-7"/>
              </div>
              <div class="row space-top space-bottom">
                <div class="col-md-4 col-md-offset-1">
                  <button type="button" class="btn btn-block btn-success btn-lg">所属管理マスタ</button>
                </div>
                <div class="col-md-1"/>
                <div class="col-md-4 col-md-offset-1">
                  <button type="button" class="btn btn-block btn-success btn-lg">権限管理マスタ</button>
                </div>
                <div class="col-md-1"/>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.space-top {
  margin-top: 50px;
}
.space-bottom {
  margin-bottom: 50px;
}
</style>
<script>

export default {
  methods: {
    EmpMaintenance() {
      this.$router.push("/empMaintenance")
    }
  }
}
</script>
