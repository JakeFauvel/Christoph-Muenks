<template>
    <Layout>
        <div class="page-content homepage">
            <projects v-for="(projectInfo, i) in projectsLang[activeLanguage]"
                      :project="projectInfo"
                      :key="projectInfo.key"
                      v-on:click.native="toggleOverlay(projectInfo, i)">
            </projects>

            <project v-if="overlayActive" :projectInfo="projectInfo" :projectIndex="projectIndex" page="homepage" class="projectOverlay"></project>
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
                activeLanguage: 'de',
                langContentPath: 'index-de',
                overlayActive: false,
                projectInfo: null,
                projectIndex: null,
            }
        },

        mounted() {
            document.body.style.overflow = 'initial';
            // this.setLanguage();
            // window.addEventListener('langChanged', this.setLanguage);
            window.addEventListener('overlayClosed', this.toggleOverlay);
        },

        methods: {
            setLanguage() {
                if (localStorage.getItem("language") !== null) {
                    this.activeLanguage = localStorage.getItem("language");
                }

                this.langContentPath = 'index-' + this.activeLanguage;
            },

            toggleOverlay(projectInfo, index) {
                this.projectInfo = projectInfo;
                this.projectIndex = index;

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
