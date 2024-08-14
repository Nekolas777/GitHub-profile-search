<template>
  <SearchBox @submit-search="updateUserInfo" @update:isRatedLimitExceeded="updateRateLimitExceeded" />
  <main class="h-full bg-[#20293A]">
    <ProfileInformation :userInfo="userInfo" :userRepos="userRepository" />
  </main>
  <section v-if="isRatedLimitExceeded === true" class="fixed inset-0 pt-20 h-screen w-full bg-slate-900/60">
    <div class="max-w-[450px] w-11/12 mx-auto p-5 bg-slate-50 rounded-lg flex flex-col gap-3">
      <h1 class="uppercase text-2xl text-red-500 font-medium">Oops!</h1>
      <p class="text-lg">Rate limit exceeded, try again later</p>
      <span class="text-slate-800/70 mt-2 text-base">for more information about this error in request, read the github
        API documentation <a class="text-blue-500 hover:underline cursor-pointer leading-loose"
          href="https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28"
          target="_blank" rel="noopener noreeferer">click here
        </a></span>
    </div>
  </section>
</template>

<script setup lang="ts">
import SearchBox from '../components/SearchBox.component.vue';
import ProfileInformation from '../components/ProfileInformation.component.vue';
import { onMounted, provide, ref } from 'vue';
import { GithubUserInfo } from '../types/GithubUser';
import { GithubService } from '../services/api/github.service';
import { GithubUserRepo } from '../types/GithubUserRepo';

const githubService = new GithubService();

const userInfo = ref<GithubUserInfo | null>(null);
const userRepository = ref<GithubUserRepo[] | null>([]);
const visibleRepos = ref(4);
const isRatedLimitExceeded = ref(false);

const updateUserInfo = ({ userInfo: info, userRepos: repo }: { userInfo: GithubUserInfo, userRepos: GithubUserRepo[] }) => {
  console.log({ info, repo });
  userInfo.value = info;
  userRepository.value = repo;
}

const updateRateLimitExceeded = (value: boolean) => {
  isRatedLimitExceeded.value = value;
};

const fetchInitialUser = async () => {

  const username = 'github';
  try {
    const [userInfo, userRepos] = await Promise.all([
      githubService.getUserInfoByUsername(username),
      githubService.getRepositoriesByUsername(username)
    ]);

    updateUserInfo({ userInfo, userRepos });
  } catch (error: any) {
    //console.log(error.message);
    if (error.message === 'Rate limit exceeded') {
      updateRateLimitExceeded(true);
    }

    console.error(`Error to get ${username} username`, error);
  }
};

// 'visibleRepos' es una variable reactiva que se inyectará en los componentes descendientes
provide('visibleRepos', visibleRepos);

onMounted(() => {
  fetchInitialUser();
});

</script>

<style scoped></style>