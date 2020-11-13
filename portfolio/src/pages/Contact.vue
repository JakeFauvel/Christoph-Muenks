<template>
    <Layout>
        <div class="page-content">
            <div class="flex-container">
                <div class="contactTextContainer">
                    <h1 class="contactTitle">{{ lang[langPath].title.toUpperCase() }}</h1>
                    <p class="contactInfoParagraph">{{ lang[langPath]['contact-info'] }}</p>
                </div>

                <form class="contactForm" autocomplete="off" action="https://formspree.io/xoqpqogy" method="POST">
                    <div class="nameFieldContainer">
                        <label for="firstName">{{ lang[langPath]['name'] }}  *</label>

                        <div class="nameInputs">
                            <input @keyup="firstNameChange" :class="{'not-valid': !firstNameValid}" ref="firstName" type="text" id="firstName" name="First name" :placeholder="lang[langPath]['first-name']">
                            <input @keyup="lastNameChange" :class="{'not-valid': !lastNameValid}" ref="lastName" type="text" id="lastName" name="Last name" :placeholder="lang[langPath]['last-name']">
                        </div>
                    </div>

                    <div class="emailFieldContainer">
                        <label for="emailAddress">{{ lang[langPath]['email'] }} *</label>
                        <input @keyup="emailChange" :class="{'not-valid': !emailValid}" ref="emailAddress" type="text" id="emailAddress" name="Email address" placeholder="example@email.com">
                    </div>

                    <div class="subjectContainer">
                        <label for="subject">{{ lang[langPath]['subject'] }} *</label>
                        <input @keyup="subjectChange" :class="{'not-valid': !subjectValid}" ref="subject" type="text" id="subject" name="Subject" placeholder="Project">
                    </div>

                    <div class="messageContainer">
                        <label for="message">{{ lang[langPath]['message'] }} *</label>
                        <textarea @keyup="messageChange" :class="{'not-valid': !messageValid}" ref="message" id="message" name="Message"/>
                  </div>

                    <input :disabled="!isDisabled" class="formSubmitButton" type="submit" :value="lang[langPath]['submit'].toUpperCase()">
                </form>
            </div>
        </div>
    </Layout>
</template>

<script>
    import Lang from '~/lang/pages/contact.json';

    export default {
        metaInfo: {
            title: ''
        },

        data: function () {
            return {
                lang: Lang,
                activeLanguage: 'de',
                langPath: 'contact-de',
                firstNameValid: false,
                lastNameValid: false,
                emailValid: false,
                subjectValid: false,
                messageValid: false,
            }
        },

        computed: {
            isDisabled() {
                return this.nameValid && this.emailValid && this.subjectValid && this.messageValid;
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

                this.langPath = 'contact-' + this.activeLanguage;
            },

            firstNameChange() {
                this.$refs.firstName.classList.add('user-initiated');
                this.firstNameValid = this.$refs.firstName.value.length;
            },

            lastNameChange() {
                this.$refs.lastName.classList.add('user-initiated');
                this.lastNameValid = this.$refs.lastName.value.length > 1;
            },

            emailChange() {
                this.$refs.emailAddress.classList.add('user-initiated');
                this.emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.$refs.emailAddress.value);
            },

            subjectChange() {
                this.$refs.subject.classList.add('user-initiated');
                this.subjectValid = this.$refs.subject.value.length > 1;
            },

            messageChange() {
                this.$refs.message.classList.add('user-initiated');
                this.messageValid = this.$refs.message.value.length > 1;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles/contact';
</style>