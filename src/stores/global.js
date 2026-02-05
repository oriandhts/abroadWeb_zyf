import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const openContact = ref(false) // Boolean 响应式变量

  function toggleOpenContact() {
    openContact.value = !openContact.value
  }

  return { openContact, toggleOpenContact }
})
