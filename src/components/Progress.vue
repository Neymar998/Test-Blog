<template>
    <div>
        <!-- {{ parseInt(progress * 100) + '%' }} -->
        <div v-if="show">
            <el-progress color="gray" :percentage="parseInt(progress * 100)" />
        </div>
    </div>
</template>

<script setup>
import FakeProgress from 'fake-progress';
import { ref, watch } from 'vue'

let show = ref(true)

const props = defineProps({
    show: {
        type: Boolean,
        default: true
    },
    finish: {
        type: Boolean,
        default: false
    }
})
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

watch(() => props.finish, (val) => {
    if (val) {
        fake.end()
        setTimeout(() => {
            show.value = false
        }, 500);
    }
}, { immediate: true });

// watch(progress, (val) => {
//     if (val >= 1) {
//         setTimeout(() => {
//             // show.value = false;
//             show = false
//         }, 800);
//     }
// });


</script>
