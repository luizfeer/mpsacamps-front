<script>
import { defineAsyncComponent } from 'vue'

export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },

  computed: {
    dynamicComponent () {
      const name = this.name
      console.log(name)
      return defineAsyncComponent(() => import(`./svg/${name}.vue`))
    }
  }
}
</script>

<template>
  <component :is="dynamicComponent" />
</template>
