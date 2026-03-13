import { createFile } from '../utils/fileUtils.js';

export function generatePage(name, savePath) {
    const content = `<script setup>
</script>

<template>
    <div class="content">
        <h3 class="block-title">${name}</h3>
    </div>
</template>
`;

    createFile(name, savePath, content);
}