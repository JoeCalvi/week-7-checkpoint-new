<template></template>

<script>
import Pop from '../utils/Pop.js';

export default {
  setup() {
    async function getAllEvents() {
      try {

      } catch (error) {
        Pop.error('[GETTING ALL EVENTS]', error)
      }
    }
    return {}
  }
}
</script>

<style scoped lang="scss"></style>
