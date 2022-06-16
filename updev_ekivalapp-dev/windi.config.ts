import { defineConfig } from 'windicss/helpers'
import type { Plugin } from 'windicss/types/interfaces'

// colors
import colors from 'windicss/colors'

// plugins
import TypographyPlugin from 'windicss/plugin/typography'
import AspectRatioPlugin from 'windicss/plugin/aspect-ratio'
import FiltersPlugin from 'windicss/plugin/filters'

const MyTheme = {
  colors: {
    ekival: {
      50: '#06a5fa',
      100: '#06a5fa',
      200: '#06a5fa',
      300: '#06a5fa',
      400: '#06a5fa',
      500: '#06a5fa',
      600: '#06a5fa',
      700: '#06a5fa',
      800: '#06a5fa',
      900: '#06a5fa',
    },
  },
}

export default defineConfig({
  darkMode: 'class',
  attributify: true,
  extract: {
    include: [
      './components/**/*.{vue,js}',
      './composables/**/*.{js,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './utils/**/*.{js,ts}',
      './app.vue',
    ],
  },
  theme: {
    extend: {
      gridTemplateColumns: {
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      colors: {
        primary: MyTheme.colors.ekival[500],
        gray: colors.gray,
        green: colors.green,
        slate: colors.slate,
        blue: colors.blue,
        orange: colors.orange,
        light: colors.light
      },
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
  },
  shortcuts: {
    'light-img': 'block dark:hidden',
    'dark-img': 'hidden dark:block',
  },
  plugins: [
    // filters plugin require for navbar blur
    FiltersPlugin as Plugin,
    TypographyPlugin as Plugin,
    AspectRatioPlugin as Plugin,
  ] as Plugin[],
})
