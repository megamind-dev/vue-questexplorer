<template>
  <div>
    <v-navigationbar></v-navigationbar>
    <div class="create-quest">
      <div class="column is-6 is-offset-3">
        <div class="suggest">
          <div class="content column is-8 is-offset-2">
            <span class="title">
              Quest Queue
            </span>
            <p class="comment">
              After <span @click="goSubmitQuest">submitting a quest</span>, your quest will show up here for review.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VNavigationbar from '@/layouts/NavigationBar';
  
  export default {
    name: 'createquest-index',
    components: {
      VNavigationbar,
    },
    data() {
      return {
        title: '',
        description: '',
        rows: [
          {
            id: 1,
            title: '',
          },
        ],
      };
    },
    methods: {
      goSubmitQuest() {
        this.$router.push('create-quest');
      },
    },
  };
</script>
