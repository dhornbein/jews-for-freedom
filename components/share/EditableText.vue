<template>
  <div 
    ref="wrapperRef"
    class="relative group"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <!-- Inline Editing Toolbar - teleports to dropdown bar when focused -->
    <Teleport v-if="isEditing && isMounted" to="#editing-toolbar-target">
      <div
        class="export-exclude editing-toolbar flex items-center gap-4 w-full"
      >
        <span class="text-xs font-medium text-brand-text" @mousedown.prevent>Editing {{ field }}:</span>
        
        <!-- Delete button -->
        <button
          @mousedown.prevent
          @click="handleClear"
          class="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors flex-shrink-0"
          title="Clear text"
        >
          <Icon name="mdi:delete" class="text-red-600 text-lg" />
        </button>

        <!-- Size slider -->
        <div class="flex items-center gap-2 flex-1 max-w-md">
          <label class="text-xs font-medium text-gray-600 whitespace-nowrap" @mousedown.prevent>
            Size:
          </label>
          <input
            type="range"
            :min="sizeRange.min"
            :max="sizeRange.max"
            :value="currentSize"
            @input="updateSize(Number(($event.target as HTMLInputElement).value))"
            class="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
          />
          <span class="text-xs text-brand-text/60 w-12 text-right" @mousedown.prevent>{{ currentSize }}px</span>
        </div>

        <!-- Close button -->
        <button
          @mousedown.prevent
          @click="handleClose"
          class="ml-auto w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors flex-shrink-0"
          title="Close editor"
        >
          <Icon name="mdi:close" class="text-gray-600 text-lg" />
        </button>
      </div>
    </Teleport>

    <!-- Slot for the actual content -->
    <div
      ref="contentRef"
      @focusin="handleFocus"
      @focusout="handleBlur"
      :class="[
        'transition-all relative',
        isEditing && '[&_[contenteditable]]:outline [&_[contenteditable]]:outline-2 [&_[contenteditable]]:outline-dashed [&_[contenteditable]]:outline-gray-400',
        isEmpty && !isEditing && 'hidden'
      ]"
    >
      <slot />
    </div>

    <!-- Empty state plus icon (excluded from export) -->
    <button
      v-if="isEmpty && !isEditing"
      @click="focusContent"
      @mouseenter="showAddTooltip = true"
      @mouseleave="showAddTooltip = false"
      class="export-exclude absolute inset-0 flex items-center justify-center hover:bg-black/5 transition-colors rounded"
      title="Add text"
    >
      <div class="w-18 h-18 bg-white/50 hover:bg-white border-2 border-brand-primary-dark text-brand-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <Icon name="mdi:plus" class="text-7xl" />
      </div>
      
      <!-- Add tooltip -->
      <div
        v-if="showAddTooltip"
        class="absolute -top-12 left-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10"
      >
        Add {{ fieldLabel }} text
      </div>
    </button>

    <!-- Tooltip (excluded from export) -->
    <div
      v-if="showTooltip && !isEditing && !isEmpty"
      class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none export-exclude z-10"
    >
      Click to edit
      <div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface EditableTextProps {
  field: 'headline' | 'body' | 'callToAction'
  modelValue: string | undefined
  size: number
  sizeRange: { min: number; max: number }
}

const props = defineProps<EditableTextProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:size': [value: number]
}>()

// Inject editing state from CanvasEditor
const editingContext = inject<{
  editingField: Ref<string | null>
  setEditingField: (field: string | null) => void
  getFieldSize: (field: string) => number
  updateFieldSize: (field: string, size: number) => void
}>('editingContext')

const showTooltip = ref(false)
const showAddTooltip = ref(false)
const contentRef = ref<HTMLElement>()
const wrapperRef = ref<HTMLElement>()
const isMounted = ref(false)

const isEditing = computed(() => editingContext?.editingField.value === props.field)
const isEmpty = computed(() => !props.modelValue || props.modelValue.trim() === '')
const currentSize = computed(() => props.size || editingContext?.getFieldSize(props.field) || 24)
const sizeRange = computed(() => props.sizeRange || { min: 12, max: 120 })

const fieldLabel = computed(() => {
  switch (props.field) {
    case 'headline': return 'headline'
    case 'body': return 'body'
    case 'callToAction': return 'call-to-action'
    default: return 'text'
  }
})

onMounted(() => {
  isMounted.value = true
})

function handleFocus(event: FocusEvent) {
  const target = event.target as HTMLElement
  if (target.getAttribute('contenteditable') === 'true') {
    editingContext?.setEditingField(props.field)
  }
}

function handleBlur(event: FocusEvent) {
  const target = event.target as HTMLElement
  if (target.getAttribute('contenteditable') === 'true') {
    // Small delay to allow toolbar interactions
    setTimeout(() => {
      // Check if focus moved to toolbar (which is now teleported)
      const activeElement = document.activeElement
      const toolbar = document.querySelector('#editing-toolbar-target .editing-toolbar')
      
      if (!toolbar?.contains(activeElement) && 
          activeElement?.getAttribute('contenteditable') !== 'true') {
        editingContext?.setEditingField(null)
      }
    }, 100)
  }
}

function updateSize(size: number) {
  editingContext?.updateFieldSize(props.field, size)
}

function handleClear() {
  emit('update:modelValue', '')
  editingContext?.setEditingField(null)
}

function handleClose() {
  editingContext?.setEditingField(null)
}

function focusContent() {
  // Set editing field first to unhide the element
  editingContext?.setEditingField(props.field)
  
  // Wait for DOM update, then focus
  nextTick(() => {
    const contentEditable = contentRef.value?.querySelector('[contenteditable="true"]') as HTMLElement
    if (contentEditable) {
      contentEditable.focus()
    }
  })
}

// Watch for when this field becomes the editing field
watch(() => isEditing.value, (editing) => {
  if (editing) {
    showTooltip.value = false
  }
})
</script>
