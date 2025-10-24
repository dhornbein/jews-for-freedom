<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Controls (Left Column) -->
    <div class="lg:col-span-1">
      <div class="space-y-6 bg-white p-6 rounded-lg shadow-lg sticky top-4">
        <h2 class="text-2xl font-bold text-brand-text">Customize Your Image</h2>

        <!-- Template Selector -->
        <div>
          <label class="block text-sm font-medium text-brand-text mb-2">
            Template
          </label>
          <div class="flex gap-2">
            <button
              v-for="option in editor.templateOptions"
              :key="option.value"
              @click="editor.updateTemplate(option.value)"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                editor.settings.template === option.value
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-background text-brand-text hover:bg-brand-background/80'
              ]"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- Size Selector -->
        <div>
          <label class="block text-sm font-medium text-brand-text mb-2">
            Size
          </label>
          <div class="flex gap-2">
            <button
              v-for="option in editor.sizeOptions"
              :key="option.value"
              @click="editor.updateSize(option.value)"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors text-sm',
                editor.settings.size.preset === option.value
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-background text-brand-text hover:bg-brand-background/80'
              ]"
            >
              {{ option.label }}<br>
              <span class="text-xs opacity-75">{{ option.width }}×{{ option.height }}</span>
            </button>
          </div>
        </div>

        <!-- Content Fields -->
        <div>
          <label class="block text-sm font-medium text-brand-text mb-2">
            Headline
          </label>
          <input
            type="text"
            v-model="editor.settings.content.headline"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-brand-text mb-2">
            Call to Action
          </label>
          <input
            type="text"
            v-model="editor.settings.content.callToAction"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-brand-text mb-2">
            URL
          </label>
          <input
            type="text"
            v-model="editor.settings.content.url"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>

        <!-- QR Code Toggle -->
        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            id="show-qr"
            v-model="editor.settings.content.showQrCode"
            class="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
          />
          <label for="show-qr" class="text-sm font-medium text-brand-text">
            Show QR Code
          </label>
        </div>

        <!-- Color Pickers -->
        <div>
          <h3 class="text-lg font-semibold text-brand-text mb-3">Colors</h3>
          
          <div
            v-for="field in editor.colorFields"
            :key="field.key"
            class="mb-4"
          >
            <label class="block text-sm font-medium text-brand-text mb-2">
              {{ field.label }}
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="color in editor.brandColors"
                :key="`${field.key}-${color.value}`"
                @click="editor.updateColor(field.key, color.value)"
                :class="[
                  'w-10 h-10 rounded-lg border-2 transition-all',
                  editor.settings.colors[field.key] === color.value
                    ? 'border-brand-text scale-110'
                    : 'border-gray-300 hover:scale-105'
                ]"
                :style="{ backgroundColor: color.value }"
                :title="color.name"
              />
            </div>
          </div>
        </div>

        <!-- Blend Mode -->
        <div v-if="editor.settings.colors.backgroundImage">
          <label class="block text-sm font-medium text-brand-text mb-2">
            Background Blend Mode
          </label>
          <select
            v-model="editor.settings.colors.blendMode"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          >
            <option
              v-for="mode in editor.blendModeOptions"
              :key="mode.value"
              :value="mode.value"
            >
              {{ mode.label }}
            </option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4 border-t border-gray-200">
          <button
            @click="handleDownload"
            :disabled="isExporting"
            class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="fa7-regular:download" class="text-xl" />
            <span>{{ isExporting ? 'Generating...' : 'Download JPG' }}</span>
          </button>
          
          <button
            @click="editor.resetToDefaults()"
            class="px-6 py-3 bg-brand-background text-brand-text font-medium rounded-lg hover:bg-brand-background/80 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Canvas Preview (Right Column) -->
    <div class="lg:col-span-2">
      <div class="bg-white p-8 rounded-lg shadow-lg sticky top-14">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-brand-text">Preview</h2>
          <div class="text-sm text-brand-text/60">
            {{ editor.settings.size.width }} × {{ editor.settings.size.height }}px
          </div>
        </div>
        
        <div 
          ref="canvasContainer"
          class="flex justify-center bg-gray-100 p-4 rounded-lg"
          style="max-height: 90vh;"
        >
          <div 
            class="mx-auto"
            :style="{
              transform: `scale(${scale})`,
              transformOrigin: 'center top'
            }"
          >
            <!-- Canvas Component -->
            <div
              ref="canvasElement"
              class="relative overflow-hidden"
              :style="{
                width: `${editor.settings.size.width}px`,
                height: `${editor.settings.size.height}px`,
                backgroundColor: editor.settings.colors.background
              }"
            >
              <!-- Background Image with Blend Mode -->
              <div
                v-if="editor.settings.colors.backgroundImage"
                class="absolute inset-0 bg-cover bg-center"
                :style="{
                  backgroundImage: `url('${editor.settings.colors.backgroundImage}')`,
                  mixBlendMode: editor.settings.colors.blendMode as any
                }"
              ></div>

              <!-- Templates -->
              <ShareTemplateBold
                v-if="editor.settings.template === 'bold'"
                :settings="editor.settings"
                :qr-code-data-url="qrCodeDataUrl"
                @update:headline="handleHeadlineEdit"
                @update:cta="handleCtaEdit"
              />

              <ShareTemplateMinimal
                v-else-if="editor.settings.template === 'minimal'"
                :settings="editor.settings"
                :qr-code-data-url="qrCodeDataUrl"
                @update:headline="handleHeadlineEdit"
                @update:cta="handleCtaEdit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode'

// Create a new editor instance
const editor = useShareImage()
const { exportAsJpeg, isExporting } = useImageExport()

const canvasContainer = ref<HTMLElement>()
const canvasElement = ref<HTMLElement>()
const qrCodeDataUrl = ref<string>()
const scale = ref(1)

// Generate QR code when URL changes or QR code is toggled
watch(
  () => [editor.settings.content.url, editor.settings.content.showQrCode],
  async ([url, show]) => {
    if (show && url) {
      try {
        qrCodeDataUrl.value = await QRCode.toDataURL(`https://${url}`, {
          width: 200,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        })
      } catch (error) {
        console.error('QR code generation failed:', error)
      }
    } else {
      qrCodeDataUrl.value = undefined
    }
  },
  { immediate: true }
)

// Calculate scale to fit canvas within container
function calculateScale() {
  if (!canvasContainer.value) return
  
  const containerWidth = canvasContainer.value.clientWidth - 32
  const containerHeight = canvasContainer.value.clientHeight - 32
  const canvasWidth = editor.settings.size.width
  const canvasHeight = editor.settings.size.height
  
  const scaleX = containerWidth / canvasWidth
  const scaleY = containerHeight / canvasHeight
  
  scale.value = Math.min(scaleX, scaleY, 1)
}

// Auto-scale canvas to fit container
onMounted(() => {
  calculateScale()
  window.addEventListener('resize', calculateScale)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateScale)
})

// Watch for size changes
watch(
  () => editor.settings.size,
  () => {
    calculateScale()
  },
  { deep: true }
)

function handleHeadlineEdit(value: string) {
  editor.settings.content.headline = value
}

function handleCtaEdit(value: string) {
  editor.settings.content.callToAction = value
}

async function handleDownload() {
  if (!canvasElement.value) {
    console.error('Canvas reference not available')
    return
  }
  
  await exportAsJpeg(canvasElement.value)
}
</script>
