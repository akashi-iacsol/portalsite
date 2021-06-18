<template>
  <input
    :type="type"
    :name="name"
    :value="value"
    :placeholder="placeholder"
    @input="input"
    @keyup.enter="keyUpEnter"
  />
</template>

<script>
export default {
  name: "MyInput",
  props: {
    value: [],
    type: [],
    name: [],
    placeholder: [],
  },
  methods: {
    input(e) {
      this.$emit("input", e.target.value);
    },
    keyUpEnter(e) {
      this.$emit("keyup-enter", e.target.value);
    },
  },
};
</script>