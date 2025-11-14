<template>
  <div class="flex flex-col gap-4">
    <!-- Web Share API Button (if supported) -->
    <button
      v-if="supportsWebShare"
      @click="handleWebShare"
      :disabled="isSharing"
      class="flex items-center justify-center gap-3 px-6 py-6 shadow-md bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      data-analytics-action="web-share"
    >
      <Icon name="fa6-brands:share-nodes" class="text-xl" />
      <span>{{ isSharing ? 'Sharing...' : 'Share' }}</span>
    </button>

    <!-- Fallback Platform Buttons -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
      <!-- Copy to Clipboard -->
      <button
        @click="handleCopyToClipboard"
        :disabled="isCopying"
        :class="[
          'flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all',
          isCopied 
            ? 'bg-green text-white' 
            : 'bg-brand-background hover:bg-brand-background-dark text-brand-text'
        ]"
        data-analytics-action="copy-link"
      >
        <Icon :name="isCopied ? 'fa7-regular:square-check' : 'fa7-regular:copy'" class="text-lg" />
        <span class="text-sm">{{ isCopied ? 'Copied!' : 'Copy Link' }}</span>
      </button>

      <a
        :href="twitterUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center gap-2 px-4 py-3 bg-brand-background text-brand-text hover:bg-brand-twitter hover:text-white rounded-lg font-medium transition-colors"
        data-analytics-action="share-twitter"
        data-analytics-label="twitter"
      >
        <Icon name="fa6-brands:twitter" class="text-lg" />
        <span class="text-sm">X/Twitter</span>
      </a>

      <!-- Facebook -->
      <a
        :href="facebookUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center gap-2 px-4 py-3 bg-brand-background text-brand-text hover:bg-brand-facebook hover:text-white rounded-lg font-medium transition-colors"
        data-analytics-action="share-facebook"
        data-analytics-label="facebook"
      >
        <Icon name="fa6-brands:facebook" class="text-lg" />
        <span class="text-sm">Facebook</span>
      </a>

      <!-- Bluesky -->
      <a
        :href="blueskyUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center gap-2 px-4 py-3 bg-brand-background text-brand-text hover:bg-brand-bluesky hover:text-white rounded-lg font-medium transition-colors"
        data-analytics-action="share-bluesky"
        data-analytics-label="bluesky"
      >
        <Icon name="fa6-brands:bluesky" class="text-lg" />
        <span class="text-sm">Bluesky</span>
      </a>

      <!-- WhatsApp -->
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center gap-2 px-4 py-3 bg-brand-background text-brand-text hover:bg-brand-whatsapp hover:text-white rounded-lg font-medium transition-colors"
        data-analytics-action="share-whatsapp"
        data-analytics-label="whatsapp"
      >
        <Icon name="fa6-brands:whatsapp" class="text-lg" />
        <span class="text-sm">WhatsApp</span>
      </a>

      <!-- Email -->
      <a
        :href="emailUrl"
        class="flex items-center justify-center gap-2 px-4 py-3 bg-brand-background hover:bg-brand-background-dark text-brand-text rounded-lg font-medium transition-colors"
        data-analytics-action="share-email"
        data-analytics-label="email"
      >
        <Icon name="fa7-regular:envelope" class="text-lg" />
        <span class="text-sm">Email</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ShareButtonsProps {
  url?: string
  title?: string
  text?: string
  longText?: string
}

const props = withDefaults(defineProps<ShareButtonsProps>(), {
  url: '',
  title: 'Jews for Freedom',
  text: 'Jews are standing up to authoritarianism, I signed on, won\'t you?',
  longText: ''
})

const config = useRuntimeConfig()
const shareUrl = computed(() => props.url || config.public.siteUrl || 'https://jewsforfreedom.com')

// Web Share API support detection
const supportsWebShare = ref(false)
const isSharing = ref(false)

// Copy to clipboard state
const isCopying = ref(false)
const isCopied = ref(false)

onMounted(() => {
  supportsWebShare.value = typeof navigator !== 'undefined' && 'share' in navigator
})

// Share URLs for different platforms
const twitterUrl = computed(() => {
  const text = props.longText || props.text
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl.value)}`
})

const facebookUrl = computed(() => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`
})

const blueskyUrl = computed(() => {
  const text = props.longText || props.text
  return `https://bsky.app/intent/compose?text=${encodeURIComponent(`${text} ${shareUrl.value}`)}`
})

const whatsappUrl = computed(() => {
  const text = `${props.text} ${shareUrl.value}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
})

const emailUrl = computed(() => {
  const subject = encodeURIComponent(props.title)
  const body = encodeURIComponent(`${props.text}\n\n${shareUrl.value}`)
  return `mailto:?subject=${subject}&body=${body}`
})

// Web Share API handler
async function handleWebShare() {
  if (!supportsWebShare.value) return
  
  isSharing.value = true
  
  try {
    await navigator.share({
      title: props.title,
      text: props.text,
      url: shareUrl.value
    })
  } catch (error) {
    // User cancelled or error occurred
    console.error('Web Share API error:', error)
  } finally {
    isSharing.value = false
  }
}

// Copy to clipboard handler
async function handleCopyToClipboard() {
  if (isCopying.value) return
  
  isCopying.value = true
  const textToCopy = `${props.text} ${shareUrl.value}`
  
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(textToCopy)
      isCopied.value = true
      
      // Reset after 2 seconds
      setTimeout(() => {
        isCopied.value = false
      }, 2000)
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = textToCopy
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      
      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 2000)
    }
  } catch (error) {
    console.error('Copy to clipboard error:', error)
  } finally {
    isCopying.value = false
  }
}
</script>
