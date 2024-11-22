<script setup lang="ts">
import { useTodoStore } from '~/stores/todo'

definePageMeta({
  name: 'todo',
})

const todoStore = useTodoStore()

onMounted(async () => {
  await todoStore.fetchTodoList()
})

// GÖREV 2
// elindeki userId lere göre bu kullanıcıların resimlerini ve isimlerini göstermelisin https://randomuser.me/
// bunun için Todo tipini değiştirmen gerekecek yeni tipte nasıl bir yapı izleyeceğin çok önemli.
// opsiyonel: zorluk istiyorsan fakerapi kullanarak kullanıcı bilgilerini detaylandırabilirsin ama bu yola girersen todonun eklenme tarihini görmek ve bunu filtreleyebilmek isterim

// yapılan görevler, yapılmayan görevler ve tümünü göster filtresi olmalı
// aynı kullanıcının birden fazla taskı olabiliyor, kullanıcıya göre filtrelenebilmeli. nuxtui dan selectmenu kullanarak bu filtrelemeyi yapmalısın ve filtrelerken userların resimlerini de görmek istiyorum
</script>

<template>
  <NuxtLayout name="default">
    <div class="w-full h-full flex flex-col lg:flex-row p-4 gap-4">
      <div class="w-full lg:h-full h-2/6 flex flex-col -mt-5 lg:justify-center justify-between items-center gap-3 p-4">
        <TodoUserProfileImage />
        <TodoUserSearchProfile />
        <ButtonSmall
          v-if="todoStore.selectedUser"
          label="Görevlere git"
          @click="useRouter().push({ name: 'todoDetail', params: { id: todoStore.selectedUser?.id } })"
        />
      </div>

      <!-- Animasyon için transition -->
      <Transition name="fade-slide">
        <div
          v-if="todoStore.selectedUser"
          class="myBorder lg:w-4/5 flex flex-col overflow-auto"
        >
          <TodoList class="w-full h-full myBorder p-4 overflow-auto" />
        </div>
      </Transition>
    </div>
  </NuxtLayout>
</template>

<style>
.myBorder {
  @apply border rounded dark:border-gray-700 border-gray-300
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
  transition-delay: 0.2ms;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
