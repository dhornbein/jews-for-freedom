<template>
  <div class="overflow-hidden">
    <!-- Hero / Introduction -->
    <section id="hero" class="border-t-4 border-t-brand-primary overflow-hidden">
      <div class="hero mx-auto flex flex-col items-center justify-center
                  sm:flex-row-reverse sm:justify-center
                  sm:bg-[url('/img/hero-bg.jpg')] bg-no-repeat bg-center"
                  style="background-size: cover;">
        <NuxtImg src="/logo-square.png" alt="Jews for Freedom" class="p-4" />
        <NuxtImg src="/img/shofar-arm.png" alt="Shofar arm" class="max-h-[60vh]" />
      </div>
      <NavSmall class="py-6 px-2 border-t border-brand-background-light" />
    </section>

    <section id="introduction">
      <div class="mx-auto max-w-prose px-4 mb-16">
        <article v-if="introduction" class="prose prose-neutral text-xl leading-relaxed max-w-none">
          <ShapedImage src="/img/flowers.png" 
                       class="float-right -mr-[30vw] sm:-mr-14 sm:-mt-14 lg:-mt-44 lg:-mr-[40%] max-w-[80vw] lg:max-w-[40vh]" margin="0.2rem" />
          <ContentRenderer :value="introduction" :data="{}" />
        </article>
        <p v-else class="text-sm text-brand-text/60">Loading…</p>
      </div>
    </section>

    <!-- Statement -->
    <section id="statement" class="px-8 py-8 sm:py-16 z-10 relative bg-white max-w-3xl mx-auto shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
      <div class="mx-auto max-w-prose">
        <p class="text-sm text-brand-text/60 uppercase mb-4">Sign <span class="lowercase font-serif italic">the</span> Statement</p>
        <article v-if="statement" class="prose prose-neutral max-w-none">
          <ContentRenderer :value="statement" :data="{}" />
        </article>
        <p v-else class="text-sm text-brand-text/60">Loading…</p>
      </div>
      <div id="embed" class="mx-auto max-w-prose pt-8">
        <FormEmbed :customizations="formCustomizations" />
        <NuxtImg src="/img/dove.png" alt="" class="hidden sm:block mx-auto max-h-56 w-auto object-contain opacity-30 absolute bottom-6 right-6" aria-hidden="true" />
      </div>
    </section>


    <!-- About -->
    <section id="about" class="py-16 sm:py-24 overflow-hidden">
      <div class="mx-auto max-w-prose px-4">
        <article v-if="aboutUs" class="prose prose-neutral prose-li:marker:text-brand-primary max-w-none">
          <ShapedImage src="/img/not-now-when-poster.png" :threshold="0.4" class="float-right -mr-8 my-0 sm:-mr-14 max-w-[50vw] max-h-[90vh] lg:-mr-[50%]" />
          <ContentRenderer :value="aboutUs" :data="{}" />
        </article>
        <p v-else class="text-sm text-brand-text/60">Loading…</p>
      </div>
      <div class="sm:grid sm:grid-cols-2 gap-6 p-6 max-w-screen-lg mx-auto">
        <a v-for="partner in partners" :key="partner.name" :href="partner.href" :aria-label="partner.name" class="last:col-span-2">
          <img v-if="partner.logo" :src="partner.logo" :alt="partner.name" class="max-h-40 object-contain mx-auto mix-blend-multiply hover:mix-blend-normal" :class="partner.imgClass" />
        </a>
      </div>
    </section>

    <!-- Share / How to Help -->
    <section id="share" 
      class="pt-16 pb-24 sm:py-24 bg-brand-primary-dark border-t-2 border-brand-primary shadow-md bg-[url('/img/arm-poster.png')] bg-no-repeat bg-right-bottom bg-blend-soft-light" style="background-size: auto 90%; background-position: calc(100% - 10px) center;">
      <div class="mx-auto max-w-prose px-4">
        <h1 class="mb-6 text-white border-white">Spread the Word</h1>
        <ShareButtons 
          :long-text="statementText"
          :url="siteUrl"
        />
        <nuxt-link to="/share" class="btn btn-block btn-outline-white mt-4 bg-brand-primary/60">Download Image</nuxt-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import FormEmbed from '~/components/FormEmbed.vue'

const { data: introduction } = await useAsyncData(() => queryCollection('content').path('/introduction').first())
const { data: statement } = await useAsyncData(() => queryCollection('content').path('/statement').first())
const { data: aboutUs } = await useAsyncData(() => queryCollection('content').path('/about-us').first())
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
  },
  
  {
    selector: '.international_link-wrap',
    modify: (element: Element) => {
      const span = element as HTMLLabelElement
      // Hide the selected element
      span.style.display = 'none'
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
