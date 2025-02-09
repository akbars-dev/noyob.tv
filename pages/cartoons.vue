<script setup>
import { ref, watchEffect, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '#imports';
import MovieCard from '~/components/movie-card.vue';

const route = useRoute();
const movies = ref([]);
const currentPage = ref(1);
const offset = ref(0);
const limit = 10;
const hasNextPage = ref(true);

const fetchMovies = async () => {
    const category = route.name;
    const apiEndpoint = `https://back.noyob.tv/api/v1/${category}?limit=${limit}&offset=${offset.value}`;
    const response = await useFetch(apiEndpoint);

    if (response.data.value) {
        movies.value = response.data.value[category];
        hasNextPage.value = response.data.value[category]?.length === limit;
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

const pageTitle = computed(() => {
    switch (route.name) {
        case 'cartoons': return 'Multfilmlar';
        case 'movies': return 'Kinolar';
        case 'series': return 'Seriallar';
        default: return 'Filmlar';
    }
});

useSeoMeta({
    title: 'Noyob.tv - Online kinoteator',
    ogTitle: 'Noyob.tv - Online kinoteator',
    description: 'Barcha kino, multfilm va seriallar ozbek tilida yuqori sifatda bepul tomosha qiling',
    ogDescription: "Barcha kino, multfilm va seriallar o'zbek tilida yuqori sifatda bepul tomosha qiling",
    ogImage: '/favicon.png',
});
</script>

<template>
    <div class="movies-section">
        <h1 class="title">{{ pageTitle }}</h1>
        <div class="movies-container">
            <MovieCard v-for="movie in movies" :key="movie.id" :title="movie.title" :imageUrl="movie.photo_url"
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
        font-size: 1.875rem;
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
