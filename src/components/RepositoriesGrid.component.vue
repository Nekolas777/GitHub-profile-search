<template>
  <div class="card-container mt-10 grid grid-cols-2 grid-rows-auto gap-10">
    <article v-for="repo in repositories?.slice(0, visibleRepos)" :key="repo.id"
      class="repository-card flex flex-col gap-3.5 p-6 rounded-xl">
      <h3 class="text-xl text-[#CDD5E0]">{{ repo.name }}</h3>
      <p class="repo-description text-base tracking-wide text-[#CDD5E0]/70 font-light leading-relaxed flex-1">
        {{ repo.description || 'No description provided' }}
      </p>
      <div class="mt-2 flex flex-row gap-4 items-center text-[#CDD5E0]/80">
        <div v-if="repo?.license?.key === 'mit'" class="flex flex-row items-center gap-1">
          <ChieldIcon class="mt-0.5" />
          <span class="text-base uppercase">mit</span>
        </div>
        <div class="flex flex-row items-center gap-1">
          <NestingIcon />
          <span class="text-base">{{ repo.forks_count }}</span>
        </div>
        <div class="flex flex-row gap-1 items-center">
          <StarIcon />
          <span>{{ repo.stargazers_count }}</span>
        </div>
        <button class="ml-2 py-1.5 px-3 rounded-2xl flex items-center justify-center bg-[#20293A]/80">
          <span class="text-xs font-medium">updated {{ getLastUpdate(new Date(repo?.updated_at)) }} days ago</span>
        </button>
      </div>
    </article>
  </div>
  <div v-if="visibleRepos <= repositories?.length!" class="w-full my-10 flex justify-center" @click="loadMoreRepos">
    <p class="show-more">
      View more repositories
    </p>
  </div>
</template>

<script setup lang="ts">
import NestingIcon from '../assets/icons/Nesting.svg';
import StarIcon from '../assets/icons/Star.svg';
import ChieldIcon from '../assets/icons/Chield_alt.svg';
import { GithubUserRepo } from '../types/GithubUserRepo';
import { getLastUpdate } from '../helpers/getLastUpdate';
import { inject, Ref } from 'vue';

const { repositories } = defineProps<{ repositories: GithubUserRepo[] | null }>();
// 'visibleRepos' es una referencia reactiva (Ref) de tipo número
const visibleRepos = inject('visibleRepos') as Ref<number>;

const loadMoreRepos = () => visibleRepos.value += 4;

</script>

<style scoped>
.repository-card {
  background: linear-gradient(to right, #0b0a1f, #121036, #1a1841);
  position: relative;
}

.show-more {
  @apply text-base py-0.5 border-b-2 border-transparent font-medium text-center hover:border-[#4A5567] cursor-pointer text-[#CDD5E0]/80 tracking-wide
}

.repo-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>