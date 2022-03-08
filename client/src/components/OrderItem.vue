<template>
   <div class="justify-content-between d-flex col-xs-12 col-sm-9 col-md-9 col-lg-9 mx-auto">
    <p class="p0 m0">{{getGUID()}}</p>
    <p class="p0 m0">{{registerDate(item.registerDate)}}</p>
  </div>

  <div class="mb-4 justify-content-between d-flex col-xs-12 col-sm-9 col-md-9 col-lg-9 mx-auto">
    <p class="p0 m0">Total ordersumma</p>
    <p class="p0 m0">{{ item.totPrice }} kr</p>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
 name: "OrderItem",
  props: ["item","index"],
    methods: {
    getGUID() {
      return uuidv4();
    },
    registerDate(item) {
       let newDate = item.substring(0,10);
       return newDate.replace(/-/g, "/");
    }
  }
}
</script>

<style scoped>
.m0,.p0{
  margin: 0 !important;
  padding:0 !important;
}
</style>