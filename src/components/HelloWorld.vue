<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <input
        required
        type="email"
        name="email"
        id="email"
        v-model="user.email"
      />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        required
        v-model="user.password"
      />
      <input type="submit" value="Connect" />
    </form>
  </div>
  <p v-if="error !== ''">{{ error }}</p>
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
      user: {},
      error: "",
    };
  },
  methods: {
    handleSubmit: async function () {
      if (!(this.user.email && this.user.password)) {
        this.error = "All fields required";
        return;
      }
      let res = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(this.user),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .catch((e) => console.log(e));
      if (!res.token) {
        this.error = "Authentication failed";
        return;
      }
      sessionStorage.setItem("token", res.token);
      this.$router.push("/products");
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input,
label {
  display: block;
  margin: 0 auto;
}
input {
  height: 44px;
  border-radius: 16px;
}

label {
  font-size: 20px;
  font-weight: 500;
  padding: 0.5em;
}

input[type="email"],
input[type="password"] {
  border: 2px solid #f6d33c;
}

input[type="submit"] {
  margin-top: 0.5em;
  font-size: 16px;
  border: none;
  background-color: #f6d33c;
  padding: 0.5em;
  cursor: pointer;
}

input[type="submit"]:hover {
  padding: 0.7em;
  box-shadow: 0px 0px 4px 0px #00000035;
}
</style>
