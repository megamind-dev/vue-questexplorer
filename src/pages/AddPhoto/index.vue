<template>
  <div>
    <v-navigationbar></v-navigationbar>
    <div class="create">
      <div class="title">
        <p>Quest</p>
      </div>
      <div class="profile">
        <div>
          <img src="../../assets/images/profile.png" alt="profile" />
        </div>
        <div>
          <span class="add">
            Add a profile photo
          </span>
        </div>
        <div>
          <span class="friend">
            Add a profile photo so your friends <br />knows it's you.
          </span>
        </div>
        <div class="custom-dropzone">
          <vue-dropzone
            ref="myVueDropzone"
            id="customdropzone"
            :include-styling="false"
            v-on:vdropzone-file-added="fileLoaded"
            :options="dropzoneOptions"
          />
          <div class="button addPhotoBtn">Add a Profile Photo</div>
        </div>
        <div>
          <button class="button skipBtn" @click="onSkip">Skip</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VNavigationbar from "@/layouts/NavigationBar";
import vue2Dropzone from "vue2-dropzone";
import axios from "axios";
import "vue2-dropzone/dist/vue2Dropzone.css";

import { updateUserMutation } from "../../graphql/mutations/user";

export default {
  name: "create-index",
  components: {
    vueDropzone: vue2Dropzone,
    VNavigationbar
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        previewTemplate: this.template()
      }
    };
  },
  methods: {
    template() {
      return `<div class="dz-preview dz-file-preview">
                <div class="dz-image">
                    <div data-dz-thumbnail-bg></div>
                </div>
                <div class="dz-details">
                    <div class="dz-size"><span data-dz-size></span></div>
                    <div class="dz-filename"><span data-dz-name></span></div>
                </div>
                <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                <div class="dz-error-message"><span data-dz-errormessage></span></div>
                <div class="dz-success-mark"><i class="fa fa-check"></i></div>
                <div class="dz-error-mark"><i class="fa fa-close"></i></div>
            </div>
        `;
    },
    fileLoaded(file) {
      const data = new FormData();
      data.append("data", file);
      axios
        .post(
          "https://api.graph.cool/file/v1/cjcy0f3hf2deg0124hubreutn",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(response => {
          this.$apollo
            .mutate({
              mutation: updateUserMutation,
              variables: {
                id: localStorage.getItem("userId"),
                avatar: response.data.url
              }
            })
            .then(result => {
              // Result
              console.log("update user", result);
              this.$toast.open({
                duration: 5000,
                message: "profile photo is added",
                position: "is-top",
                type: "is-success"
              });
              this.$router.push("connect-facebook");
            })
            .catch(error => {
              // Error
              console.log(error.message);
              this.$toast.open({
                duration: 5000,
                message: error.message,
                position: "is-top",
                type: "is-danger"
              });
            });
        });
    },
    onSkip() {
      this.$router.push("connect-facebook");
    }
  }
};
</script>
