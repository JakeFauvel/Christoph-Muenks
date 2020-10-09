<template>
    <div ref="projectContainer" class="project-container">
        <div @mouseover="showOverlay" @mouseleave="hideOverlay" class="image-wrapper">
            <img style="width: 100%" :src="project.src" :alt="project.alt"/>
        </div>

        <div ref="overlayText" class="overlayText">{{ project['short-description'] }}</div>
    </div>
</template>
<script>
    export default {
        props: ['project'],

        data: function () {
            return {
                overlayState: false
            }
        },

        methods: {
            showOverlay() {
                this.overlayState = true;
            },

            hideOverlay() {
                this.overlayState = false;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import './styles/projects';
</style>