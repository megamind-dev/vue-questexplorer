<template>
  <div class="login">
    <div class="storeForm">
      <div>
        <span>
          Get the app
        </span>
      </div>
      <div class="columns store-icons">
        <div class="column appstore">
          <img src="../assets/images/app_store.png" alt="app store" />
        </div>
        <div class="column playstore">
          <img src="../assets/images/play_store.png" alt="play store" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SlotMixin from '@/mixins/slot';

  export default {
    name: 'card',
    mixins: [
      SlotMixin,
    ],
  };
</script>
