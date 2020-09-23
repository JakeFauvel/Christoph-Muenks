<template>
    <div class="projectOverlay">
        <div class="controls" @click="overlayClose">
            <div class="left"></div>
            <div class="close"></div>
            <div class="right"></div>
        </div>

        <div class="content">
            <h2 class="projectHeader">{{ project.title }}</h2>
            <p class="projectInfo">{{ project['long-description'] }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['projectInfo'],

        data: function () {
            return {
                project: this.projectInfo,
            }
        },

        methods: {
            overlayClose() {
                // Dispatch a custom event to listen for
                // the language change accross the site
                let event = new CustomEvent("overlayClosed", {});
                dispatchEvent(event);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles/project';
</style>
