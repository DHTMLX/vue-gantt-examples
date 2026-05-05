<script setup lang="ts">
defineProps<{
  done: boolean;
}>();

const emit = defineEmits<{
  toggle: [];
}>();

const onClick = () => {
  emit("toggle");
};
</script>

<template>
  <v-btn
    data-cy="templates-done-toggle"
    :color="done ? 'success' : 'info'"
    size="x-small"
    variant="flat"
    @click.stop="onClick"
  >
    {{ done ? "done" : "not done" }}
  </v-btn>
</template>
