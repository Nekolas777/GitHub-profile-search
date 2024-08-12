<template>
  <SearchBox @submit-search="updateUserInfo" />
  <main class="h-full bg-[#20293A]">
    <ProfileInformation :userInfo="userInfo" :userRepos="userRepository" />
  </main>
</template>

<script setup lang="ts">
import SearchBox from '../components/SearchBox.component.vue';
import ProfileInformation from '../components/ProfileInformation.component.vue';
import { onMounted, ref } from 'vue';
import { GithubUserInfo } from '../types/GithubUser';
import { GithubService } from '../services/api/github.service';
import { GithubUserRepo } from '../types/GithubUserRepo';

const userInfo = ref<GithubUserInfo | null>(null);
const userRepository = ref<GithubUserRepo[] | null>([]);
const githubService = new GithubService();

const updateUserInfo = ({ userInfo: info, userRepos: repo }: { userInfo: GithubUserInfo, userRepos: GithubUserRepo[] }) => {
  console.log({ info, repo });
  userInfo.value = info;
  userRepository.value = repo;
}

const fetchInitialUser = async () => {

  const username = 'github';
  try {
    const [userInfo, userRepos] = await Promise.all([
      githubService.getUserInfoByUsername(username),
      githubService.getRepositoriesByUsername(username)
    ]);

    updateUserInfo({userInfo, userRepos});
  } catch (error) {
    console.error(`Error to get ${username} username`, error);
  }
};

onMounted(() => {
  fetchInitialUser();
});

</script>

<style scoped></style>