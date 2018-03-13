<template>
  <div>
    <v-navigationbar></v-navigationbar>
    <div class="setting">
      <div class="column is-10 is-offset-1">
        <div class="profile">
          <div class="info">
            <div class="column is-8 is-offset-2">
              <div class="user columns">
                <div class="avatar column is-3">
                  <img :src="userInfo.avatar" alt="avatar" v-if="userInfo.avatar" />
                  <v-gravatar hash="f3ada405ce890b6f8204094deb12d8a8" alt="Nobody" :size="200" default-img="retro" v-if="!userInfo.avatar" />
                </div>
                <div class="detail column is-9">
                  <div class="columns">
                    <div class="column">
                      <span class="name">
                        {{userInfo.fullName}}
                      </span>
                    </div>
                    <div class="column">
                      <div class="columns">
                        <div class="column is-7">
                          <button class="button">
                            Follow
                          </button>
                        </div>
                        <div class="column is-5">
                          <button class="button">
                            More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <span class="count"><strong>{{userInfo.numObjectives}}</strong> objectives</span>
                      <span class="count"><strong>{{userInfo.numObjectives}}</strong> quests</span>
                      <span class="count"><strong>{{userInfo.numObjectives}}</strong> followers</span>
                      <span class="count"><strong>{{userInfo.numObjectives}}</strong> following</span>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <span class="count">{{userInfo.bio ? userInfo.bio : "There is no bio yet"}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="objectives">
                <div v-for="(object, index) in objectives" :key="index">
                  <div class="objective columns">
                    <div class="image column is-3">
                      <img :src="object.image" v-if="object.image"/>
                      <img src="../../assets/images/empty.jpg" v-if="!object.image"/>
                    </div>
                    <div class="column is-9">
                      <span class="title">
                        {{object.title}}
                      </span>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Gravatar from 'vue-gravatar';
  import VueProgressiveImage from 'vue-progressive-image';
  import VNavigationbar from '@/layouts/NavigationBar';
  import { getUserQuery } from '../../graphql/queries/user';
  import { filteredObjectiveQuery } from '../../graphql/queries/objective';
  
  Vue.use(VueProgressiveImage);

  export default {
    name: 'quest-index',
    components: {
      VNavigationbar,
      'v-gravatar': Gravatar,
      // 'progressive-img': VueProgressiveImage,
    },
    data() {
      return {
        userInfo: {
          avatar: '',
        },
        objectives: [],
      };
    },
    created() {
      // Get User Query
      this.$apollo.query({
        query: getUserQuery,
        variables: {
          id: localStorage.getItem('userId'),
        },
      }).then((response) => {
        this.userInfo = response.data.User;
        // console.log(this.userInfo);
      }).catch((error) => {
        console.log(error);
      });
      // Filter Objective Query
      this.$apollo.query({
        query: filteredObjectiveQuery,
        variables: {
          parentQuest: this.$route.query.id,
        },
      }).then((response) => {
        this.objectives = response.data.allObjectives;
        console.log(this.objectives);
      }).catch((error) => {
        console.log(error);
      });
    },
    methods: {
    },
  };
</script>
