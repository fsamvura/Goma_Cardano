<template>
  <button v-bind="$attrs" type="button"
    class=" px-6 py-2 border-2 font-medium text-xs leading-tight hover:bg-opacity-8 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
    <slot />
  </button>
</template>