<template>
  <header 
    class="sticky top-0 z-50 bg-brand-background/80 backdrop-blur border-b border-brand-dark/10 transition-all duration-500 ease-out"
    :class="isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'"
  >
    <nav class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
      <a href="#hero" class="flex items-center gap-2 font-heading text-lg text-brand-text hover:text-brand-primary transition-all duration-300">
        <NuxtImg 
          src="/logo-long.png" 
          alt="Jews for Freedom" 
          class="h-8"
        />
      </a>
      <ul class="hidden md:flex items-center gap-6 text-sm font-medium text-brand-text">
        <li v-for="link in nav.main" :key="link.href">
          <a :href="link.href" class="hover:text-brand-primary">{{ link.label }}</a>
        </li>
      </ul>
      <div class="flex items-center gap-3">
        <a :href="nav.cta.href" class="btn btn-primary btn-sm">
            <span class="block md:hidden">{{ nav.cta.label.split(' ')[0] }}</span>
            <span class="hidden md:block">{{ nav.cta.label }}</span>
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const nav = useNavLinks()

const isScrolled = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 400
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
