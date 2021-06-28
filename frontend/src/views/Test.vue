<template>
  <div>
    <div>{{itemData}}</div>
    <MySelectListBox type="employee" @select="SelectItem($event)"></MySelectListBox>
  </div>
</template>
<script>
import MySelectListBox from "../components/MySelectListBox";
export default {
  name: "Test",
  components: {
    MySelectListBox,
  },
  data() {
    return {
      itemData: {},
    };
  },
  methods: {
    SelectItem(event) {
      this.itemData = event.itemData;
    },
  },
};
</script>
