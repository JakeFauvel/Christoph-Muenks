<template>
    <div class="dropdown-wrapper">
        <div class="selected">
            <span>EN</span>
            <dropdown-icon></dropdown-icon>
        </div>
    </div>
</template>
<script>
    import DropdownIcon from '~/components/nav/DropdownIcon.vue'

    export default {
        components: {
            DropdownIcon
        },
    }
</script>
<style lang="scss" scoped>
    @import './styles/switcher';
</style>