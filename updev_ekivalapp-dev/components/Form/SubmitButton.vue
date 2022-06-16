<template>
  <form-base-button :class="[
    rounded ? 'rounded-full' : 'rounded',
    outlined ? ` text-${color}-400` : `bg-${color}-400 text-light-100 hover:text-${color}-400  hover:bg-white `,
    processing ? 'inline-flex items-center opacity-50 disabled-opacity-50' : '',
    full ? `btn-${color}` : ` px-6 py-2 border-2 border-${color}-400 font-medium leading-tight hover:bg-opacity-8`,
  ]" :disabled="processing" v-bind="$attrs" type="submit">
    <template v-if="processing">
      <span class="mr-1"> Processing... </span>
      <Spinner :size="spinnerSize" />
    </template>
    <slot v-else />
  </form-base-button>
</template>

<script>
export default {
  props: {
    rounded: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    full: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "blue",
    },
    processing: {
      type: Boolean,
      required: false,
    },
    spinnerSize: {
      type: [String, Number],
      default: 4,
    },
  },
};
</script>
