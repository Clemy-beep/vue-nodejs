<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ProductList msg="Welcome to Your Catfood Store ! 😸" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductList from "../components/ProductList.vue";
export default defineComponent({
  name: "HomeView",
  components: {
    ProductList,
  },
  data() {
    return {
      open: Boolean(),
    };
  },
});
</script>

<style>
img {
  height: 84px;
}
</style>
