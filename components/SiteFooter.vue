<template>
  <footer class="border-t border-brand-dark/10 bg-white/70 backdrop-blur">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 grid gap-8 lg:gap-16 md:grid-cols-3 text-sm text-brand-text">
      <div>
        <NuxtImg
          src="/logo-long.png"
          alt="Jews for Freedom"
          class="max-w-screen-sm w-full mx-auto object-contain"
        />
        <p class="mt-4 text-lg text-brand-text/80 max-w-screen-sm mx-auto">
          Mobilizing American Jews in defense of democratic values.
        </p>
        <div class="w-full sm:w-auto flex items-center gap-4 justify-center sm:justify-start mt-4">
          <SocialIcons />
        </div>
      </div>
      <nav class="grid gap-2 grid-cols-3 text-center text-lg md:col-span-2">
        <a :href="nav.cta.href" class="btn btn-outline-primary col-span-full mb-8">
            {{ nav.cta.label }}
        </a>
        <a v-for="link in nav.main" :key="link.href" :href="link.href" class="hover:text-brand-primary"  :class="[{ 'hidden': link.label === 'Sign' }]">{{ link.label }}</a>
      </nav>
      <div class="flex justify-around sm:justify-start sm:items-end opacity-80 flex-wrap sm:col-span-full gap-6">
        <a v-for="link in nav.legal" :key="link.href" :href="link.href" class="hover:text-brand-primary">{{ link.label }}</a>
        <p class="text-brand-text/60 text-center w-full mt-8 sm:text-left sm:mt-0">© {{ new Date().getFullYear() }} Jews for Freedom</p>
      </div>
    </div>
    <div class="bg-[url('/img/fists-fg.png'),url('/img/fists-mg.png')] bg-repeat-x bg-blend-soft-light bg-bottom" style="background-size: auto 10rem;">
      <NuxtImg src="/img/shofar-fist.png" alt="A strong arm holding a Shofar horn proudly" class="mx-auto md:max-h-[80vh]" aria-hidden="true" />
    </div>
  </footer>
</template>

<script setup lang="ts">
const nav = useNavLinks()
</script>
