<template>
<font-awesome-icon :icon="name" :class="[`icon-size-${size}`]" />
</template>

<script>
export default {
    props: {
        name: {
            default: "",
        },
        size: {
            default: "normal",
        },
    },
};
</script>

<style lang="scss" scoped>
.icon {
    &-size {
        &-small {
            font-size: 15px;
        }

        &-normal {
            font-size: 18px;
        }

        &-large {
            font-size: 21px;
        }
    }
}
</style>
