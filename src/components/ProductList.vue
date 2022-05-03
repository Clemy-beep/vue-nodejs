<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="article in articles" :key="article.id">
        {{ article.title }} : {{ article.price }}{{ article.currency }}
        <router-link :to="{ name: 'article', params: { id: article.id } }"
          >See article</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      articles: [],
    };
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles: async function () {
      let res = await fetch("http://localhost:3000/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((r) => r.json())
        .catch((e) => {
          console.log(e);
        });
      console.log(res);
      this.articles = res;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin: 0 10em;
}
li {
  min-width: 200px;
  min-height: 80px;
  border: 2px solid #f6d33c;
  border-radius: 8px;
  line-height: 80px;
  padding: 0 0.5em;
}

li:hover {
  background-color: #f6d33c;
  color: black;
  box-shadow: 0px 0px 8px 0px #00000025;
}
a {
  text-decoration: none;
  color: black;
  background-color: #f6d33c;
  display: block;
  width: fit-content;
  height: 44px;
  line-height: 44px;
  padding: 0 0.5em;
  border-radius: 8px;
  margin: 0.5em auto;
}
</style>
