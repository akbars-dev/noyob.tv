<script setup>
import { ref, watchEffect } from 'vue';
import { useFetch } from '#imports';
import MovieCard from '~/components/movie-card.vue';

const movies = ref([]);
const currentPage = ref(1);
const offset = ref(0);
const limit = 10;
const hasNextPage = ref(true);

const fetchMovies = async () => {
    const response = await useFetch(`https://back.noyob.tv/api/v1/movies?limit=${limit}&offset=${offset.value}`);

    if (response.data.value) {
        movies.value = response.data.value.movies;
        hasNextPage.value = response.data.value.movies.length === limit;
    }
};

watchEffect(fetchMovies);

const changePage = (newPage) => {
    if (newPage > currentPage.value && hasNextPage.value) {
        offset.value += limit;
        currentPage.value = newPage;
    } else if (newPage < currentPage.value && offset.value > 0) {
        offset.value -= limit;
        currentPage.value = newPage;
    }
};
</script>

<template>
    <div class="movies-section">
        <h1 class="title">Kinolar</h1>

        <div class="movies-container">
            <MovieCard v-for="movie in movies" :key="movie.id" :title="movie.title" :imageUrl="`${movie.photo_url}`"
                :id="movie.id" :type="movie.type" :genre="movie.genre" />
        </div>

        <Pagination :currentPage="currentPage" :totalPages="hasNextPage ? currentPage + 1 : currentPage"
            @page-change="changePage" />
    </div>
</template>

<style scoped lang="scss">
.movies-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 100px;

    .title {
        font-family: "PT Serif", sans-serif;
        text-align: center;
        color: white;
        font-size: 1.875rem; // 3xl in Tailwind
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 20px;

        &:first-child {
            text-align: start;
        }
    }

    .movies-container {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 22px;
        margin-top: 10px;
    }
}
</style>