/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

export default [
  // Login
  {
    path: "/",
    name: "login.index",
    component: () => import("@/pages/Login/Index"),
    props: true
  },
  // Register (add profile photo)
  {
    path: "/add-photo",
    name: "create.index",
    component: () => import("@/pages/AddPhoto/Index"),
    props: true
  },
  // Connect Facebook
  {
    path: "/connect-facebook",
    name: "connect.index",
    component: () => import("@/pages/Connect/Index"),
    props: true
  },
  // Create Quest
  {
    path: "/create-quest",
    name: "createquest.index",
    component: () => import("@/pages/CreateQuest/Index"),
    props: true
  },
  // Quest Queue
  {
    path: "/quest-queue",
    name: "questqueue.index",
    component: () => import("@/pages/QuestQueue/Index"),
    props: true
  },
  // Feed
  {
    path: "/feed",
    name: "feed.index",
    component: () => import("@/pages/Feed/Index"),
    props: true
  },
  // Setting
  {
    path: "/setting",
    name: "setting.index",
    component: () => import("@/pages/Setting/Index"),
    props: true
  },
  // Profile
  {
    path: "/profile",
    name: "profile.index",
    component: () => import("@/pages/Profile/Index"),
    props: true
  },
  // Explore
  {
    path: "/explore",
    name: "explore.index",
    component: () => import("@/pages/Explore/Index"),
    props: true
  },
  // Quest Objective
  {
    path: "/quest",
    name: "quest.index",
    component: () => import("@/pages/Quest/Index"),
    props: true
  },
  {
    path: "/"
  },

  {
    path: "/*",
    redirect: "/feed"
  }
];
