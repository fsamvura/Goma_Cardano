import { defineRule, configure } from "vee-validate";
import { required, email, min, max, confirmed, min_value } from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json";
import fr from "@vee-validate/i18n/dist/locale/fr.json";

// define global rules
defineRule("min", min);
defineRule("max", max);
defineRule("email", email);
defineRule("required", required);
defineRule("min_value", min_value);
defineRule("confirmed", confirmed);

// Activate the locale
configure({
  generateMessage: localize({
    fr,
    en,
  }),
});
setLocale("en");

export default defineNuxtPlugin(nuxtApp => {})
