<template>
  <footer class="border-t border-brand-dark/10 bg-white/70 backdrop-blur">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 grid gap-8 md:grid-cols-3 text-sm text-brand-text">
      <div>
        <NuxtImg
          src="/logo-long.png"
          alt="Jews for Freedom"
          class="max-w-screen-sm w-full mx-auto object-contain"
        />
        <p class="mt-4 text-lg text-brand-text/80 max-w-screen-sm mx-auto">
          Mobilizing American Jews in defense of democratic values.
        </p>
      </div>
      <nav class="grid gap-2 grid-cols-3 text-center text-lg">
        <a v-for="link in nav.main" :key="link.href" :href="link.href" class="hover:text-brand-primary"  :class="[{ 'btn btn-outline-primary col-span-full mb-8': link.label === 'Sign' }]">{{ link.label }}</a>
      </nav>
      <div class="flex justify-around opacity-80">
        <a v-for="link in nav.legal" :key="link.href" :href="link.href" class="hover:text-brand-primary">{{ link.label }}</a>
      </div>
      <p class="text-brand-text/60 text-center">© {{ new Date().getFullYear() }} Jews for Freedom</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const nav = useNavLinks()
</script>
