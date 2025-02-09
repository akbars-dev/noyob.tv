<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';


defineProps({
    medias: {
        type: Array,
        required: true
    },
});

const scrollContainer = ref(null);
const scrollAmount = 400;

const scroll = (direction) => {
    if (scrollContainer.value) {
        const newPosition =
            direction === 'left'
                ? scrollContainer.value.scrollLeft - scrollAmount
                : scrollContainer.value.scrollLeft + scrollAmount;

        scrollContainer.value.scrollTo({
            left: newPosition,
            behavior: 'smooth',
        });
    }
};

onMounted(() => {
    const autoScrollInterval = setInterval(() => {
        scroll('right');
    }, 3000);

    onBeforeUnmount(() => {
        clearInterval(autoScrollInterval);
    });
});
</script>

<template>
    <div class="slider-container">
        <div ref="scrollContainer" class="cards">
            <MovieCard v-for="media in medias" :key="media.id" :id="media.id" :imageUrl="`${media.photo_url}`"
                :title="media.title" :type="media.type" :genre="media.genre" />
        </div>
        <button @click="scroll('left')" class="scroll-btn left-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <button @click="scroll('right')" class="scroll-btn right-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </div>
</template>


<style lang="scss" scoped>
.slider-container {
    position: relative;
    width: 100%;
    overflow: hidden;

    .cards {
        display: flex;
        align-items: center;
        gap: 20px;
        min-height: 350px;
        overflow-x: auto;
        scroll-behavior: smooth;
        padding: 10px;
        white-space: nowrap;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .scroll-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(237, 209, 58, 0.5);
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
        transition: background 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;

        &:hover {
            background-color: rgba(237, 209, 58, 0.7);
        }

        svg {
            width: 24px;
            height: 24px;
        }
    }

    .left-btn {
        left: 0;
        border-radius: 0 5px 5px 0;
    }

    .right-btn {
        right: 0;
        border-radius: 5px 0 0 5px;
    }
}
</style>
