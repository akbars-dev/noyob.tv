<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const media = ref(null);
const parts = ref([]);
const selectedPart = ref('');

const getInfo = (string) => {
    const array = string.split('-');
    let type = array[1]

    if (type == 'anime') {
        type = 'multik'
    }

    return { id: array[0], type: type };
};

const fetchMedia = async (id, type) => {
    try {
        const response = await fetch(`https://back.noyob.tv/api/v1/part?type=${type}&id=${id}`);
        const data = await response.json();

        if (data.info) {
            media.value = data.info;
            parts.value = data.parts || [];

            if (parts.value.length > 0) {
                selectedPart.value = parts.value[0].download_url;
            }
        }
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
};

watchEffect(async () => {
    const { id, type } = getInfo(route.params.name);
    await fetchMedia(id, type);
});
</script>

<template>
    <div class="wrapper">
        <div class="movie-box" v-if="media">
            <img :src="media.photo_url" class="poster-image" alt="images">
            <div class="text-info">
                <div class="film-info">
                    <div class="right-info">
                        <span class="type">{{ media.type?.toUpperCase() }}</span>

                        <span v-for="genre in (media.genre || '').split(',').slice(0, 3)" :key="genre" class="genre">
                            {{ genre.toUpperCase() }}
                        </span>
                    </div>

                    <div class="views">
                        <img src="@/assets/icons/view-icon.svg" alt="view-icon">
                        <span>{{ media.views }}</span>
                    </div>
                </div>
                <h1 class="info-headline">{{ media.title }}</h1>
                <p class="info-paragraf">
                    {{ media.description }}
                </p>
            </div>
        </div>

        <div class="download-movie" v-if="parts.length">
            <h1>Yuklab olish: </h1>

            <div class="action-part">
                <select v-model="selectedPart">
                    <option v-for="part in parts" :key="part.id" :value="part.download_url">
                        {{ part.part }} {{ media.type === 'serial' ? 'qism' : '' }} - yuklab olish
                    </option>
                </select>
                <button :disabled="!selectedPart">

                    <NuxtLink target="_blank" :to="selectedPart || '#'" style="color: white;">
                        Yuklab olish
                    </NuxtLink>
                </button>

            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.wrapper {
    width: 1200px;
    margin: auto;
    .download-movie {
        width: 97%;
        padding: 20px;
        background: #121212;
        margin-top: 30px;
        border-radius: 10px;

        h1 {
            color: #fff;
            margin-bottom: 30px;
            cursor: pointer;
        }

        .action-part {
            display: flex;
            align-items: center;
            gap: 15px;
            justify-content: space-between;

            select {
                padding: 10px 15px;
                background: #1e1e1e;
                color: #fff;
                border: 1px solid #6553b4;
                border-radius: 5px;
                font-family: 'Manrope';
                font-size: 16px;
                cursor: pointer;
                outline: none;
                width: 80%;
            }

            button {
                padding: 10px 20px;
                background: #6553b4;
                width: 18%;
                color: #fff;
                font-size: 16px;
                font-family: 'Manrope';
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: 0.2s;
            }
        }
    }

    .movie-box {
        width: 97%;
        margin: auto;
        margin-top: 100px;
        align-items: center !important;
        padding: 20px;
        background: #121212;
        border-radius: 10px;
        display: flex;
        align-items: start;
        gap: 20px;

        .text-info {
            margin-top: 20px;

            .film-info {
                display: flex;
                align-items: center;
                padding: 10px;
                margin-bottom: 20px;
                justify-content: space-between;

                .right-info {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    .type {
                        width: 150px;
                        text-align: center;
                        border-radius: 30px;
                        background-color: #302415;
                        color: #925923;
                    }

                    .genre {
                        padding: 0px 20px;
                        text-align: center;
                        border-radius: 30px;
                        color: #6553b4;
                        border: 1px solid #6553b4;
                    }
                }

                .views {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    span {
                        color: white;
                        font-family: 'Manrope';
                    }
                }

            }

            .info-headline {
                font-size: 36px;
                color: #fff;
                margin-bottom: 10px;
                transition: .2s;

                &:hover {
                    color: #edd13a;
                }
            }

            .info-paragraf {
                margin-top: 30px;
                color: #574D46;
                font-family: 'Manrope';
                font-size: 16px;
            }
        }

        .poster-image {
            width: 230px !important;
            height: 330px !important;
            border-radius: 10px;
        }
    }
}

@media (max-width: 1200px) {
    .wrapper {
        width: 90%;
        margin: auto;
    }
}

@media (max-width: 843px) {
    .movie-box {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px 5px  !important;
        .film-info {

            .right-info {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 70%;

                .type {
                    width: 90% !important;
                    padding: 0px 20px;
                }

                .genre {
                    width: 90%;
                }
            }
        }
    }

    .download-movie {
        padding: 20px 5px  !important;
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-bottom: 100px;

        .action-part {
            width: 90% !important;
            align-items: center;
            flex-direction: column;
            select {
                width: 90% !important;
            }
            button {
                width: 90% !important;
            }
        }
    }

}

@media (max-width: 546px) {
    .movie-box {
        flex-direction: column;
        align-items: center;
        h1 {
            font-size: 26px !important;
        }
        p {
            font-size: 14px !important;
        }
        
    }

}
</style>