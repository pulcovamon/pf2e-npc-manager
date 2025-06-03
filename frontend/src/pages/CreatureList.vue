<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AddCreatureModal from '@/components/AddCreatureModal.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

interface Creature {
  id: number
  name: string
  creatureName: string
  level: number
}

const creatures = ref<Creature[]>([])
const showModal = ref(false)

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/creature')
  creatures.value = await res.json()
})

async function handleAdd(creature: Omit<Creature, 'id'>) {
  const res = await fetch('http://localhost:3000/api/creature', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creature),
  })
  const created = await res.json()
  creatures.value.push(created)
  showModal.value = false
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Creatures</h1>

    <button
      @click="showModal = true"
      class="flex items-center gap-2 bg-violet-600 hover:bg-violet-900 text-white px-4 py-2 rounded mb-4 shadow transition cursor-pointer"
    >
      <font-awesome-icon :icon="faCirclePlus" />
      Add Creature
    </button>

    <div class="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white/80">
      <table class="min-w-full table-auto text-sm text-left text-gray-700">
        <thead
          class="bg-gradient-to-r from-violet-100 to-indigo-100 text-gray-900 text-sm uppercase tracking-wide font-semibold"
        >
          <tr>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Type</th>
            <th class="px-6 py-3 text-center">Level</th>
            <th class="px-6 py-3 text-center">HP</th>
            <th class="px-6 py-3 text-center">Alignment</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="c in creatures"
            :key="c.id"
            class="border-t border-gray-200 hover:bg-violet-50 transition cursor-pointer"
            @click="$router.push(`/creatures/${c.id}`)"
          >
            <td class="px-6 py-3 font-medium text-violet-600 hover:underline">
              {{ c.name }}
            </td>
            <td class="px-6 py-3">{{ c.creatureName }}</td>
            <td class="px-6 py-3 text-center font-semibold">{{ c.level }}</td>
            <td class="px-6 py-3 text-center font-semibold">{{ c.hp }}</td>
            <td class="px-6 py-3 text-center">{{ c.aligment || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <AddCreatureModal v-if="showModal" @close="showModal = false" @add="handleAdd" />
</template>
