<template>
  <footer class="border-t border-brand-dark/10 bg-white/70 backdrop-blur">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3 text-sm text-brand-text">
      <div>
        <p class="font-heading text-lg">Jews for Freedom</p>
        <p class="mt-2 text-brand-text/80">Mobilizing American Jews in defense of democratic values.</p>
      </div>
      <nav class="grid gap-2">
        <a v-for="link in nav.main" :key="link.href" :href="link.href" class="hover:text-brand-primary">{{ link.label }}</a>
      </nav>
      <div class="grid gap-2">
        <a v-for="link in nav.legal" :key="link.href" :href="link.href" class="hover:text-brand-primary">{{ link.label }}</a>
        <p class="text-brand-text/60">© {{ new Date().getFullYear() }} Jews for Freedom</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const nav = useNavLinks()
</script>
