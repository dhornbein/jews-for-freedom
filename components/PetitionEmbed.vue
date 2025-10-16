<template>
  <div
    v-if="hasValidEmbed"
    :id="`can-petition-area-${petitionSlug}`"
    v-bind="$attrs"
  />
  <div v-else class="text-center py-16 text-2xl">There was an issue loading the petition, refresh to try again.</div>
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
  whitelabel: true,
  layout: 'default'
})

// petitionUrl default must not reference local variables inside defineProps; compute a runtime fallback instead
const config = useRuntimeConfig()
const petitionUrlResolved = computed(() => props.petitionUrl || (config.public.petitionUrl as string) || '')

// Extract slug from URL (everything after /petitions/ before any ? or #)
const petitionSlug = computed(() => {
  const value = petitionUrlResolved.value
  if (!value) return 'unknown'
  try {
    const url = new URL(value)
    const match = url.pathname.match(/\/petitions\/([^/?#]+)/)
    return match ? match[1] : 'unknown'
  } catch {
    return 'unknown'
  }
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

// Only render embed when we have a valid slug
const hasValidEmbed = computed(() => petitionSlug.value !== 'unknown')

useHead(() => ({
  link: hasValidEmbed.value
    ? [
        {
          rel: 'stylesheet',
          href: stylesheetHref.value,
          type: 'text/css'
        }
      ]
    : [],
  script: hasValidEmbed.value
    ? [
        {
          src: scriptSrc.value,
          tagPosition: 'bodyClose'
        }
      ]
    : []
}))
</script>