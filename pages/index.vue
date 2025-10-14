<template>
  <div>
    <!-- Hero / Introduction -->
    <section id="hero" class="py-16 sm:py-24">
      <div class="mx-auto max-w-5xl px-4">
        <article v-if="introduction" class="prose prose-neutral max-w-none">
          <ContentRenderer :value="introduction" />
        </article>
        <p v-else class="text-sm text-brand-text/60">Loading…</p>
      </div>
    </section>

    <!-- Statement -->
    <section id="statement" class="py-16 sm:py-24">
      <div class="mx-auto max-w-5xl px-4">
        <article v-if="statement" class="prose prose-neutral max-w-none">
          <ContentRenderer :value="statement" :data="{}" />
        </article>
        <p v-else class="text-sm text-brand-text/60">Loading…</p>
        <div id="an-widget" class="rounded-lg border border-brand-dark/10 bg-white p-4 shadow-sm">
          <PetitionEmbed />
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="py-16 sm:py-24 bg-white/80">
      <div class="mx-auto max-w-5xl px-4">
        <article v-if="aboutUs" class="prose prose-neutral max-w-none">
          <ContentRenderer :value="aboutUs" :data="{}" />
        </article>
        <p v-else class="text-sm text-brand-text/60">Loading…</p>
      </div>
    </section>

    <!-- Partners -->
    <section id="partners" class="py-10 sm:py-16">
      <div class="mx-auto max-w-5xl px-4">
        <h2 class="font-heading text-2xl sm:text-3xl mb-6">Partner Organizations</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
          <a v-for="partner in partners" :key="partner.name" :href="partner.href || '#'" class="group h-16 rounded bg-white/70 border border-brand-dark/10 flex items-center justify-center p-3 hover:border-brand-primary transition-colors" :aria-label="partner.name">
            <img v-if="partner.logo" :src="partner.logo" :alt="partner.name" class="max-h-10 object-contain" />
            <span v-else class="text-brand-text/60 group-hover:text-brand-primary text-sm font-medium">{{ partner.name }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Share / How to Help -->
    <section id="share" class="py-16 sm:py-24">
      <div class="mx-auto max-w-5xl px-4">
        <h2 class="font-heading text-2xl sm:text-3xl mb-4">How to Help</h2>
        <ul class="list-disc pl-6 space-y-1">
          <li>Share this page on social media</li>
          <li>Invite friends by email or text</li>
          <li>Use our toolkit for graphics and copy</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { data: introduction } = await useAsyncData(() => queryCollection('content').path('/introduction').first())
const { data: aboutUs } = await useAsyncData(() => queryCollection('content').path('/about-us').first())
const { data: statement } = await useAsyncData(() => queryCollection('content').path('/statement').first())
const partners = usePartners()

useSeoMeta({
  title: 'Jews for Freedom',
  ogTitle: 'Jews for Freedom — Sign the Statement',
  description: 'Mobilizing American Jews in defense of democratic values. Sign your name and share with your networks.',
  ogDescription: 'Mobilizing American Jews in defense of democratic values. Sign your name and share with your networks.',
  ogType: 'website',
})
</script>
