<template>
    <Layout>
        <div class="page-content">
            <div class="flex-container">
                <div class="contactTextContainer">
                    <h1 class="contactTitle">{{ lang[langPath].title.toUpperCase() }}</h1>
                    <p class="contactInfoParagraph">{{ lang[langPath]['contact-info'] }}</p>
                </div>

                <form class="contactForm" autocomplete="off">
                    <div class="nameFieldContainer">
                        <label for="firstName">Name *</label>

                        <div class="nameInputs">
                            <input type="text" id="firstName" name="firstName" placeholder="First name">
                            <input type="text" id="lastName" name="lastName" placeholder="Last name">
                        </div>
                    </div>

                    <div class="emailFieldContainer">
                        <label for="emailAddress">Email address *</label>
                        <input type="text" id="emailAddress" name="emailAddress" placeholder="example@email.com">
                    </div>

                    <div class="subjectContainer">
                        <label for="subject">Subject *</label>
                        <input type="text" id="subject" name="subject" placeholder="Project">
                    </div>

                    <div class="messageContainer">
                        <label for="message">Message *</label>
                        <textarea id="message" name="message"/>
                  </div>

                    <input class="formSubmitButton" type="submit" value="SUBMIT">
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