<template>
  <div class="EmpMaintenance">
    <section class="content-header">
      <h1>社員マスタメンテナンス画面</h1>
    </section>
    <section class="contents">
      個別データ更新
      <table class="dataupdate">
        <tr>
          <Button>新規登録</Button>
          <Button>更新</Button>
          <Button>削除</Button>
        </tr>
      </table>
      マスタ一括更新
      <table class="alldataupdate">
        <tr>
          <td rowspan="2"><Button class="csv">.CSVダウンロード</Button></td>
          <td><Button>ファイル選択</Button></td>
        </tr>
        <tr>
          <td><Button class="csv">.CSVアップロード</Button></td>
        </tr>
      </table>
      <Button>戻る</Button>
    </section>
  </div>
</template>
<style>
Button {
  height: 40px;
  width: 200px;
  font-size: 20px;
  cursor: pointer;
  margin: 10px;
  margin-top: 35px;
  margin-bottom: 35px;
}
.csv {
  border-radius: 5px;
}
.dataupdate {
  border: solid 1px;
  width: 55%;
  margin: auto;
  margin-bottom: 60px;
}
.alldataupdate {
  border: solid 1px;
  width: 55%;
  margin: auto;
}
.contents {
  margin-top: 60px;
}.EmpMaintenance{
  text-align: center;
}
</style>