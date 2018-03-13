<template>
  <div>
    <v-navigationbar></v-navigationbar>
    <div class="feed">
      <div class="column is-6 is-offset-3">
        <div v-for="(feed, index) in feeds" :key="index" class="card">
          <div class="user">
            <img :src="feed.owner.avatar" alt="avatar" v-if="feed.owner.avatar" />
            <v-gravatar hash="f3ada405ce890b6f8204094deb12d8a8" alt="Nobody" :size="200" default-img="retro" v-if="!feed.owner.avatar" />
            <div class="text">
              <span class="name">
                {{feed.owner.username}}
              </span>
              <span class="address">
                {{feed.owner.address ? feed.owner.address : "unknown"}}
              </span>
            </div>
          </div>
          <div class="picture">
            <progressive-img
              :src="feed.containObjectives[0].image"
              placeholder="https://unsplash.it/1920/1080?image=10"
            />
          </div>
          <div class="detail">
            <div>
              <span class="title">
                {{feed.title}}
              </span>
            </div>
            <div>
              <span class="description">
                {{feed.description}}
              </span>
            </div>
            <div class="icons">
              <i class="fa fa-heart fa-lg" aria-hidden="true"></i>
              <i class="fa fa-comment fa-lg" aria-hidden="true"></i>
              <i class="fa fa-bookmark fa-lg bookmark" aria-hidden="true"></i>
            </div>
            <div class="likes">
              <span>
                0 likes
              </span>
            </div>
            <div class="objective">
              <div>
                <span class="value">
                  0
                </span>
              </div>
              <div>
                <span class="time">
                  2 DAYS AGO
                </span>
              </div>
            </div>
            <div class="comment">
              <b-input
                type="email"
                placeholder="Add a comment..."
                required
              />
              <button class="button is-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueProgressiveImage from 'vue-progressive-image';
  import Gravatar from 'vue-gravatar';
  import VNavigationbar from '@/layouts/NavigationBar';
  import { fetchAllQuestQuery } from '../../graphql/queries/quest';
  import { fetchAllObjectiveQuery } from '../../graphql/queries/objective';

  Vue.use(VueProgressiveImage);

  export default {
    name: 'createquest-index',
    components: {
      VNavigationbar,
      'v-gravatar': Gravatar,
    },
    data() {
      return {
        title: '',
        description: '',
        feeds: [],
        objectives: [],
        imageArray: [],
      };
    },
    created() {
      this.$apollo.query({
        query: fetchAllQuestQuery,
      }).then((response) => {
        this.feeds = response.data.allQuests;
        console.log(this.feeds);
      }).catch((error) => {
        console.log(error);
      });
      this.$apollo.query({
        query: fetchAllObjectiveQuery,
      }).then((response) => {
        this.objectives = response.data.allObjectives;
        // console.log(this.objectives);
      }).catch((error) => {
        console.log(error);
      });
    },
    methods: {
      onLoad() {
      },
      onLoadPlaceholder() {
        // placeholder image is loaded
      },
      onError() {
        // this.$apollo.query({
        //   query: filteredObjectiveQuery,
        //   variables: {
        //     questId: id,
        //   },
        // }).then((response) => {
        //   const temp = {
        //     id,
        //     objects: response.data.allObjectives,
        //   };
        //   this.imageArray.push(temp);
        // }).catch((error) => {
        //   console.log(error);
        // });
      },
      onErrorPlaceholder(error) {
        // placeholder image error
        console.log('placeholder', error);
      },
      getImageUrl(id) {
        // console.log('id', id);
        let url = '';
        if (this.imageArray.length) {
          const response = this.imageArray.find((el) => {
            return el.id === id;
          });
          url = response && response.objects[0].image;
        }
        // console.log('url', url);
        return url;
      },
    },
  };
</script>
