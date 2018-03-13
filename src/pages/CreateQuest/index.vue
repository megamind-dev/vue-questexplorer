<template>
  <div>
    <v-navigationbar></v-navigationbar>
    <div class="create-quest">
      <div class="column is-6 is-offset-3">
        <div class="suggest">
          <div class="content column is-8 is-offset-2">
            <span class="title">
              Suggest a Quest
            </span>
            <p class="comment">
              Use this form to suggest a quest idea! It must pass our
              <span @click="showRuleModal">rigourous test</span> in order to be
              permitted on the site. You can view the status of your quest
              suggestion in the
              <span @click="showQueueModal">moderator queue</span>.
            </p>
            <form @submit="handleSubmit">
              <b-field label="Title">
                <b-input required type="text" v-model="title"> </b-input>
              </b-field>
              <b-field label="Description">
                <b-input required v-model="description"> </b-input>
              </b-field>
              <div v-for="(row, index) in rows" :key="index">
                <b-field
                  v-bind:label="`Objective # ${index + 1}`"
                  class="field"
                >
                  <b-input required v-model="row.title"> </b-input>
                </b-field>
                <!-- // Todo: delete button need to implement
                  <div class="delete">
                    <i class="fa fa-remove delete-button" @click="deleteRow"></i>
                  </div> 
                -->
              </div>
              <div class="btn">
                <button class="button addObjectBtn" @click="addRow">
                  [ Add another objective ]
                </button>
                <button type="submit" class="button submitBtn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VNavigationbar from "@/layouts/NavigationBar";
import { createQuestMutation } from "../../graphql/mutations/quest";
import { createObjectiveMutation } from "../../graphql/mutations/objective";

export default {
  name: "createquest-index",
  components: {
    VNavigationbar
  },
  data() {
    return {
      title: "",
      description: "",
      rows: [
        {
          id: 1,
          title: ""
        }
      ]
    };
  },
  methods: {
    addRow(event) {
      event.preventDefault();
      const arrayCount = this.rows.length;
      this.rows.push({
        id: arrayCount + 1,
        title: ""
      });
    },

    handleSubmit(event) {
      // this.formValidation(); // Todo: detailed form validation needed
      event.preventDefault();
      const { title, description, rows } = this;
      this.$apollo
        .mutate({
          mutation: createQuestMutation,
          variables: {
            title,
            description,
            ownerId: localStorage.getItem("userId")
          }
        })
        .then(data => {
          // Result
          const successCount = this.rows.length;
          let tempCount = 1;
          rows.map(row => {
            this.$apollo
              .mutate({
                mutation: createObjectiveMutation,
                variables: {
                  parentQuestId: data.data.createQuest.id,
                  title: row.title
                }
              })
              .then(response => {
                // Result
                console.log("data", response);
                if (successCount === tempCount) {
                  this.$modal.open(
                    `<div class="create-quest">
                    <div class="column is-8 is-offset-2">
                      <div class="suggest">
                        <div class="content column is-10 is-offset-1">
                          <span class="title">
                            Thank you!
                          </span>
                          <p class="comment">
                            Your quest has been submitted. We will review it asap rocky. To track the status of your submission, please visit the <span @click="goQueue">moderator queue</span>.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>`
                  );
                }
                tempCount++;
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
            return row;
          });
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
    },
    showRuleModal() {
      this.$modal.open(
        `<div class="create-quest">
            <div class="column is-8 is-offset-2">
              <div class="suggest">
                <div class="content column is-10 is-offset-1">
                  <span class="title">
                    Rules!
                  </span>
                  <p class="comment">
                    These are the rules for <span>submitting a quest</span>. <br><br>1. Be nice. <br>2. Be awesome. <br>3. Eat your greens.
                  </p>
                </div>
              </div>
            </div>
          </div>`
      );
    },
    showQueueModal() {
      this.$modal.open(
        `<div class="create-quest">
            <div class="column is-8 is-offset-2">
              <div class="suggest">
                <div class="content column is-10 is-offset-1">
                  <span class="title">
                    Quest Queue
                  </span>
                  <p class="comment">
                    After <span>submitting a quest</span>, your quest will show up here for review.
                  </p>
                </div>
              </div>
            </div>
          </div>`
      );
    },
    goQueue() {
      this.$router.push("quest-queue");
    }
  }
};
</script>
