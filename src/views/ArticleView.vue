<template>
  <div>
    <h2>{{ article.title }}</h2>
    <p>{{ article.description }}</p>
    <p>{{ article.brand }}</p>
    <p>{{ article.price }}{{ article.currency }}</p>
  </div>
  <div id="btns">
    <router-link :to="{ name: 'edit', params: { id: this.$route.params.id } }"
      >Edit</router-link
    >
    <button id="delete" @click="deleteProduct">Delete</button>
    <router-link id="back" to="/">Back to list</router-link>
    <teleport to="body">
      <ConfirmDialog ref="confirmDialogue"></ConfirmDialog>
    </teleport>
  </div>
</template>
<script>
import ConfirmDialog from "../components/ConfirmDialog.vue";
export default {
  components: {
    ConfirmDialog,
  },
  data() {
    return {
      article: {},
      showModal: false,
    };
  },
  mounted() {
    this.fetchArticle();
  },
  methods: {
    fetchArticle: async function () {
      let res = await fetch(
        `http://localhost:3000/article/${this.$route.params.id}`
      )
        .then((r) => r.json())
        .catch((e) => console.log(e));
      console.log(res);
      if (res.message === "Not Found")
        this.article = { title: "No product found" };
      this.article = res;
    },
    deleteProduct: async function () {
      const ok = await this.$refs.confirmDialogue.show({
        title: "Delete Page",
        message:
          "Are you sure you want to delete this product? It cannot be undone.",
        okButton: "Delete Forever",
      });
      if (!ok) return;
      let res = await fetch(
        `http://localhost:3000/delete/${this.$route.params.id}`,
        {
          method: "DELETE",
        }
      )
        .then((r) => r.json())
        .catch((e) => console.log(e));
      if (!res.id) {
        console.log(res);
        alert("A problem was encountered.");
        return;
      }
      alert("The delete was successful.");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
#btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2em;
}
h2 {
  color: #f6d33c;
}
p {
  max-width: 400px;
  margin: 0 auto;
  padding: 0.5em 0;
}
a {
  text-decoration: none;
  color: black;
  background-color: #f6d33c;
  display: block;
  width: fit-content;
  height: 34px;
  line-height: 34px;
  padding: 0 1em;
  border-radius: 8px;
}

a:hover {
  padding: 0.2em 1.2em;
}

#delete {
  background-color: rgb(217, 83, 83);
  border: none;
  padding: 0.5em;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-size: 16px;
}

#delete:hover {
  padding: 0.6em;
}

#back {
  background-color: rgb(141, 199, 201);
  line-height: 38px;
}
</style>
