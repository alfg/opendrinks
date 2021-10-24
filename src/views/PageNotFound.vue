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
  },
  "fr": {
    "The page you are looking for was not found.": "Page non trouvée",
    "Back to Home": "Retour à l'accueil"
  },
  "es": {
    "The page you are looking for was not found.": "No se encontró la página que estás buscando",
    "Back to Home": "Volver al Inicio"
  },
  "hi": {
    "The page you are looking for was not found.": "आप जिस पृष्ठ की तलाश कर रहे हैं वह नहीं मिला।",
    "Back to Home": "घर वापसी"
  },
  "ar": {
    "The page you are looking for was not found.": "الصفحة التي تبحث عنها غير موجودة",
    "Back to Home": "العودة إلى الصّفحة الرّئيسيّة"
  },
  "gl": {
    "The page you are looking for was not found.": "Non se atopou a páxina que estás a buscar",
    "Back to Home": "Volver ao comezo"
  },
  "de": {
    "The page you are looking for was not found.": "Diese Seite ist nicht verfügbar.",
    "Back to Home": "Zur Homepage"
  },
  "nl": {
    "The page you are looking for was not found.": "Deze pagina is niet beschikbaar.",
    "Back to Home": "Naar de homepage"
  },
  "no": {
    "The page you are looking for was not found.": "Siden du leter etter ble ikke funnet.",
    "Back to Home": "Tilbake til hjem"
  },
  "bn": {
    "The page you are looking for was not found.": "আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি",
    "Back to Home": "হোমপেজে ফিরে যান"
  },
  "it": {
    "The page you are looking for was not found.": "La pagina che stai cercando non è disponibile.",
    "Back to Home": "Torna in Home"
  },
  "np": {
    "The page you are looking for was not found.": "तपाईंले खोजिरहनुभएको पृष्ठ भेटिएन।",
    "Back to Home": "घर फिर्ता"
  },
  "pt": {
    "The page you are looking for was not found.": "A página procurada não foi encontrada.",
    "Back to Home": "Voltar para página inicial"
  },
  "ru": {
    "The page you are looking for was not found.": "Страница, которую вы ищете, не найдена",
    "Back to Home": "Вернуться домой"
  },
  "uk": {
    "The page you are looking for was not found.": "Сторінку, яку ви шукаєте, не знайдено",
    "Back to Home": "Повернутися додому"
  },
  "zh": {
    "The page you are looking for was not found.": "未找到您要查找的页面。",
    "Back to Home": "返回首页"
  },
  "vi": {
    "The page you are looking for was not found.": "Trang bạn đang tìm kiếm không tồn tại.",
    "Back to Home": "Quay lại trang chủ"
  },
  "th": {
    "The page you are looking for was not found.": "ไม่พบหน้าที่คุณต้องการดู",
    "Back to Home": "กลับไปหน้าแรก"
  }
}
</i18n>
