<template>
  <div>
    <section class="content-header">
      <h1>IACソリューションズ 社員ポータルサイト</h1>
    </section>
      <section class="content">
        <h5 align ="center">社内システム一覧</h5>
        <div class="row text-center">
          <div class="col-md-12">
            <div class="box">
              <div class="box-body">
                <div class="row space-top">
                  <div class="col-md-4 col-md-offset-1">
                    <button type="button" class="btn btn-primary btn-block btn-lg">○○システム</button>
                  </div>
                  <div class="col-md-1"/>
                  <div class="col-md-4 col-md-offset-1">
                    <button type="button" class="btn btn-primary btn-block btn-lg">○○システム</button>
                  </div>
                  <div class="col-md-1"/>
                </div>
                <div class="row space-top space-bottom">
                  <div class="col-md-4 col-md-offset-1">
                    <button type="button" class="btn btn-primary btn-block btn-lg">○○システム</button>
                  </div>
                  <div class="col-md-1"/>
                  <div class="col-md-4 col-md-offset-1">
                    <button type="button" class="btn btn-primary btn-block btn-lg">○○システム</button>
                  </div>
                </div>
              </div>
            </div>
            <router-link to="MasterMaintenance"><button type="button" class="btn btn-danger btn-lg">マスタメンテナンス</button></router-link>
            </div>
        </div>
      </section>
  </div>
</template>
<style>
  .space-top {
  margin-top: 40px;
}
.space-bottom {
  margin-bottom: 40px;
}
</style>