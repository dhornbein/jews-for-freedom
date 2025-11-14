<template>
  <ul class="flex justify-center items-center gap-6 text-brand-text flex-wrap">
    <li v-for="link in nav.main" :key="link.href">
      <a :href="link.href" :class="[{ 'btn btn-outline-primary': link.label === 'Sign' }]">{{ link.label }}</a>
    </li>
    <li class="ml-2">
      <SocialIcons />
    </li>
  </ul>
</template>

<script setup lang="ts">
const nav = useNavLinks()
</script>