<template>
  <popup-modal ref="popup">
    <h2 style="margin-top: 0">{{ title }}</h2>
    <p>{{ message }}</p>
    <div class="btns">
      <button class="cancel-btn" @click="_cancel">{{ cancelButton }}</button>
      <button class="ok-btn" @click="_confirm">{{ okButton }}</button>
    </div>
  </popup-modal>
</template>

<script>
import PopupModal from "./ModalComponent.vue";

export default {
  name: "ConfirmDialog",

  components: { PopupModal },

  data: () => ({
    // Parameters that change depending on the type of dialogue
    title: undefined,
    message: undefined, // Main text content
    okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
    cancelButton: "Go Back", // text for cancel button

    // Private variables
    resolvePromise: undefined,
    rejectPromise: undefined,
  }),

  methods: {
    show(opts = {}) {
      this.title = opts.title;
      this.message = opts.message;
      this.okButton = opts.okButton;
      if (opts.cancelButton) {
        this.cancelButton = opts.cancelButton;
      }
      // Once we set our config, we tell the popup modal to open
      this.$refs.popup.open();
      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },

    _confirm() {
      this.$refs.popup.close();
      this.resolvePromise(true);
    },

    _cancel() {
      this.$refs.popup.close();
      this.resolvePromise(false);
      // Or you can throw an error
      // this.rejectPromise(new Error('User cancelled the dialogue'))
    },
  },
};
</script>

<style scoped>
* {
  font-family: Roboto, sans-serif;
}
.btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.ok-btn {
  background-color: black;
  color: white;
  line-height: 2.5rem;
  cursor: pointer;
  border-radius: 8px;
  padding: 0.5em;
  border: none;
}

.cancel-btn {
  border: none;
  padding: 0.5em;
  background-color: #f6d33c;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
}

.ok-btn:hover {
  background-color: rgb(93, 92, 92);
}

.cancel-btn:hover {
  background-color: #d7b72b;
}
</style>
