<template>
  <div
    class="justify-content-between d-flex col-xs-12 col-sm-9 col-md-9 col-lg-7 mx-auto">
    <p style="margin: 0">
      <img class="pointer" @click="buy" src="@/assets/plus.jpg" alt="" />
      {{ item.title }}
    </p>
    <p style="margin: 0">{{ item.price }} kr</p>
  </div>

  <div class="mb-4 justify-content-between col-xs-12 col-sm-9 col-md-9 col-lg-7 mx-auto">
    <p>{{ item.info }}</p>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: ["item"],
  methods: {
    buy() {
       this.$store.dispatch("putInCart", this.item);
    },
  },
};
</script>

<style scoped>
.bg-color {
  background-color: #f4e4e1;
}

.box-shadow {
  box-shadow: 2px 2px 4px #333;
  margin: 1.5% auto;
}

.pointer {
   cursor:pointer;
}
</style>
