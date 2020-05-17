<template>
    <Layout>
        <div class="page-content">
            {{ lang[langContentPath].intro }}
        </div>
    </Layout>
</template>

<script>
    import Lang from '~/lang.json'

    export default {
        metaInfo: {
            title: 'Christoph Münks - Blacksmith'
        },

        data: function () {
            return {
                lang: Lang,
                activeLanguage: 'en',
                langContentPath: 'index-en'
            }
        },

        mounted() {
            this.setLanguage();
            window.addEventListener('langChanged', this.setLanguage);
        },

        methods: {
            setLanguage() {
                console.log('setLanguage!');

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
