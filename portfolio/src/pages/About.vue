<template>
    <Layout>
        <div class="page-content">
            <h2 class="about-header">{{ lang[langPath].title.toUpperCase() }}</h2>

            <p class="about-info-paragraph">
                {{ lang[langPath]['about-para-one'] }}
            </p>

            <p class="about-info-paragraph">
                {{ lang[langPath]['about-para-two'] }}
            </p>

            <img src="../../src/assets/images/about/christoph-hands.png" alt="Blacksmith hands">
        </div>
    </Layout>
</template>

<script>
    import Lang from '~/lang/pages/about.json';

    export default {
        metaInfo: {
            title: 'Christoph Münks - About'
        },

        data: function () {
            return {
                lang: Lang,
                activeLanguage: 'en',
                langPath: 'about-en'
            }
        },

        mounted() {
            this.setLanguage();
            window.addEventListener('langChanged', this.setLanguage);
            document.body.style.overflow = 'initial';
        },

        beforeDestroy() {
            window.removeEventListener('langChanged', this.setLanguage);
        },

        methods: {
            setLanguage() {
                if (localStorage.getItem("language") !== null) {
                    this.activeLanguage = localStorage.getItem("language");
                }

                this.langPath = 'about-' + this.activeLanguage;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles/about';
</style>
