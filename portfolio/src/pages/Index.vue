<template>
    <Layout>
        <div class="page-content homepage">
            <projects v-for="projectInfo in projectsLang[activeLanguage]" :project="projectInfo"></projects>
        </div>
    </Layout>
</template>

<script>
    import Lang from '~/lang/index.json'
    import Projects from '~/components/project/Projects.vue';
    import ProjectsLang from '~/lang/projects.json';

    export default {
        metaInfo: {
            title: 'Christoph Münks - Blacksmith'
        },

        components: {
            Projects,
        },

        data: function () {
            return {
                lang: Lang,
                projectsLang: ProjectsLang,
                activeLanguage: 'en',
                langContentPath: 'index-en',
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

                this.langContentPath = 'index-' + this.activeLanguage;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles/index';
</style>
