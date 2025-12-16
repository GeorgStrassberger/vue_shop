<script setup>
import { computed } from 'vue'

const props = defineProps({
  leftColumnClass: {
    type: String,
    default: 'col-md-8',
  },
  rightColumnClass: {
    type: String,
    default: 'col-md-4',
  },
  fullsize: {
    type: Boolean,
    default: false,
  },
})

const leftColumnClasses = computed(() => [props.leftColumnClass, props.fullsize ? 'h-100' : ''])
const rightColumnClasses = computed(() => [props.rightColumnClass, props.fullsize ? 'h-100' : ''])
const rowClasses = computed(() => [props.fullsize ? 'h-100' : ''])
const containerClasses = computed(() => [props.fullsize ? 'vh-100' : ''])
</script>

<template>
  <div class="container-fluid" :class="containerClasses">
    <div class="row" :class="rowClasses">
      <div :class="leftColumnClasses">
        <slot name="leftCol">
          <h2>Linke Spalte</h2>
        </slot>
      </div>
      <div :class="rightColumnClasses">
        <slot name="rightCol">
          <h2>Rechte Spalte</h2>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
