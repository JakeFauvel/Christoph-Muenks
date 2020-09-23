<template>
    <div class="projectOverlay">
        <div class="controls" @click="overlayClose">
            <div class="left"></div>
            <div class="close"></div>
            <div class="right"></div>
        </div>

        <div class="content">
            <h2 class="projectHeader">Project XYZ</h2>
            <p class="projectInfo">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
        </div>
    </div>
</template>

<script>
    export default {
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
