<template>
  <button
    :type="type"
    :name="name"
    @click="click"
  >{{value}}
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    value: [],
    type: [],
    name: [],
  },
  methods: {
    click(e) {
      this.$emit("click", e.target.value);
    },
  },
};
</script>