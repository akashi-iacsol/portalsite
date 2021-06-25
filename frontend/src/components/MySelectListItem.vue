<template>
  <div class="my-select-list-item">
    <a
      class="listbox-a"
      :style="item.id == this.changeColorId && item.forSelect? 'background-color: orange' : ''"
      v-if="!item.forSelect || item.name.indexOf(searchWord) != -1"
      @click="select(item)"
    >{{item.name}}</a>
    <a class="listbox-a" @click="isHide = !isHide">{{open}}</a>
    <template v-if="!isHide">
      <MySelectListItem
        v-for="item in item.array"
        :key="item.index"
        :item="item"
        :searchWord="searchWord"
        :changeColorId="changeColorId"
        @select="SelectItem($event)"
        class="listbox-item"
      ></MySelectListItem>
    </template>
  </div>
</template>

<script>
import MySelectListItem from "./MySelectListItem";
export default {
  name: "MySelectListItem",
  components: {
    MySelectListItem,
  },
  data() {
    return { isHide: false, radio: null };
  },
  props: {
    item: {
      type: Object,
      require: true,
    },
    searchWord: {
      type: String,
      require: true,
    },
    changeColorId: {
      type: Number,
      require: true,
    },
  },
  methods: {
    SelectItem(event) {
      this.$emit("select", { itemData: event.itemData, id: event.id });
    },
    select(item) {
      if (item.forSelect) {
        this.$emit("select", { itemData: item.itemData, id: item.id });
      }
    },
  },
  computed: {
    open() {
      // 子item がそもそもなければ何も表示しない
      if (!this.item.array) {
        return "";
      }

      // 子item があり、show ではない時は開けるので + を表示する
      if (this.item.array && !this.isHide) {
        return "▼";
      }

      // それ以外は - 閉じるボタンを表示する
      return "▲";
    },
  },
  watch: {
    searchWord() {
      this.isHide = false;
    },
  },
};
</script>
<style scoped>
.listbox-a {
  color: #000;
}
.listbox-item {
  padding-left: 1.5em;
}
</style>