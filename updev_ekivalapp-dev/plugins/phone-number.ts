import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';

const globalOptions = {
  mode: 'auto',
};

/* add font awesome icon component */
// Vue.component('font-awesome-icon', FontAwesomeIcon)
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueTelInput, globalOptions);
})