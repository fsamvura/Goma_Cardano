import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from "sweetalert2";
const options = {
    reverseButtons: true,
    confirmButtonText: "Confirn",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#2db7ff",
}
const $swal = {
  // @ts-ignore
  install: (Vue, options) => {
    Vue.provide("$swal", Swal.mixin(options));
  },
}
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use($swal, options);
});
