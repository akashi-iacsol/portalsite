<template>
  <div class="my-select-list-box">
    <div>{{name[type]}}選択:</div>
    <div>
      <input v-model="searchWord" />
    </div>

    <div class="listbox-form">
      <MySelectListItem
        v-for="item in array"
        :key="item.index"
        :item="item"
        :searchWord="searchWord"
        :changeColorId="changeColorId"
        @select="SelectItem($event)"
      ></MySelectListItem>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MySelectListItem from "./MySelectListItem";
export default {
  name: "MySelectListBox",
  components: {
    MySelectListItem,
  },
  data() {
    return {
      changeColorId: 0,
      searchWord: "",
      db: {
        params: "",
        path: {
          employee: "employee-list",
          department: "department-list",
          position: "position-list",
          authority: "authority-list",
        },
      },
      name: {
        employee: "社員",
        department: "部署",
        position: "役職",
        authority: "権限",
      },
      array: [],
    };
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    SelectItem(event) {
      this.changeColorId = event.id;
      this.$emit("select", { itemData: event.itemData });
    },
    select(itemData) {
      this.$emit("select", { itemData: itemData });
    },
  },
  created: async function () {
    const pathDB = `http://localhost:3000/${this.db.path[this.type]}`;
    this.db.params = new URLSearchParams();
    try {
      const res = await axios.post(pathDB, this.db.params);
      this.array = res.data.array;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
.listbox-form {
  display: inline-block;
  width: 25vw;
  height: 60vh;
  overflow: scroll;
  text-align: left;
  border: solid 3px;
}
</style>