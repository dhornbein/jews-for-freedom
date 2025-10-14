<template>
  <header class="sticky top-0 z-50 bg-brand-background/80 backdrop-blur border-b border-brand-dark/10">
    <nav class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
      <a href="#hero" class="flex items-center gap-2 font-heading text-lg text-brand-text hover:text-brand-primary transition-colors">
        <Icon name="heroicons-solid:sparkles" class="h-5 w-5 text-brand-primary" />
        <span>Jews for Freedom</span>
      </a>
      <ul class="hidden md:flex items-center gap-6 text-sm font-medium text-brand-text">
        <li v-for="link in nav.main" :key="link.href">
          <a :href="link.href" class="hover:text-brand-primary">{{ link.label }}</a>
        </li>
      </ul>
      <div class="flex items-center gap-3">
        <a :href="nav.cta.href" class="inline-flex items-center rounded-md bg-brand-primary px-3 py-1.5 text-white shadow hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-brand-primary-light">
          {{ nav.cta.label }}
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
// Using auto-imported Icon component from @nuxt/icon; no manual imports per standards
const nav = useNavLinks()
</script>
