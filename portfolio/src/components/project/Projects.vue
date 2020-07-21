<template>
    <div ref="projectContainer" class="project-container">
        <div v-for="project in lang[langPath]" @mouseover="showOverlay" @mouseleave="hideOverlay" class="image-wrapper">
            <g-image style="width: 100%" :src="require(`!!assets-loader!@images/${project.src}`)" :alt="project.alt"/>
            <transition name="fade">
                <div v-if="overlayState" ref="overlayText" class="overlayText">{{ project['short-description'] }}</div>
            </transition>
        </div>
    </div>
</template>
<script>
    import Lang from '~/lang/projects.json';

    export default {
        data: function () {
            return {
                lang: Lang,
                hamburgerOpen: false,
                isAnimating: false,
                activeLanguage: 'en',
                langPath: 'en',
                overlayState: false
            }
        },

        mounted() {
            this.setLanguage();
            window.addEventListener('langChanged', this.setLanguage);
        },

        methods: {
            setLanguage() {
                if (localStorage.getItem("language") !== null) {
                    this.activeLanguage = localStorage.getItem("language");
                }

                this.langPath = this.activeLanguage;
            },

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