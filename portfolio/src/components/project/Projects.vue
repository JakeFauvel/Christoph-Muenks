<template>
    <div ref="projectContainer" class="project-container">
        <div v-for="project in lang[langPath]" class="image-wrapper">
            <g-image style="width: 100%" :src="require(`!!assets-loader!@images/${project.src}`)" :alt="project.alt"/>
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
        }
    }
</script>
<style lang="scss" scoped>
    @import './styles/projects';
</style>