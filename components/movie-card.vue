<script setup>
function formatGenres(genre) {
    if (!genre) return '';

    const genresArray = genre.split(/[,/]/).map(g => g.trim()); 
    return genresArray.length >= 2 
        ? `${genresArray[0]}, ${genresArray[1]}` 
        : genresArray[0]; 
}

defineProps({
    id: { type: String, required: true },
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    genre: { type: String, required: true }
});
</script>

<template>
    <NuxtLink :to="`/watch/${id}-${type}-${title.replace(/\//g, '').trim().replace(/\s+/g, '-')}`">
        <div class="movie-card">
            <img :src="imageUrl" alt="Movie Poster" />
            <div class="text">
                <span class="title">
                    {{ title.length > 20 ? title.slice(0, 20) + '...' : title }}
                </span>

                <span class="genre">
                    {{ formatGenres(genre) }}
                </span>
            </div>
        </div>
    </NuxtLink>
</template>



<style lang="scss" scoped>
.movie-card {
    width: 220px;
    height: auto;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    border-radius: 8px;
    flex-shrink: 0;
    margin-top: 10px;

    &:hover {
        transform: translateY(-10px);
    }

    img {
        width: 100%;
        height: 320px;
        border-radius: 8px;
        object-fit: cover;
    }

    .text {
        display: flex;
        flex-direction: column;
        margin-top: 5px;
        gap: 2px;

        span {
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
        }

        .title {
            font-size: 16px;
            color: white;
        }

        .genre {
            font-size: 14px;
            color: #edd13a; // Adjust this to match your design
        }
    }
}
</style>
