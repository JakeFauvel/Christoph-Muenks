<template>
    <Layout>
        <div class="page-content homepage">
            <projects v-for="projectInfo in projectsLang[activeLanguage]"
                      :project="projectInfo"
                      :key="projectInfo.key"
                      v-on:click.native="toggleOverlay(projectInfo)">
            </projects>

            <project v-if="overlayActive" :projectInfo="projectInfo" class="projectOverlay"></project>
        </div>
    </Layout>
</template>

<script>
    import Lang from '~/lang/pages/index.json'
    import Projects from '~/components/project/Projects.vue';
    import Project from '~/components/project/Project.vue';
    import ProjectsLang from '~/lang/projects/projects.json';

    export default {
        metaInfo: {
            title: 'Christoph Münks - Blacksmith'
        },

        components: {
            Projects,
            Project
        },

        data: function () {
            return {
                lang: Lang,
                projectsLang: ProjectsLang,
                activeLanguage: 'en',
                langContentPath: 'index-en',
                overlayActive: false,
                projectInfo: null
            }
        },

        mounted() {
            this.setLanguage();
            window.addEventListener('langChanged', this.setLanguage);
            window.addEventListener('overlayClosed', this.toggleOverlay);
        },

        methods: {
            setLanguage() {
                if (localStorage.getItem("language") !== null) {
                    this.activeLanguage = localStorage.getItem("language");
                }

                this.langContentPath = 'index-' + this.activeLanguage;
            },

            toggleOverlay(projectInfo) {
                this.projectInfo = projectInfo;

                if (this.overlayActive) {
                    document.body.style.overflow = 'initial';
                    this.overlayActive = false;
                } else {
                    document.body.style.overflow = 'hidden';
                    this.overlayActive = true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles/index';
</style>
