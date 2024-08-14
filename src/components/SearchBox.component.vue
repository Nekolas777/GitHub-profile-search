<template>
  <header id="background-image" class="bg-red-800 h-[300px]">
    <form v-on:submit="submitSearch()" class="max-w-[525px] w-full mx-auto pt-8" @submitSearch="submitSearch"
      @submit.prevent autocomplete="off">
      <div class="bg-[#20293A] p-3 rounded-lg flex flex-row gap-3">
        <SearchIcon class="cursor-pointer hover:scale-105 transition-all duration-200" />
        <input v-model="search" class="bg-transparent outline-none text-white flex-1" placeholder="username" />
      </div>
      <div v-show="search.length > 0" @click="submitSearch"
        class="bg-[#20293A] mt-3 rounded-xl p-3 w-full flex flex-row gap-3 hover:bg-[#1D1B48] cursor-pointer">
        <figure class="p-0.5 bg-[#111729] flex rounded-xl w-20 h-20">
          <img :src="user?.avatar_url || UserPlaceholder" class="rounded-full h-full w-full" />
        </figure>
        <div class="flex flex-col justify-center gap-1.5 flex-1">
          <h3 class="text-xl text-[#CDD5E0]">{{ user?.login || `Not found` }}</h3>
          <p class="text-base font-light text-[#CDD5E0]/70">{{ user?.bio || 'No bio provided' }}</p>
        </div>
      </div>
    </form>
  </header>
</template>

<script setup lang="ts">
import { inject, Ref, ref, watch } from 'vue';
import SearchIcon from '../assets/icons/Search.svg';
import { GithubService } from '../services/api/github.service';
import { GithubUserInfo } from '../types/GithubUser';
import UserPlaceholder from '../assets/images/user-image.jpg'

const emit = defineEmits(['submitSearch', 'update:isRatedLimitExceeded']);

const search = ref('');
const user = ref<GithubUserInfo | null>(null);
const loading = ref(false);
const visibleRepos = inject('visibleRepos') as Ref<number>;
const githubService = new GithubService();

// Definimos una función genérica llamada debounce que toma dos parámetros:
// 1. fn: una función que puede recibir cualquier número de argumentos de cualquier tipo y devolver cualquier tipo de valor.
// 2. delay: un número que representa el tiempo de espera en milisegundos antes de ejecutar la función fn.
const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void => {
  // Declaramos una variable timeoutID para almacenar el identificador del temporizador.
  let timeoutID: number;

  // La función debounce devuelve una nueva función que también puede recibir cualquier número de argumentos de cualquier tipo.
  return (...args: Parameters<T>) => {
    // Limpiamos cualquier temporizador existente para evitar que la función fn se ejecute.
    clearTimeout(timeoutID);

    // Establecemos un nuevo temporizador que ejecutará la función fn después del tiempo especificado en delay.
    timeoutID = window.setTimeout(() => {
      // Llamamos a la función fn con los argumentos proporcionados.
      fn(...args);
    }, delay);
  };
};

const fetchUserInfo = debounce(async () => {
  if (search.value !== '') {
    loading.value = true;

    try {
      const userInfo = await githubService.getUserInfoByUsername(search.value);
      user.value = userInfo;
    } catch (error: any) {

      if (error.message === 'Rate limit exceeded') emit('update:isRatedLimitExceeded', true);
      console.error(`There is no information for user ${search.value}`, error);
    } finally {
      loading.value = false;
    }
  }
}, 300);

watch(search, fetchUserInfo);

const submitSearch = async () => {

  if (search.value.trim() === '') return;

  const username = search.value;
  search.value = "";
  visibleRepos.value = 4;

  try {
    const [userInfo, userRepos] = await Promise.all([
      githubService.getUserInfoByUsername(username),
      githubService.getRepositoriesByUsername(username)
    ]);

    console.log(userInfo, userRepos);
    // emitimos al evento padre con la informacion dle usuario
    emit('submitSearch', { userInfo, userRepos });
  } catch (error: any) {
    
    if (error.message === 'Rate limit exceeded') emit('update:isRatedLimitExceeded', true);
    console.error(`Error to get ${username} username`, error);
  } finally {
    user.value = null;
  }

};

</script>

<style scoped>
#background-image {
  background-image: url('../assets/images/hero-image-github-profile.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center
}
</style>