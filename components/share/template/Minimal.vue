<template>
  <div class="relative z-10 h-full flex flex-col items-center justify-center p-16 text-center">
    <!-- Logo -->
    <div class="mb-8">
      <NuxtImg
        src="/logo-long.png"
        alt="Jews for Freedom"
        class="h-18 w-auto mx-auto"
      />
    </div>

    <!-- Headline -->
    <ShareEditableText
      field="headline"
      :model-value="settings.content.headline"
      :size="settings.content.headlineSize"
      :size-range="{ min: 24, max: 120 }"
      @update:model-value="emit('update:headline', $event)"
      class="mb-4"
    >
      <h1
        contenteditable="true"
        @blur="handleHeadlineEdit"
        class="font-bold leading-tight outline-none max-w-3xl"
        :style="{
          fontSize: `${settings.content.headlineSize}px`,
          color: settings.colors.headlineText,
          borderColor: settings.colors.accent,
          fontFamily: 'roc-grotesk-compressed, Impact, sans-serif'
        }"
        v-text="settings.content.headline"
      ></h1>
    </ShareEditableText>

    <!-- Body -->
    <ShareEditableText
      field="body"
      :model-value="settings.content.body"
      :size="settings.content.bodySize"
      :size-range="{ min: 14, max: 48 }"
      @update:model-value="emit('update:body', $event)"
      class="mb-12"
    >
      <p
        contenteditable="true"
        @blur="handleBodyEdit"
        class="leading-relaxed outline-none max-w-2xl"
        :style="{
          fontSize: `${settings.content.bodySize}px`,
          color: settings.colors.bodyText,
          fontFamily: 'museo-slab, Georgia, serif'
        }"
        v-text="settings.content.body"
      ></p>
    </ShareEditableText>

    <!-- CTA Button -->
    <ShareEditableText
      field="callToAction"
      :model-value="settings.content.callToAction"
      :size="settings.content.callToActionSize"
      :size-range="{ min: 16, max: 64 }"
      @update:model-value="emit('update:cta', $event)"
      class="mb-8"
    >
      <button
        contenteditable="true"
        @blur="handleCtaEdit"
        class="px-10 py-5 font-bold rounded-lg outline-none"
        :style="{
          fontSize: `${settings.content.callToActionSize}px`,
          backgroundColor: settings.colors.ctaBackground,
          color: settings.colors.ctaText,
          fontFamily: 'museo-slab, Georgia, serif'
        }"
        v-text="settings.content.callToAction"
      ></button>
    </ShareEditableText>

    <!-- URL and QR Code -->
    <div class="flex flex-col items-center gap-3 p-2 mt-2 rounded">
      <div
        v-if="settings.content.showQrCode && qrCodeDataUrl"
        class="bg-white p-2 rounded"
        :style="{ backgroundColor: settings.colors.ctaBackground }"
      >
        <img :src="qrCodeDataUrl" alt="QR Code" class="w-32 h-32" />
      </div>
      <div
        class="text-lg font-medium"
        :style="{ color: settings.colors.headlineText }"
      >
        {{ settings.content.url }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ShareImageSettings } from '~/composables/useShareImage'

interface TemplateMinimalProps {
  settings: ShareImageSettings
  qrCodeDataUrl?: string
}

defineProps<TemplateMinimalProps>()

const emit = defineEmits<{
  'update:headline': [value: string]
  'update:body': [value: string]
  'update:cta': [value: string]
}>()

function handleHeadlineEdit(event: Event) {
  const target = event.target as HTMLElement
  emit('update:headline', target.textContent || '')
}

function handleBodyEdit(event: Event) {
  const target = event.target as HTMLElement
  emit('update:body', target.textContent || '')
}

function handleCtaEdit(event: Event) {
  const target = event.target as HTMLElement
  emit('update:cta', target.textContent || '')
}
</script>
