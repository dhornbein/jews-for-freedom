<template>
  <div class="min-h-screen bg-brand-background text-brand-text">
    <NavBar />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: 'scroll-smooth',
  },
});
</script>
