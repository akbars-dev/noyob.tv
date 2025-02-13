<script setup>
import 'swiper/css';
import { watchEffect, ref } from 'vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const slidersResponse = useFetch('https://back.noyob.tv/api/v1/slider');
const moviesResponse = useFetch('https://back.noyob.tv/api/v1/movies?limit=10&offset=0');
const seriesResponse = useFetch('https://back.noyob.tv/api/v1/series?limit=10&offset=0');
const cartoonsResponse = useFetch('https://back.noyob.tv/api/v1/cartoons?limit=10&offset=0');



const sliders = ref([])
const movies = ref([])
const series = ref([])
const cartoons = ref([])


watchEffect(() => {
    if (slidersResponse.data.value) {
        sliders.value = slidersResponse.data.value.movies
    } 

    if (moviesResponse.data.value) {
        movies.value = moviesResponse.data.value.movies
    }

    if (seriesResponse.data.value) {
        series.value = seriesResponse.data.value.series
    }

    if (cartoonsResponse.data.value) {
        cartoons.value = cartoonsResponse.data.value.cartoons
    }    
});

const swiperConfig = {
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    modules: [Autoplay, Pagination],
    breakpoints: {

        '1200': {
            slidesPerView: 1,
            spaceBetween: 20
        },
        '1150': {
            slidesPerView: 1
        },

        '1080': {
            slidesPerView: 1,
            spaceBetween: 20
        },

        '1000': {
            slidesPerView: 1,
            spaceBetween: 20
        },

        '866': {
            slidesPerView: 1,
            spaceBetween: 20
        },

        '780': {
            slidesPerView: 1,
            spaceBetween: 20
        },

        '500': {
            slidesPerView: 1,
            spaceBetween: 20
        },

        '0': {
            slidesPerView: 1,
            spaceBetween: 20
        }
    }
}

useSeoMeta({
  title: 'Noyob.tv - Online kinoteator',
  ogTitle: 'Noyob.tv - Online kinoteator',
  description: 'Barcha kino, multfilm va seriallar ozbek tilida yuqori sifatda bepul tomosha qiling',
  ogDescription: "Barcha kino, multfilm va seriallar o'zbek tilida yuqori sifatda bepul tomosha qiling",
  ogImage: '/favicon.png',
})

useHead({
  script: [
    { src: 'https://telegram.org/js/telegram-web-app.js', defer: true }
  ]
})


</script>

<template>
    <div class="container">
        <div class="swiper">
            <swiper :centered-slides="swiperConfig.centeredSlides" :breakpoints="swiperConfig.breakpoints"
                :slidesPerView="1" :modules="swiperConfig.modules" class="mySwiper">
                <swiper-slide v-for="slider in sliders">
                    <NuxtLink :to="`/watch/${slider.id}-${slider.type}-${slider.title.replace(/\//g, '').trim().replace(/\s+/g, '-')}`">
                        <div class="slider-box">
                            <img :src="slider.photo_url" class="poster-image" alt="images">
                            <div class="text-info">
                                <div class="film-info">
                                    <div class="right-info">
                                        <span class="type">{{ slider.type?.toUpperCase() || 'UNKNOWN' }}</span>

                                        <span v-for="genre in (slider.genre || '').split(',').length >= 4
                                            ? (slider.genre || '').split(',').slice(0, -2)
                                            : (slider.genre || '').split(',')" class="genre">
                                            {{ genre.toUpperCase() }}
                                        </span>

                                    </div>

                                    <div class="views">
                                        <img src="@/assets/icons/view-icon.svg" alt="view-icon">
                                        <span>{{ slider.views }}</span>
                                    </div>
                                </div>
                                <h1 class="info-headline">{{ slider.title }}</h1>
                                <p class="info-paragraf">{{ slider.description.replace("\n", " ").slice(0, 200) }}...</p>
                            </div>
                        </div>
                    </NuxtLink>
                </swiper-slide>
            </swiper>
        </div>

        <div class="movies-section section">
            <h1 class="headline">Kinolar: </h1>
            <MediaSwiper :medias="movies" />
        </div>

        <div class="movies-section section">
            <h1 class="headline">Seriallar: </h1>
            <MediaSwiper :medias="series" />
        </div>

        <div class="movies-section section">
            <h1 class="headline">Multfilmlar: </h1>
            <MediaSwiper :medias="cartoons" />
        </div>
    </div>
</template>


<style lang="scss" scoped>
.section {

    margin-top: 50px;
    margin-bottom: 50px;

    .headline {
        padding: 20px;
        background: #121212;
        border-radius: 10px;
        color: white;
        margin-bottom: 20px;
    }
}

.swiper {
    width: 101%;
    margin-top: 30px;

    .poster-image {
        width: 100% !important;
    }

    .slider-box {
        width: 95%;
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
                cursor: pointer;

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
.swiper {
    width: 95%;
}
}

@media (max-width: 843px) {
    .swiper {
        .slider-box {
         .film-info {
            .right-info {
                display: flex;
                flex-direction: column;
                align-items: center;
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
    }
}

@media (max-width: 546px) {
    .swiper {
        .slider-box {
            flex-direction: column;
            align-items: center;
        }
    }
}
</style>