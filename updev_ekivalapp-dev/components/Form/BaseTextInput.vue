<template>
  <div :class="$attrs['class']">
    <label v-if="label" :for="id" class="font-semibold">{{ label }}</label>
    <div class="form-icon relative">
      <input ref="input" :id="id" :placeholder="placeholder" :type="type" :value="inputValue" class="form-input input"
        @input="handleChange" @blur="handleBlur" :disabled="$attrs['disabled']">
      <slot />
    </div>
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
  props: {
    id: {
      type: String,
      default() {
        return `text-input-${getUniqueID()}`;
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
    labelClass: {
      type: String,
      default: "",
    },
  },
  setup(props) {
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

    return {
      meta,
      inputValue,
      handleBlur,
      handleChange,
      errorMessage,
    };
  },
};
</script>
<style scoped lang="scss">
.input-bordered {
  --tw-border-opacity: 0.2;
}

.input {
  flex-shrink: 1;
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
  height: 2.65rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  line-height: 2;
  border-width: 1px;
  border-color: rgb(216 217 219);
  --tw-border-opacity: 0;
  --tw-bg-opacity: 1;
  border-radius: var(--rounded-btn, 0.5rem);

  &:disabled {
    cursor: not-allowed;
    background-color: #f1f1f1;
  }
}
</style>