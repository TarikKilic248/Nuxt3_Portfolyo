<script setup lang="ts">
import { ref } from 'vue'
import { useTmdbStore } from '~/stores/tmdb'

const showFilters = ref(false)
const tmdbStore = useTmdbStore()

function toggleFilters() {
  showFilters.value = !showFilters.value
  tmdbStore.filterReleaseDate = undefined
  tmdbStore.filterTitle = undefined
  tmdbStore.filterReleaseDate = undefined
  tmdbStore.filterVoteCount = undefined
}

function getCurrentYear() {
  const now = new Date()
  return now.getFullYear()
}

const options = [{
  value: getCurrentYear(),
  label: 'This Year',
}, {
  value: getCurrentYear() - 10,
  label: 'Last 10 Years',
}, {
  value: 1000,
  label: 'All Years',
}]
</script>

<template>
  <div class="flex w-full h-30 sm:h-20 lg:h-20 justify-center">
    <div class="flex justify-start h-10 lg:h-16">
      <button class="pushable" @click="toggleFilters">
        <span class="shadow" />
        <span class="edge" />
        <span class="front">
          <svg viewBox="0 0 512 512" height="1em">
            <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
          </svg>
        </span>
      </button>
    </div>
    <div class="flex justify-around w-full">
      <Transition name="slide-up" mode="out-in">
        <!-- Show either Movies/TV Shows buttons or the filter options -->
        <div v-if="!showFilters" class="flex justify-around w-full h-10 lg:h-16">
          <button class="pushable " @click="$router.push('/movie')">
            <span class="shadow" />
            <span class="edge" />
            <span class="front"> Movies </span>
          </button>

          <button class="pushable" @click="$router.push('/tv')">
            <span class="shadow" />
            <span class="edge" />
            <span class="front"> TV Shows </span>
          </button>
        </div>

        <div v-else class="flex flex-wrap justify-around w-full ">
          <!-- Filter options, replace with actual filters as needed -->

          <UInput
            v-model="tmdbStore.filterTitle"
            class="flex h-10 lg:w-52 w-24"
            icon="i-heroicons-magnifying-glass-20-solid"
            size="sm"
            color="cyan"
            trailing
            placeholder="Search..."
          />
          <div>
            Vote Count: {{ tmdbStore.filterVoteCount ? tmdbStore.filterVoteCount.toLocaleString() : '0' }}
            <URange v-model="tmdbStore.filterVoteCount" color="cyan" size="md" class="w-32 lg:w-60" :step="50" :min="0" :max="2000" />
          </div>

          <URadioGroup v-model="tmdbStore.filterReleaseDate" class="" legend="Release Date" :options="options" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
:focus {
  outline: 0;
  border-color: #2260ff;
  box-shadow: 0 0 0 4px #b5c9fc;
}

.mydict div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.mydict input[type="radio"] {
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.mydict input[type="radio"]:checked + span {
  box-shadow: 0 0 0 0.0625em #0043ed;
  background-color: #dee7ff;
  z-index: 1;
  color: #0043ed;
}

label span {
  display: block;
  cursor: pointer;
  background-color: #fff;
  padding: 0.375em .75em;
  position: relative;
  margin-left: .0625em;
  box-shadow: 0 0 0 0.0625em #b5bfd9;
  letter-spacing: .05em;
  color: #3e4963;
  text-align: center;
  transition: background-color .5s ease;
}

label:first-child span {
  border-radius: .375em 0 0 .375em;
}

label:last-child span {
  border-radius: 0 .375em .375em 0;
}

.pushable {
  position: relative;
  background: transparent;
  padding: 0px;
  border: none;
  cursor: pointer;
  outline-offset: 4px;
  outline-color: deeppink;
  transition: filter 250ms;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.shadow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: hsl(226, 25%, 69%);
  border-radius: 8px;
  filter: blur(2px);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

.edge {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background: linear-gradient(
    to right,
    hsl(248, 39%, 39%) 0%,
    hsl(248, 39%, 49%) 8%,
    hsl(248, 39%, 39%) 92%,
    hsl(248, 39%, 29%) 100%
  );
}

.front {
  display: block;
  position: relative;
  border-radius: 8px;
  background: hsl(248, 53%, 58%);
  padding: 16px 32px;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 1rem;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

.pushable:hover {
  filter: brightness(110%);
}

.pushable:hover .front {
  transform: translateY(-6px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.pushable:active .front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.pushable:hover .shadow {
  transform: translateY(4px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.pushable:active .shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.pushable:focus:not(:focus-visible) {
  outline: none;
}

@media (max-width: 600px) {
  .pushable {
    padding: 0;
  }

  .front {
    padding: 8px 16px;
    font-size: 0.8rem;
  }
}

/* Styles for medium screens (e.g., tablets) */
@media (min-width: 601px) and (max-width: 1024px) {
  .pushable {
    padding: 0;
  }

  .front {
    padding: 12px 24px;
    font-size: 1rem;
  }
}

/* Styles for larger screens (e.g., desktop) */
@media (min-width: 1025px) {
  .pushable {
    padding: 0;
  }

  .front {
    padding: 16px 32px;
    font-size: 1.2rem;
  }
}
</style>
