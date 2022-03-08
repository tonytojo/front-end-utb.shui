<template>
   <div
    class="justify-content-between d-flex col-xs-12 col-sm-9 col-md-9 col-lg-7 mx-auto">
    <p style="margin: 0">
      {{ capitalize(item.title) }}
    </p>
    <p style="margin: 0">{{item.count }}</p>
    <div>
      <i @click="addOneItem(item)" class="bi bi-plus cursor p-1"></i>&nbsp;&nbsp;&nbsp;
      <i @click="reduceOneItem(item)" class="bi bi-file-minus cursor p-1"></i>
    </div>
  </div>

  <!-- <div class="mb-4 justify-content-between col-xs-12 col-sm-9 col-md-9 col-lg-7 mx-auto">
    <p>{{ item.totPrice }} kr</p>
  </div> -->
</template>

<script>
export default {
   name: "CartItem",
  props: ["item"],
 methods: {
    capitalize(item) {
      return item.charAt(0).toUpperCase() + item.slice(1);
    },

    addOneItem(item) {
      this.$store.dispatch("addOneItem", item);
    },
     reduceOneItem(item) {
      this.$store.dispatch("reduceOneItem", item);
    }
 }
}
</script>

<style scoped>
.cursor {
   cursor: pointer;
}
</style>