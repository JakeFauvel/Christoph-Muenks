<template>
    <div ref="projectContainer" class="project-container">
        <div @mouseover="showOverlay" @mouseleave="hideOverlay" class="image-wrapper">
            <g-image style="width: 100%" :src="require(`!!assets-loader!@images/${project.src}`)" :alt="project.alt"/>
            <transition name="fade">
                <div ref="overlayText" class="overlayText">{{ project['short-description'] }}</div>
            </transition>
        </div>
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