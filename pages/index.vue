<template>
  <div>
    <!-- Hero / Introduction -->
    <section id="hero" class="border-t-4 border-brand-primary overflow-hidden">
      <div class="py-16 bg-blend-color-burn bg-brand-background bg-cover bg-bottom border-b border-brand-background-dark">
        <NuxtImg src="/logo-square.png" alt="Jews for Freedom" class="mx-auto" />
      </div>
      <NavSmall class="my-6" />
    </section>

    <section id="introduction" class="overflow-hidden">
      <div class="mx-auto max-w-prose px-4">
        <article class="prose prose-neutral text-xl leading-relaxed max-w-none">
          <ShapedImage src="/img/arm-poster.png" class="float-right -mr-8 my-0 sm:-mr-14  max-w-[40vw] max-h-[40vh]" />
          <p>Major Jewish organizations and individuals are launching a full-throated and widespread Jewish resistance to authoritarianism as part of a broader multi-faith effort. The overall resistance is occurring across all lines of difference, including race, gender, class, financial status, sexual orientation, age, ability, and religion. Showing up as Jews, as individuals and as communities, is part of a long-standing tradition we take pride in.</p>
        </article>
      </div>
    </section>

    <!-- Parallax Fists -->
    <ParallaxFists class="h-48 -mb-4 z-0 w-full border-b border-brand-background-dark" />

    <!-- Statement -->
    <section id="statement" class="px-8 py-8 z-10 relative bg-white max-w-3xl mx-auto shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
      <div class="mx-auto max-w-prose">
        <p class="text-sm text-gray-400 uppercase mb-4">Sign <span class="lowercase font-serif italic">the</span> Statement</p>
        <article v-if="statement" class="prose prose-neutral max-w-none">
          <ContentRenderer :value="statement" :data="{}" />
        </article>
        <p v-else class="text-sm text-brand-text/60">Loading…</p>
      </div>
      <div id="embed" class="mx-auto max-w-prose px-4 pt-8">
        <FormEmbed :customizations="formCustomizations" />
      </div>
    </section>


    <!-- About -->
    <section id="about" class="py-16 sm:py-24 overflow-hidden">
      <div class="mx-auto max-w-prose px-4">
        <article v-if="aboutUs" class="prose prose-neutral prose-li:marker:text-brand-primary max-w-none">
          <ShapedImage src="/img/not-now-when-poster.png" :threshold="0.4" class="float-right -mr-8 my-0 sm:-mr-14 max-w-[40vw] max-h-[70vh]" />
          <h1>About Us</h1>
          <ContentRenderer :value="aboutUs" :data="{}" />
        </article>
        <p v-else class="text-sm text-brand-text/60">Loading…</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 max-w-screen-xl mx-auto">
        <a v-for="partner in partners" :key="partner.name" :href="partner.href" :aria-label="partner.name">
          <NuxtImg v-if="partner.logo" :src="partner.logo" :alt="partner.name" class="max-h-80 w-full object-contain mx-auto saturate-0 hover:saturate-100" :class="partner.imgClass" />
        </a>
      </div>
    </section>

    <!-- Share / How to Help -->
    <section id="share" class="py-16 sm:py-24">
      <div class="mx-auto max-w-prose px-4">
        <h1 class="mb-6">Spread the Word</h1>
        <ShareButtons 
          :long-text="statementText"
          :url="siteUrl"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import FormEmbed from '~/components/FormEmbed.vue'

const { data: aboutUs } = await useAsyncData(() => queryCollection('content').path('/about-us').first())
const { data: statement } = await useAsyncData(() => queryCollection('content').path('/statement').first())
const partners = usePartners()

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://jewsforfreedom.com'

// Get share text
const { longText: statementText } = useShareText()

const optInStatement = 'Yes, I want to receive follow up emails from the Jews for Freedom campaign and our partners.'

// Form customizations
const formCustomizations = [
  // Change opt-in checkbox label text
  {
    selector: 'label:has(input[name="subscription[group]"])',
    modify: (element: Element) => {
      const label = element as HTMLLabelElement
      // Find the text node (usually the last child after the inputs)
      const textNode = Array.from(label.childNodes).find(
        node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
      )
      if (textNode) {
        textNode.textContent = ` ${optInStatement}`
      }
    }
  }
]

useSeoMeta({
  title: 'Jews for Freedom',
  ogTitle: 'Jews for Freedom — Sign the Statement',
  description: 'Mobilizing American Jews in defense of democratic values. Sign your name and share with your networks.',
  ogDescription: 'Mobilizing American Jews in defense of democratic values. Sign your name and share with your networks.',
  ogType: 'website',
  ogUrl: siteUrl,
  ogImage: `${siteUrl}/og-image.png`,
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Jews for Freedom - Defending Democratic Values',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Jews for Freedom — Sign the Statement',
  twitterDescription: 'Mobilizing American Jews in defense of democratic values. Sign your name and share with your networks.',
  twitterImage: `${siteUrl}/og-image.png`,
  twitterImageAlt: 'Jews for Freedom - Defending Democratic Values',
})

useHead({
  link: [
    { rel: 'canonical', href: siteUrl }
  ]
})
</script>
