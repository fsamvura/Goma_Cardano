<template>
  <div :class="$attrs['class']">
    <label v-if="label" class="font-semibold" :for="id">{{ label
    }}:</label>
    <!-- <vue-tel-input v-model="phoneRef" mode="international"></vue-tel-input> -->

    <vue-tel-input @blur="handleBlur" @validate="handleInput" :inputOptions="inputOptions"
      :dropdownOptions="dropdownOptions" :preferredCountries="preferredCountries" :defaultCountry="defaultCountry"
      v-model="phoneRef" mode="international"></vue-tel-input>
    <span v-show="errorMessage || meta.valid" class="form-error invalid-feedback text-xs italic">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup>
import { getUniqueID, strtolower } from "@/utils/str-utils";
import { useField } from "vee-validate";

import VueTelInput from '@/modules/vue-tel-input/components/vue-tel-input.vue';

// import { VueTelInput } from 'vue-tel-input';
// import 'vue-tel-input/dist/vue-tel-input.css';

const props = defineProps({
  id: {
    type: String,
    default() {
      return `phone-input-${getUniqueID()}`;
    },
  },
  rules: {
    type: [String, Function, Boolean],
    required: false,
    default: (value) => !!value,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  formatted: {
    type: Boolean,
    default: true,
  },
  error: String,
})

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(props.name, props.rules, {
  label: strtolower(props.label),
  initialValue: props.value,
});
const defaultCountry = "CD";

const preferredCountries = ["CD", "RW", "FR"];

const dropdownOptions = {
  showFlags: true,
  showDialCodeInList: true,
  showDialCodeInSelection: true,
};

const inputOptions = {
  id: props.id,
  name: props.name,
  placeholder: props.placeholder,
  styleClasses: "form-input form-control border-gray-300",
};

const phoneRef = ref(null);

watch(inputValue, (val) => {
  if (val) {
    phoneRef.value = val.toString();
    // phoneRef.value = val.toString().replace("+", "");
  }
})

const handleInput = (value) => {
  if (value.valid) {
    if (props.formatted) {
      inputValue.value = value.number.toString();
      // inputValue.value = value.number.toString().replace("+", "");
    } else {
      inputValue.value = {
        number: value.nationalNumber,
        code: value.countryCallingCode,
      };
    }
  }
};
</script>
