<template>
  <div class="relative z-10 h-full flex flex-col justify-between p-12">
    <div class="flex items-center justify-between [.size-portrait_&]:flex-col">
      <!-- Logo -->
      <div class="mb-auto">
        <NuxtImg
          src="/logo-long.png"
          alt="Jews for Freedom"
          class="h-18 w-auto"
        />
      </div>
        <!-- URL Bar -->
        <div
          class="text-3xl font-medium px-2 py-1 rounded"
          :style="{
            color: settings.colors.bodyText,
            backgroundColor: settings.colors.background
          }"
        >
          {{ settings.content.url }}
        </div>
    </div>

    <!-- Body Text -->
    <ShareEditableText
      field="body"
      :model-value="settings.content.body"
      @update:model-value="emit('update:body', $event)"
      :size="settings.content.bodySize"
      :size-range="{ min: 18, max: 72 }"
    >
      <p
        contenteditable="true"
        @blur="handleBodyEdit"
        class="leading-relaxed my-4 outline-none p-4 font-bold border-l-4 border-solid"
        :style="{
          fontSize: `${settings.content.bodySize}px`,
          color: settings.colors.bodyText,
          backgroundColor: settings.colors.background,
          borderColor: settings.colors.accent
        }"
        v-text="settings.content.body"
      ></p>
    </ShareEditableText>

    <div>
      <!-- Headline -->
      <ShareEditableText
        field="headline"
        :model-value="settings.content.headline"
        @update:model-value="emit('update:headline', $event)"
        :size="settings.content.headlineSize"
        :size-range="{ min: 24, max: 120 }"
      >
        <h1
          contenteditable="true"
          @blur="handleHeadlineEdit"
          class="font-bold leading-tight mb-8 outline-none border-b-4"
          :style="{
            fontSize: `${settings.content.headlineSize}px`,
            color: settings.colors.headlineText,
            borderColor: settings.colors.accent,
            textShadow: `4px 4px 0 rgb(0 0 0 / 0.75)`
          }"
          v-text="settings.content.headline"
        ></h1>
      </ShareEditableText>
      
      <!-- Bottom Section -->
      <div class="flex items-center justify-between gap-8">
        <!-- CTA Button -->
        <ShareEditableText
          field="callToAction"
          :model-value="settings.content.callToAction"
          @update:model-value="emit('update:cta', $event)"
          :size="settings.content.callToActionSize"
          :size-range="{ min: 16, max: 72 }"
        >
          <div
            contenteditable="true"
            @blur="handleCtaEdit"
            class="px-8 py-4 font-bold rounded-lg outline-none font-heading-normal min-w-[8rem]"
            :style="{
              fontSize: `${settings.content.callToActionSize}px`,
              backgroundColor: settings.colors.ctaBackground,
              color: settings.colors.ctaText,
            }"
            v-text="settings.content.callToAction"
          ></div>
        </ShareEditableText>
        <!-- QR -->
        <div 
          class="flex flex-col items-end p-2 rounded" 
          :style="{ backgroundColor: settings.colors.ctaBackground }"
          v-if="settings.content.showQrCode && qrCodeDataUrl"
        >
          <img
            :src="qrCodeDataUrl"
            alt="QR Code"
            class="w-24 h-24"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ShareImageSettings } from '~/composables/useShareImage'

interface TemplateBoldProps {
  settings: ShareImageSettings
  qrCodeDataUrl?: string
}

defineProps<TemplateBoldProps>()

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
