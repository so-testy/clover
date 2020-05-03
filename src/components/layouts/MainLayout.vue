<template>
  <div class="main-layout">
    <main-header />
    <div class="content-wrapper">
      <div class="heading">
        <div class="left">
          <div class="back-button" v-if="backButton" @click="$router.go(-1)"><img src="../../assets/back.svg" /></div>
          <h1>{{ title }}</h1>
          <slot name="filters" />
        </div>
        <slot name="createButton" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';

export default {
  components: {
    MainHeader,
  },
  props: {
    title: String,
    backButton: Boolean,
  },
};
</script>

<style lang="scss">
.content-wrapper {
  width: 100%;
  max-width: 980px;
  padding: 0 30px;
  margin: 0 auto;

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;

    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .back-button {
        margin-left: -30px;
        margin-top: 3px;
        margin-right: 5px;
        cursor: pointer;

        img {
          width: 25px;
        }
      }

      h1 {
        font-family: Gilroy;
        font-size: 32px;
        line-height: 1;
        letter-spacing: 0.06em;
      }
    }
  }
}
</style>
