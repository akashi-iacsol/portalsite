<template>
    <div class="portal">
        <h1>IACソリューションズ 社員ポータルサイト</h1>
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
        <!-- ・・・内容未定・・・
        <table border="1" class="blog">
        </table> -->
        <Button>マスタメンテナンス</Button>
    </div>
    
</template>

<style>
Button {
  height: 50px;
  width: 220px;
  font-size: 20px;
  border-radius: 5px;
  /* padding: 0 24px; */
  cursor: pointer;
    margin: 20px;
  }
  .officesys{
    border: solid 1px;
    width: 35%;
    height: 30%;
    margin : auto;
  }
</style>