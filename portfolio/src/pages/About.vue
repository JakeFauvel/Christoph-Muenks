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

            <img src="http://www.schmiede-muenks.de/img/werkstatt/haende.jpg" alt="Blacksmith hands">
            <img src="http://www.schmiede-muenks.de/img/werkstatt/werkstatt-1.jpg" alt="Blacksmith hands">
            <img src="http://www.schmiede-muenks.de/img/werkstatt/werkstatt-6.jpg" alt="Blacksmith hands">
            <img src="http://www.schmiede-muenks.de/img/werkstatt/schmiede_01.jpg" alt="Blacksmith hands">
            <img src="http://www.schmiede-muenks.de/img/werkstatt/schmiede-02.jpg" alt="Blacksmith hands">
        </div>
    </Layout>
</template>

<script>
    import Lang from '~/lang/pages/about.json';

    export default {
        metaInfo: {
            title: ''
        },

        data: function () {
            return {
                lang: Lang,
                activeLanguage: 'de',
                langPath: 'about-de'
            }
        },

        mounted() {
            // this.setLanguage();
            // window.addEventListener('langChanged', this.setLanguage);
            document.body.style.overflow = 'initial';

            let event = new CustomEvent("routeChanged", {});
            dispatchEvent(event);
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
