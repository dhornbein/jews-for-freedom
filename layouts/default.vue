<template>
  <div class="min-h-screen text-brand-text border-t-4 border-brand-primary">
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
