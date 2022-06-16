<template>
  <!-- <Html :class="`${theme === 'dark' ? 'dark' : ''}`" :lang="locale"> -->
  <Html :lang="locale">

  <Body>
    <NuxtLayout>
      <NuxtPage />
      <ClientOnly>
        <notifications />
      </ClientOnly>
    </NuxtLayout>
  </Body>

  </Html>
</template>

<script lang="ts" setup>
import { AppSetup } from './utils/app'
import { ITheme } from './utils/theme'
AppSetup()
const theme = useState<ITheme>('theme.current')
const locale = useState<string>('locale.setting')
</script>
