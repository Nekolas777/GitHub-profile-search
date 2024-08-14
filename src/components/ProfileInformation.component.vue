<template>
  <section class="w-full container-section">
    <div class="flex flex-col lg:flex-row items-center -translate-y-14 -mb-5">
      <a :href="userInfo?.html_url" class="inline-flex bg-[#20293A] rounded-3xl p-2.5 
        cursor-pointer min-w-40 w-40 self-start profile-banner" target="_blank">
        <div class="inline-flex h-full rounded-2xl bg-slate-900 overflow-hidden">
          <img :src="userInfo?.avatar_url || UserPlaceholder" class="rounded-full">
        </div>
      </a>
      <div class="flex flex-row flex-wrap gap-8 ml-0 lg:ml-8 items-start mt-10 self-start">
        <ButtonInfo :title="'Followers'" :data="userInfo?.followers.toString() || '0'" />
        <ButtonInfo :title="'Following'" :data="userInfo?.following.toString() || '0'" />
        <ButtonInfo :title="'Location'" :data="userInfo?.location! || 'No Location'" />
      </div>
    </div>
    <div class="flex flex-col sm:flex-row items-center justify-between gap-8">
      <div class="flex flex-col gap-4 self-start">
        <h2 class="text-4xl font-medium text-[#CDD5E0]">{{ userInfo?.login || 'User not found' }}</h2>
        <p class="text-lg font-light text-[#CDD5E0]/70">{{ userInfo?.bio || 'No bio provided' }}</p>
      </div>
      <div class="p-4 bg-[#111729] rounded-xl self-start">
        <p class="text-[#4A5567] text-lg">Total Repositories:
          <span class="text-[#CDD5E0] ml-2">{{ userRepos?.length || 0 }}</span>
        </p>
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

<style scoped>
/* @keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
 */

.profile-banner img {
  transition: transform 0.3s ease;
}

.profile-banner:hover img {
  transform: scale(1.10);
}
</style>