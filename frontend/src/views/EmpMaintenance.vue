<template>
  <div>
    <section class="content-header">
      <h1>社員マスタメンテナンス画面</h1>
    </section>
      <section class="content">
        <h5 align="center">個別データ更新</h5>
        <div class="row text-center">
          <div class="col-md-12">
            <div class="box">
              <div class="box-body">
                <div class="row space-top space-bottom">
                  <div class="col-md-2 col-md-offset-2">
                    <button type="button" class="btn btn-block btn-primary btn-lg">新規登録</button>
                  </div>
                  <div class="col-md-2 col-md-offset-1">
                    <button type="button" class="btn btn-block btn-primary btn-lg">更新</button>
                  </div>
                  <div class="col-md-2 col-md-offset-1">
                    <button type="button" class="btn btn-block btn-primary btn-lg">削除</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h5 align="center">マスタ一括更新</h5>
        <div class="row text-center">
          <div class="col-md-12">
            <div class="box">
              <div class="box-body">
                <div class="row space-top">
                  <div class="col-md-3 col-md-offset-6">
                    <button type="button" class="btn btn-block btn-success btn-lg">ファイル選択</button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3 col-md-offset-2">
                    <button type="button" class="btn btn-block btn-primary btn-lg">.CSVダウンロード</button>
                  </div>
                </div>
                <div class="row space-bottom">
                  <div class="col-md-5"/>
                  <div class="col-md-3 col-md-offset-1">
                    <button type="button" class="btn btn-block btn-success btn-lg">.CSVアップロード</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-md-offset-4 space-top">
          <button type="button" class="btn  btn-block btn-primary btn-lg" @click="back()">戻る</button>
        </div>
      </section>
  </div>
</template>
<script>
export default {
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
}
</script>

<style>
.space-top {
  margin-top: 40px;
}
.space-bottom {
  margin-bottom: 40px;
}
</style>