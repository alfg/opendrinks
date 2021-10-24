<template>
  <div id="recipe-find">
    <b-form-input @keydown.enter="onEnter" v-on:keydown="onKeydown" v-model.trim="search">
    </b-form-input>

    <b-form-group class="mt-2" :label="`${$t('Filter by')}:`">
      <b-form-radio-group v-model="selectedSearch" name="selectedSearch">
        <b-form-radio value="name">{{ $t('Name') }}</b-form-radio>
        <b-form-radio
          v-b-tooltip.hover
          :title="$t('You can search for multiple ingredients by separating them with a space')"
          value="ingredients"
          >{{ $t('Ingredients') }}</b-form-radio
        >
        <b-form-radio
          v-b-tooltip.hover
          :title="$t('You can search for multiple keywords by separating them with a space')"
          value="keywords"
          >{{ $t('Keywords') }}</b-form-radio
        >
      </b-form-radio-group>
    </b-form-group>

    <b-list-group class="mt-4" v-if="search.length > 0">
      <b-list-group-item
        v-for="o in filterResults"
        v-bind:key="o.name"
        v-on:mouseover="onMouseOverOrMove"
        v-on:mouseleave="onMouseLeave"
        v-on:mousemove="onMouseOverOrMove"
        :to="'/recipe/' + o.filename"
        >{{ o.name }}</b-list-group-item
      >
    </b-list-group>
  </div>
</template>

<script>
import recipes from '../recipes';

const LIMIT = 50; // Limit filtered results.

export default {
  name: 'RecipeFind',
  data() {
    return {
      data: [],
      selectedSearch: 'name',
      search: '',
    };
  },
  computed: {
    filterResults() {
      const searchParts = this.search
        .toLowerCase()
        .normalize('NFD') // remove accents from string
        .replace(/[\u0300-\u036f]/g, '') // remove accents and diacritics in the Combining Diacritical Marks Unicode block
        .split(' ');

      const isNameEnabled = this.selectedSearch === 'name';
      const isIngredientsEnabled = this.selectedSearch === 'ingredients';
      const isKeywordsEnabled = this.selectedSearch === 'keywords';

      let filtered = [];

      if (isNameEnabled) {
        filtered = this.data.filter(
          recipe =>
            recipe.name
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .indexOf(this.search.toLowerCase()) > -1,
        );
      }

      if (isIngredientsEnabled) {
        filtered = this.data.filter(recipe =>
          searchParts.every(s =>
            recipe.ingredients.some(i =>
              i.ingredient
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(s.toLowerCase()),
            ),
          ),
        );
      }

      if (isKeywordsEnabled) {
        filtered = this.data.filter(recipe =>
          searchParts.every(
            s =>
              recipe.keywords &&
              recipe.keywords.some(k => k.toLowerCase().includes(s.toLowerCase())),
          ),
        );
      }

      // Sort the results.
      filtered = filtered.sort((recipeA, recipeB) => {
        // Name-matches to the top if the user wanted to find a drink based on the name
        const hasName = recipeB.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ? 1 : -1;

        // Doesn't seem to be used. Disabling for now.
        // const alphabetical = recipeB.name.toLowerCase() > recipeB.name.toLowerCase() ? -1 : 1;
        return !isNameEnabled ? 0 : hasName;
      });

      return filtered.slice(0, LIMIT);
    },
  },
  created() {
    const data = recipes.getRecipes();
    this.data = data;
    window.document.title = 'Open Drinks - Search';
  },
  methods: {
    onMouseOverOrMove(event) {
      // we add 'highlight' class when ever mouse is active on an element
      const hoveredElement = event.target;
      if (hoveredElement.classList.contains('highlight')) return;

      const currentHighlightedComponent = this.$children.find(component => {
        return component.$el && component.$el.classList.contains('highlight');
      });
      if (currentHighlightedComponent)
        currentHighlightedComponent.$el.classList.remove('highlight');
      hoveredElement.classList.add('highlight');
    },
    onMouseLeave(event) {
      // we remove the "highlight" class after mouse leave
      const hoveredElement = event.target;
      hoveredElement.classList.remove('highlight');
    },
    onEnter() {
      const listElements = this.$children.filter(component => {
        return component.$el && component.$el.classList.contains('list-group-item');
      });
      const currentHighlightedComponentIndex = listElements.findIndex(component => {
        return component.$el && component.$el.classList.contains('highlight');
      });
      const index = currentHighlightedComponentIndex > 0 ? currentHighlightedComponentIndex : 0;

      this.$router.push({
        name: 'recipe',
        params: { id: this.filterResults[index].filename },
      });
    },
    onKeydown(event) {
      const listElements = this.$children.filter(component => {
        return component.$el && component.$el.classList.contains('list-group-item');
      });
      if (listElements.length === 0) {
        return;
      }
      const currentHighlightedComponent = listElements.find(component => {
        return component.$el && component.$el.classList.contains('highlight');
      });
      const firstListElement = listElements[0].$el;
      const lastListElement = listElements[listElements.length - 1].$el;
      let nextElement;

      if (event.keyCode === 40) {
        // key down
        nextElement = currentHighlightedComponent
          ? currentHighlightedComponent.$el.nextSibling
          : firstListElement;
      } else if (event.keyCode === 38) {
        // key up
        nextElement = currentHighlightedComponent
          ? currentHighlightedComponent.$el.previousSibling
          : lastListElement;
      }
      if (currentHighlightedComponent)
        currentHighlightedComponent.$el.classList.remove('highlight');
      if (nextElement) nextElement.classList.add('highlight');
    },
  },
};
</script>

<i18n>
{
  "ja": {
    "Filter by": "検索条件",
    "Name": "名前",
    "Ingredients": "材料",
    "Keywords": "キーワード",
    "You can search for multiple ingredients by separating them with a space": "スペースで区切ることで複数の材料で検索できます",
    "You can search for multiple keywords by separating them with a space": "スペースで区切ることで複数のキーワードで検索できます"
  },
  "fr": {
    "Filter by": "Filtrer par",
    "Name": "Nom",
    "Ingredients": "Ingrédients",
    "Keywords": "Mots-clés",
    "You can search for multiple ingredients by separating them with a space": "Vous pouvez chercher avec plusieurs ingrédients en les séparants avec un espace",
    "You can search for multiple keywords by separating them with a space": "Vous pouvez chercher avec plusieurs mots-clés en les séparants avec un espace"
  },
  "es": {
    "Filter by": "Filtrar por",
    "Name": "Nombre",
    "Ingredients": "Ingredientes",
    "Keywords": "Palabras Clave",
    "You can search for multiple ingredients by separating them with a space": "Puedes buscar múltiples ingredientes separandolos con espacios",
    "You can search for multiple keywords by separating them with a space": "Puedes buscar múltiples palabras claves separandolas con espacios"
  },
  "hi": {
    "Filter by": "छाने",
    "Name": "नाम",
    "Ingredients": "सामग्री",
    "Keywords": "सूचक-शब्द",
    "You can search for multiple ingredients by separating them with a space": "आप कई सामग्रियों को खोज सकते हैं उनके बीच खाली स्थान छोड़कर",
    "You can search for multiple keywords by separating them with a space": "आप कई सूचक-शब्द को खोज सकते हैं उनके बीच खाली स्थान छोड़कर"
  },
  "ar": {
    "Filter by": "صنّف حسب",
    "Name": "الإسم",
    "Ingredients": "المكوّنات",
    "Keywords": "الكلمات المفاتيح",
    "You can search for multiple ingredients by separating them with a space": "يمكنك البحث عن مكونات متعددة عن طريق فصلها بمسافة",
    "You can search for multiple keywords by separating them with a space": "يمكنك البحث عن عدة كلمات رئيسية عن طريق فصلها بمسافة"
  },
  "gl": {
    "Filter by": "Filtrar por",
    "Name": "Nomee",
    "Ingredients": "Ingredientes",
    "Keywords": "Palabras chave",
    "You can search for multiple ingredients by separating them with a space": "Podes buscar múltiples ingredientes separándoos con espazos",
    "You can search for multiple keywords by separating them with a space": "Podes buscar múltiples palabras craves separándoas con espazos"
  },
  "de": {
    "Filter by": "Filtern nach",
    "Name": "Name",
    "Ingredients": "Zutaten",
    "Keywords": "Schlüsselwörter",
    "You can search for multiple ingredients by separating them with a space": "Sie können nach mehreren Zutaten suchen, indem Sie diese durch ein Leerzeichen trennen",
    "You can search for multiple keywords by separating them with a space": "Sie können nach mehreren Stichwörtern suchen, indem Sie diese durch ein Leerzeichen trennen"
  },
  "nl": {
    "Filter by": "Filter op",
    "Name": "Naam",
    "Ingredients": "Ingrediënten",
    "Keywords": "Trefwoorden",
    "You can search for multiple ingredients by separating them with a space": "Je kunt zoeken op meerdere ingrediënten door ze met een spatie te scheiden",
    "You can search for multiple keywords by separating them with a space": "Je kunt zoeken op meerdere trefwoorden door ze met een spatie te scheiden"
  },
  "no": {
    "Filter by": "Filtrer etter",
    "Name": "Navn",
    "Ingredients": "Ingredienser",
    "Keywords": "Nøkkelord",
    "You can search for multiple ingredients by separating them with a space": "Du kan søke etter flere ingredienser ved å skille dem med et mellomrom",
    "You can search for multiple keywords by separating them with a space": "Du kan søke etter flere nøkkelord ved å skille dem med et mellomrom"
  },
  "ru": {
    "Filter by": "Фильтровать по",
    "Name": "Название",
    "Ingredients": "Ингредиенты",
    "Keywords": "Ключевые слова",
    "You can search for multiple ingredients by separating them with a space": "Вы можете искать несколько ингредиентов, разделяя их пробелом",
    "You can search for multiple keywords by separating them with a space": "Вы можете искать несколько ключевых слов, разделяя их пробелом"
  },
  "uk": {
    "Filter by": "Фільтрувати за",
    "Name": "Назва",
    "Ingredients": "Інгредієнти",
    "Keywords": "Ключові слова",
    "You can search for multiple ingredients by separating them with a space": "Ви можете шукати кілька інгредієнтів, розділяючи їх пробілом",
    "You can search for multiple keywords by separating them with a space": "Ви можете шукати кілька ключових слів, розділяючи їх пробілом"
  },
  "bn": {
    "Filter by": "ফিল্টার করার নির্ণায়কসমুহ  ",
    "Name": "নাম",
    "Ingredients": "উপকরণ সামগ্রী",
    "Keywords": "কীওয়ার্ড সমূহ",
    "You can search for multiple ingredients by separating them with a space": "আপনি একটি স্পেস দিয়ে আলাদা করে একাধিক উপাদান অনুসন্ধান করতে পারেন",
    "You can search for multiple keywords by separating them with a space": "আপনি একটি স্পেস দিয়ে আলাদা করে একাধিক কীওয়ার্ড অনুসন্ধান করতে পারেন"
  },
  "it": {
    "Filter by": "Filtra per",
    "Name": "Nome",
    "Ingredients": "Ingredienti",
    "Keywords": "Parole chiave",
    "You can search for multiple ingredients by separating them with a space": "Puoi fare una ricerca utilizzando più ingredienti separandoli con uno spazio",
    "You can search for multiple keywords by separating them with a space": "Puoi fare una ricerca utilizzando più parole chiave separandole con uno spazio"
  },
  "np": {
    "Filter by": "छाने",
    "Name": "नाम",
    "Ingredients": "सामग्री",
    "Keywords": "मुख्य-शब्द",
    "You can search for multiple ingredients by separating them with a space": "तपाइँ उनीहरु को बीच रिक्त स्थान छोडेर धेरै सामग्रीको लागी खोज्न सक्नुहुन्छ",
    "You can search for multiple keywords by separating them with a space": "तपाइँ उनीहरु को बीच रिक्त स्थान छोडेर धेरै मुख्य-शब्दको लागी खोज्न सक्नुहुन्छ"
  },
  "pt": {
    "Filter by": "Filtrar por",
    "Name": "Nome",
    "Ingredients": "Ingredientes",
    "Keywords": "Palavra-chave",
    "You can search for multiple ingredients by separating them with a space": "Você pode buscar por múltiplos ingredientes separando-os com um espaço",
    "You can search for multiple keywords by separating them with a space": "Você pode buscar por múltiplas palavras-chave separando-as com um espaço"
  },
  "zh": {
    "Filter by": "筛选条件",
    "Name": "名称",
    "Ingredients": "用料",
    "Keywords": "关键词",
    "You can search for multiple ingredients by separating them with a space": "您可以用空格分隔多个用料在搜索里",
    "You can search for multiple keywords by separating them with a space": "您可以用空格分隔多个关键字在搜索里"
  },
  "vi": {
    "Filter by": "Lọc theo",
    "Name": "Tên",
    "Ingredients": "Nguyên liệu",
    "Keywords": "Từ khóa",
    "You can search for multiple ingredients by separating them with a space": "Khi tìm kiếm với nhiều nguyên liệu thì các nguyên liệu phải cách nhau bởi một khoảng trắng",
    "You can search for multiple keywords by separating them with a space": "Khi tìm kiếm với nhiều từ khóa thì các từ khóa phải cách nhau bởi một khoảng trắng"
  },
  "th": {
    "Filter by": "คัดกรองโดย",
    "Name": "ชื่อ",
    "Ingredients": "ส่วนประกอบ",
    "Keywords": "คำค้นหาสำคัญ",
    "You can search for multiple ingredients by separating them with a space": "คุณสามารถค้นหาด้วยส่วนประอบหลายอย่างโดยใช้เว้นวรรคแยกคำ",
    "You can search for multiple keywords by separating them with a space": "คุณสามารถค้นหาด้วยคีย์เวิร์ดหลายตัวโดยใช้เว้นวรรคแยกคำ"
  }
}
</i18n>
