<template>
  <transition name="fade" appear>
    <div>
      <h1>Send a file</h1>
      <form @submit.prevent="handleSubmit">
        <label for="file">Please select a csv file to upload</label>
        <input
          type="file"
          name="file"
          id="file"
          accept=".csv"
          @change="handleChange"
          ref="file"
          required
        />
        <input type="submit" value="Send file" />
      </form>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      file: "",
    };
  },
  methods: {
    handleChange: function () {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    handleSubmit: async function () {
      JSON.stringify(this.file);
      let formData = new FormData();
      formData.append("file", this.file);
      let res = await fetch("http://localhost:3000/send-file", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: formData,
      })
        .then((r) => r.json())
        .catch((e) => console.log(e));
      console.log(res);
    },
  },
};
</script>
<style scoped>
label,
input {
  display: block;
}
input {
  margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
