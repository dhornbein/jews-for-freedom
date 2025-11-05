<template>
  <div
    v-if="hasValidEmbed"
    :id="`can-form-area-${formSlug}`"
    v-bind="$attrs"
  />
  <div v-else class="text-center py-16 text-2xl">There was an issue loading the form, refresh to try again.</div>
</template>

<style>
.can_embed #can_embed_form_inner > h2,
.can_embed #can_embed_form_inner > h4 {
  @apply hidden;
}

.can_embed #can_embed_form_inner input[type="submit"] {
  @apply bg-brand-primary font-heading-normal font-bold text-2xl py-4 rounded hover:bg-brand-primary-dark;
}

.can_embed #can_embed_form_inner #action_info {
  @apply hidden;
}
</style>

<script setup lang="ts">
interface FormEmbedProps {
  formUrl?: string
  whitelabel?: boolean
  layout?: 'default' | 'full'
  customizations?: Array<{
    selector: string
    modify: (element: Element) => void
  }>
}

const props = withDefaults(defineProps<FormEmbedProps>(), {
  whitelabel: true,
  layout: 'default',
  customizations: () => []
})

// formUrl default must not reference local variables inside defineProps; compute a runtime fallback instead
const config = useRuntimeConfig()
const formUrlResolved = computed(() => props.formUrl || (config.public.formUrl as string) || '')

// Extract slug from URL (everything after /forms/ before any ? or #)
const formSlug = computed(() => {
  const value = formUrlResolved.value
  if (!value) return 'unknown'
  try {
    const url = new URL(value)
    const match = url.pathname.match(/\/forms\/([^/?#]+)/)
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
  const base = `https://actionnetwork.org/widgets/v5/form/${formSlug.value}?format=js&source=widget`
  const layoutParam = props.layout === 'full' ? '&style=full' : ''
  return `${base}${layoutParam}`
})

// Only render embed when we have a valid slug
const hasValidEmbed = computed(() => formSlug.value !== 'unknown')

// Setup form customization
const containerRef = computed(() => `#can-form-area-${formSlug.value}`)

const { waitForForm } = useFormCustomization({
  customizations: props.customizations,
  containerSelector: containerRef.value
})

// Apply customizations after form loads
onMounted(() => {
  if (hasValidEmbed.value) {
    waitForForm()
  }
})

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