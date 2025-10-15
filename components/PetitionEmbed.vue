<template>
  <div 
    :id="`can-petition-area-${petitionSlug}`" 
    v-bind="$attrs"
  />
</template>

<style>
#can_embed_form_inner h2 {
  @apply font-heading text-5xl uppercase text-center;
}
#can_embed_form_inner h3 {
  @apply text-3xl text-center border-brand-primary;
}
#can_embed_form_inner input[type="submit"] {
  @apply to-brand-primary font-heading-normal font-bold text-2xl py-4 hover:bg-brand-primary-dark;
}
</style>

<script setup lang="ts">
interface PetitionEmbedProps {
  petitionUrl?: string
  whitelabel?: boolean
  layout?: 'default' | 'full'
}

const props = withDefaults(defineProps<PetitionEmbedProps>(), {
  petitionUrl: 'https://actionnetwork.org/petitions/test-petition-352?source=direct_link&',
  whitelabel: true,
  layout: 'default'
})

// Extract slug from URL (everything after /petitions/ before any ? or #)
const petitionSlug = computed(() => {
  const url = new URL(props.petitionUrl)
  const match = url.pathname.match(/\/petitions\/([^/?#]+)/)
  return match ? match[1] : 'unknown'
})

const stylesheetHref = computed(() => {
  const base = 'https://actionnetwork.org/css/style-embed'
  const whitelabelSuffix = props.whitelabel ? '-whitelabel' : ''
  return `${base}${whitelabelSuffix}-v3.css`
})

const scriptSrc = computed(() => {
  const base = `https://actionnetwork.org/widgets/v5/petition/${petitionSlug.value}?format=js&source=widget`
  const layoutParam = props.layout === 'full' ? '&style=full' : ''
  return `${base}${layoutParam}`
})

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: stylesheetHref.value,
      type: 'text/css'
    }
  ],
  script: [
    {
      src: scriptSrc.value,
      tagPosition: 'bodyClose'
    }
  ]
})
</script>