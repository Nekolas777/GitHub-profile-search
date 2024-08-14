<template>
  <section class="w-full container-section">
    <div class="flex flex-row items-center -translate-y-14 -mb-5">
      <figure class="inline-flex bg-[#20293A] rounded-3xl p-2.5">
        <div class="inline-flex h-full rounded-2xl bg-slate-900">
          <img :src="userInfo?.avatar_url || UserPlaceholder" class="w-36 rounded-full">
        </div>
      </figure>
      <div class="flex flex-row gap-8 ml-8 items-start mt-10">
        <ButtonInfo :title="'Followers'" :data="userInfo?.followers.toString() || '0'" />
        <ButtonInfo :title="'Following'" :data="userInfo?.following.toString() || '0'" />
        <ButtonInfo :title="'Location'" :data="userInfo?.location! || 'No Location'" />
      </div>
    </div>
    <div class="flex flex-row items-center justify-between">
      <div class="flex flex-col gap-4">
        <h2 class="text-4xl font-medium text-[#CDD5E0]">{{ userInfo?.login || 'User not found' }}</h2>
        <p class="text-lg font-light text-[#CDD5E0]/70">{{ userInfo?.bio || 'No bio provided' }}</p>
      </div>
      <div class="p-4 bg-[#111729] rounded-xl">
        <p class="text-[#4A5567] text-lg">Total Repositories: <span class="text-[#CDD5E0] ml-2">{{ userRepos?.length || 0 }}</span></p>
      </div>
    </div>
    <RepositoriesGrid :repositories="userRepos" />
  </section>
</template>

<script setup lang="ts">
import { GithubUserInfo } from '../types/GithubUser';
import { GithubUserRepo } from '../types/GithubUserRepo';
import UserPlaceholder from '../assets/images/user-image.jpg'
import ButtonInfo from './ButtonInfo.component.vue';
import RepositoriesGrid from './RepositoriesGrid.component.vue';

const { userInfo, userRepos } = defineProps<{
  userInfo: GithubUserInfo | null,
  userRepos: GithubUserRepo[] | null
}
>();

</script>

<style scoped></style>