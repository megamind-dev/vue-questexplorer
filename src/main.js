/* ============
 * Main File
 * ============
 *
 * Will initialize the application.
 */

import Vue from 'vue';
import Buefy from 'buefy';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo';

/* ============
 * Plugins
 * ============
 *
 * Import and bootstrap the plugins.
 */

import './plugins/vuex';
import './plugins/axios';
import { i18n } from './plugins/vue-i18n';
import { router } from './plugins/vue-router';
import './plugins/vuex-router-sync';
import './plugins/bulma';
import './plugins/font-awesome';

/* ============
 * Styling
 * ============
 *
 * Import the application styling.
 * Stylus is used for this boilerplate.
 *
 * If you don't want to use Stylus, that's fine!
 * Replace the stylus directory with the CSS preprocessor you want.
 * Import the entry point here & install the webpack loader.
 */

import './styles/app.scss';

/* ============
 * Main App
 * ============
 *
 * Last but not least, we import the main application.
 */

import App from './App';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Buefy);
store.dispatch('auth/check');

// Graph.cool confirguration
const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cjcy0f3hf2deg0124hubreutn' });
const apolloClient = new ApolloClient({
  networkInterface,
});
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

// Install the vue plugin
Vue.use(VueApollo);

/* eslint-disable no-new */
new Vue({
  /**
   * Bind the Vue instance to the HTML.
   */
  el: '#app',

  /**
   * The localization plugin.
   */
  i18n,

  /**
   * The router.
   */
  router,

  /**
   * The Vuex store.
   */
  store,

  /**
   * The Apollo provider.
   */

  apolloProvider,

   /**
   * Will render the application.
   *
   * @param {Function} h Will create an element.
   */
  render: h => h(App),
});
