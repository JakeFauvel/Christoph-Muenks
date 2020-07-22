<template>
    <Layout>
        <div class="page-content">
            <div class="flex-container">
                <div class="contactTextContainer">
                    <h1 class="contactTitle">{{ lang[langPath].title.toUpperCase() }}</h1>
                    <p class="contactInfoParagraph">{{ lang[langPath]['contact-info'] }}</p>
                </div>

                <form class="contactForm">
                    <div class="nameFieldContainer">
                        <label for="firstName">First name:</label>
                        <input type="text" id="firstName" name="firstName"><br>

                        <label for="lastName">Last name:</label>
                        <input type="text" id="lastName" name="lastName">
                    </div>

                    <label for="emailAddress">Email address:</label><br>
                    <input type="text" id="emailAddress" name="emailAddress">

                    <label for="subject">Subject:</label><br>
                    <input type="text" id="subject" name="subject">

                    <label for="message">Message:</label><br>
                    <textarea id="message" name="message"/>
                </form>
            </div>
        </div>
    </Layout>
</template>

<script>
    import Lang from '~/lang/contact.json';

    export default {
        metaInfo: {
            title: 'Christoph Münks - Contact'
        },

        data: function () {
            return {
                lang: Lang,
                activeLanguage: 'en',
                langPath: 'contact-en'
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

                this.langPath = 'contact-' + this.activeLanguage;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles/contact';
</style>