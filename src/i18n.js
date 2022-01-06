import Vue from 'vue';
import VueI18n from 'vue-i18n';

import ar from './lang/ar';
import bn from './lang/bn';
import de from './lang/de';
import en from './lang/en';
import es from './lang/es';
import fr from './lang/fr';
import gl from './lang/gl';
import hi from './lang/hi';
import it from './lang/it';
import ja from './lang/ja';
import nl from './lang/nl';
import no from './lang/no';
import np from './lang/np';
import pt from './lang/pt';
import ru from './lang/ru';
import th from './lang/th';
import uk from './lang/uk';
import vi from './lang/vi';
import zh from './lang/zh';

Vue.use(VueI18n);

export default new VueI18n({
  locale: (window.navigator.language && window.navigator.language.split('-')[0]) || 'en',
  messages: {
    ar,
    bn,
    de,
    en,
    es,
    fr,
    gl,
    hi,
    it,
    ja,
    nl,
    no,
    np,
    pt,
    ru,
    th,
    uk,
    vi,
    zh,
  },
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});
