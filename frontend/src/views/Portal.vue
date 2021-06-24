<template>
  <div class="portal">
    <section class="content-header">
    <h1>IACソリューションズ 社員ポータルサイト</h1>
    </section>
    <section class="contents">
    社内システム一覧
    <table class="officesys">
        <tr>
          <Button>○○システム</Button>
          <Button>○○システム</Button>
        </tr>
        <tr>
          <Button>○○システム</Button>
          <Button>○○システム</Button>
        </tr>
    </table>
    <Button>マスタメンテナンス</Button>
    </section>
  </div>
    
</template>

<style>
Button {
  height: 50px;
  width: 220px;
  font-size: 20px;
  border-radius: 5px;
  /* padding: 10 25px; */
  cursor: pointer;
  margin: 20px;
  }
.officesys{
  border: solid 1px;
  width: 45%;
  /* height: 20%; */
  margin : auto;
}.portal{
  text-align: center;
}.contents {
  margin-top: 60px;
}
</style>