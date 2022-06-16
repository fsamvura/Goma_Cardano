<template>
  <div :class="$attrs['class']">
    <label v-if="label" :for="id" class="font-semibold">{{ label }}</label>
    <select :id="id" :placeholder="placeholder" class="select select-success w-full text-gray-900 font-normal"
      @change="handleSelectedItem">
      <option v-for="option in options" :key="option[trackBy]" :value="option[trackBy]" :disabled="option.disabled"
        class="py-1 rounded-none">
        {{ option[selectLabel] }}
      </option>
    </select>
    <span v-if="errorMessage || meta.valid" class="invalid-feedback">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script>
import { getUniqueID, strtolower } from "@/utils/str-utils";
import { useField } from "vee-validate";

export default {
  inheritAttrs: false,
  emits: ["selected-option", "update:modelValue", "selectedValueChanged"],
  props: {
    id: {
      type: String,
      default() {
        return `select-input-${getUniqueID()}`;
      },
    },
    type: {
      type: String,
      default: "text",
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
    selectLabel: {
      type: String,
      default: "designation",
    },
    trackBy: {
      type: String,
      default: "id",
    },
    source: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: [String, Number],
      default: null,
    },
    placeholder: {
      type: String,
      default: "Choisissez l'option",
    },
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    labelClass: {
      type: String,
      default: "",
    },
    params: {
      type: Object,
      default: null,
    },
    orderBy: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, props.rules, {
      label: strtolower(props.label),
      initialValue: props.modelValue,
    });

    const handleSelectedItem = (event) => {
      if (event?.target?.value) {
        handleChange(event?.target?.value);
      }
      // if (val === undefined) {
      //   console.error("Vérifiez votre props [trackBy]");
      // }
      // handleChange(val);

      // emit("selectedValueChanged", val);
      // emit("update:modelValue", val);
    };

    return {
      meta,
      inputValue,
      handleBlur,
      handleChange,
      errorMessage,
      handleSelectedItem,
    };
  },
};
</script>
<style scoped>
.select {
  display: inline-flex;
  flex-shrink: 0;
  cursor: pointer;
  height: 2.65rem;
  padding-left: 1rem;
  padding-right: 2.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  line-height: 2;
  border-width: 1px;
  border-color: rgb(216 217 219);
  --tw-border-opacity: 0;
  --tw-bg-opacity: 1;
  font-weight: 600;
  transition-property: color, background-color, border-color, fill, stroke,
    opacity, box-shadow, transform, filter, -webkit-text-decoration-color,
    -webkit-backdrop-filter;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: var(--rounded-btn, 0.5rem);
  background-image: linear-gradient(45deg, transparent 50%, currentColor 0),
    linear-gradient(135deg, currentColor 50%, transparent 0);
  background-position: calc(100% - 20px) calc(1px + 50%),
    calc(100% - 16px) calc(1px + 50%);
  background-size: 4px 4px, 4px 4px;
  background-repeat: no-repeat;
}
</style>