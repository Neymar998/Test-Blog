<template>
    <div>
        <!-- {{ parseInt(progress * 100) + '%' }} -->
        <div v-if="show">
            <el-progress color="gray" :percentage="parseInt(progress * 100)" />
            <button @click="fake.end">End</button>
        </div>
    </div>
</template>

<script setup>
import FakeProgress from 'fake-progress';
import { ref, watch } from 'vue'

const show = ref(true);
const fake = new FakeProgress({
    timeConstant: 10000,
    autoStart: true,
});

const progress = ref(0);

Object.defineProperty(fake, 'progress', {
    set(val) {
        progress.value = val;
    },
    get() {
        return progress.value;
    }
});
watch(progress, (val) => {
    if (val >= 1) {
        setTimeout(() => {
            show.value = false;
        }, 800);
    }
});
</script>
