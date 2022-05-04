<template>
  <h1>Register</h1>
  <form @submit.prevent="handleSubmit">
    <label for="firstname">Firstname</label>
    <input type="text" name="firstname" v-model="user.firstname" />
    <label for="lastname">Lastname</label>
    <input type="text" name="lastname" id="lastname" v-model="user.lastname" />
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      v-model="user.password"
    />
    <label for="email">Email</label>
    <input type="email" name="email" id="email" v-model="user.email" />
    <label for="profilePic">Avatar</label>
    <input
      type="file"
      name="profilePic"
      id="profilePic"
      accept="image/"
      @change="onFileChange"
      ref="profilePic"
    />
    <input type="submit" value="Register" />
  </form>
  <p v-if="response !== ''">
    {{ response }} <router-link to="/">Log in to your account</router-link>
  </p>
</template>
<script>
export default {
  data() {
    return {
      user: {},
      response: "",
    };
  },

  mounted() {
    sessionStorage.clear();
  },
  methods: {
    onFileChange: function () {
      const profilePic = this.$refs.profilePic.files[0];
      this.user.profilePic = profilePic;
    },
    handleSubmit: async function () {
      JSON.stringify(this.user.profilePic);
      let formData = new FormData();
      formData.append("firstName", this.user.firstname);
      formData.append("lastName", this.user.lastname);
      formData.append("email", this.user.email);
      formData.append("password", this.user.password);
      formData.append("profilePic", this.user.profilePic);
      let res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        body: formData,
      })
        .then((r) => r.json())
        .catch((e) => console.log(e));
      console.log(res);
      if (res.error) {
        this.response = res.message;
        return;
      }
      this.response = "Registered successfully !";
    },
  },
};
</script>
<style scoped>
label,
input {
  display: block;
}
form {
  width: fit-content;
  display: block;
  margin: 0 auto;
}
</style>
