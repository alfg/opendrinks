<template>
  <b-container class="main d-flex align-items-center justify-content-center">
    <div class="row">
      <div class="col-md-12 text-center">
        <span class="display-1 d-block">404</span>
        <div class="mb-4 lead">{{ $t('The page you are looking for was not found.') }}</div>
        <b-link to="/">{{ $t('Back to Home') }}</b-link>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'PageNotFound',
};
</script>

<style scoped>
.main {
  min-height: 50vh;
}
</style>

<i18n>
{
  "ja": {
    "The page you are looking for was not found.": "お探しのページは見つかりませんでした。",
    "Back to Home": "ホームに戻る"
  }
}
</i18n>
