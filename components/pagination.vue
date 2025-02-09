<template>
    <div class="pagination">
          <button class="pagination-button" :disabled="currentPage === 1" @click="$emit('page-change', currentPage - 1)">
                &lt;
          </button>
          <span class="pagination-text">
                Sahifa {{ currentPage }} / {{ totalPages }}
          </span>
          <button class="pagination-button" :disabled="currentPage === totalPages" @click="$emit('page-change', currentPage + 1)">
                &gt;
          </button>
    </div>
</template>

<script setup>
defineProps({
    currentPage: {
          type: Number,
          required: true,
    },
    totalPages: {
          type: Number,
          required: true,
    },
});

defineEmits(['page-change']);
</script>

<style scoped>
.pagination {
    width: 100%;
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    margin-top: 70px;
    height: 50px;
    border-radius: 8px;
}

.pagination-button {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0e0d0d;
    color: white;
    height: 100%;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
}

.pagination-button:disabled {
    background-color: rgb(34, 32, 32);
    cursor: not-allowed;
}

.pagination-text {
    min-width: 115px;
    text-align: center;
    background-color: #0e0d0d;
    color: white;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 0 20px;
    font-family: 'Manrope';
    font-weight: bold;
}
</style>
