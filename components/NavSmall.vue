<template>
  <nav>
    <ul class="flex justify-center items-center gap-6 text-brand-text">
        <li v-for="link in nav.main" :key="link.href">
          <a :href="link.href" class="hover:text-brand-primary underline underline-offset-4 decoration-dotted">{{ link.label }}</a>
        </li>
      </ul>
  </nav>
</template>

<script setup lang="ts">
const nav = useNavLinks()
</script>