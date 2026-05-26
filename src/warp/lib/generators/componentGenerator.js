import { createFile } from '../utils/fileUtils.js';

export function generateComponent(name, savePath) {
    const content = `<script setup>
</script>

<template>
    <div>
        ${name}
    </div>
</template>
`;

    createFile(name, savePath, content);
}