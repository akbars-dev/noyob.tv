<script setup>
import { ref, watch } from "vue";

const searchQuery = ref("");
const searchResults = ref([]);
const isNavOpen = ref(false);

const toggleNav = () => {
    isNavOpen.value = !isNavOpen.value;
};

watch(searchQuery, async () => {
    if (!searchQuery.value.trim()) {
        searchResults.value = [];
        return;
    }

    try {
        const response = await fetch(`https://back.noyob.tv/api/v1/search?name=${searchQuery.value}&limit=5&offset=0`);
        const data = await response.json();
        searchResults.value = data.results || [];
    } catch (error) {
        console.error("Error fetching search results:", error);
        searchResults.value = [];
    }
});
</script>

<template>
    <div class="nav-wrapper">
        <div class="container">
            <nav class="navbar">
                <div class="links">
                    <NuxtLink to="/" class="serif logo">NOYOB.TV</NuxtLink>


                    <ul :class="{ 'link_list': true, 'open': isNavOpen }">
                        <li>
                            <NuxtLink to="/movies" class="list_link serif">Kinolar</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/cartoons" class="list_link serif">Multfilmlar</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/series" class="list_link serif">Seriallar</NuxtLink>
                        </li>
                    </ul>
                </div>

                <div class="search">
                    <input v-model="searchQuery" class="search_inp" type="text" placeholder="Qidiruv ...">
                    <button class="search_btn">
                        <img src="@/assets/icons/search.svg" alt="search">
                    </button>
                    <button class="burger-menu" @click="toggleNav">☰</button>


                    <!-- Search results dropdown -->
                    <ul v-if="searchResults.length > 0" class="search-results">
                        <NuxtLink v-for="result in searchResults" :key="result._id"
                            :to="`/watch/${result.id}-${result.type}-${result.title.replace(/\//g, '').trim().replace(/\s+/g, '-')}`">
                            <li class="search-item">
                                <img :src="result.photo_url" alt="result">
                                <!-- <span>{{ result.title }}</span> -->
                                <span> {{ result.title.length > 20 ? result.title.slice(0, 20) + '...' : result.title
                                    }}</span>


                            </li>
                        </NuxtLink>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.nav-wrapper {
    width: 100%;
    background: #121212;
    padding: 20px 0px;

    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100% !important;

        .links {
            display: flex;
            align-items: center;
            gap: 50px;

            .logo {
                color: white;
                font-size: 28px;
                transition: .3s;

                &:hover {
                    color: #edd13a;
                }
            }

            .link_list {
                display: flex;
                align-items: center;
                gap: 20px;

                li {
                    .list_link {
                        font-size: 18px;
                        color: #fff;
                        transition: .3s;

                        &:hover {
                            color: #edd13a;
                        }
                    }
                }
            }
        }

        .search {
            position: relative;
            width: 400px;
            display: flex;
            align-items: center;

            .burger-menu {
                display: none;
                background: none;
                border: none;
                font-size: 24px;
                color: white;
                cursor: pointer;
            }

            .search_inp {
                background-color: #232323;
                border-radius: 6px;
                width: 100%;
                padding: 5px 5px;
                color: white;
                border: none;
                outline: none;
                height: 30px;
                font-size: 18px;
                font-family: 'PT Serif';

                &::placeholder {
                    font-family: 'PT Serif';
                }
            }

            .search_btn {
                position: absolute;
                right: 0px;
                top: 7px;
                background: none;
                border: none;
                cursor: pointer;

                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }

            .search-results {
                position: absolute;
                // width: 400px;
                overflow: hidden;
                top: 40px;
                width: 100%;
                background: #232323;
                border-radius: 6px;
                z-index: 10;

                .search-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 5px;
                    cursor: pointer;
                    transition: 0.3s;
                    border-radius: 6px;

                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 6px;
                    }

                    span {
                        color: white;
                        font-size: 16px;
                        font-family: 'PT Serif';
                    }

                    &:hover {
                        background: #333;
                    }
                }
            }
        }
    }
}

@media (max-width: 1200px) {
    .nav-wrapper {
        .navbar {
            width: 90% !important;
            margin: auto;
        }
    }
}

@media (max-width: 1024px) {
    .nav-wrapper {
        .navbar {
            width: 90% !important;
            margin: auto;

            .links {
                gap: 30px;

                .link_list {
                    gap: 10px;
                }
            }


            .search {
                width: 300px;
            }
        }
    }
}

@media (max-width: 846px) {
    .nav-wrapper {
        .navbar {
            width: 90% !important;
            margin: auto;

            .links {
                gap: 30px;

                .link_list {
                    display: none;
                    flex-direction: column;
                    position: absolute;
                    top: 60px;
                    left: 0;
                    width: 100%;
                    background: #121212;
                    padding: 10px 0;
                }

                .link_list.open {
                    display: flex;
                }

                .link_list li {
                    text-align: center;
                    padding: 10px 0;
                }
            }


            .search {
                width: 300px;
                gap: 10px;

                .search_btn {
                    right: 30px;
                }

                .burger-menu {
                    display: block;
                }

            }
        }
    }
}


@media (max-width: 522px) {
    .nav-wrapper {
        .navbar {
            .search {
                width: 170px;

                .search-results {
                    width: 170px !important;
                }
            }


        }
    }
}
</style>
