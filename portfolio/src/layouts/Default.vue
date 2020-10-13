<template>
    <div class="layout">
        <header ref="header" class="header">
            <hamburger @hamburgerClick="onHamburgerClick"/>

            <nav class="nav">
                <div class="left">
                    <g-link class="nav__link main" to="/">CHRISTOPH MÜNKS</g-link>
                </div>

                <div class="right">
                    <div class="nav-item-container">
                        <g-link class="nav__link rightLink" to="/">{{ lang[langPath].projects.toUpperCase() }}</g-link>
                        <g-link class="nav__link rightLink" to="/products/">{{ lang[langPath].products.toUpperCase() }}</g-link>
                        <g-link class="nav__link rightLink" to="/about/">{{ lang[langPath].about.toUpperCase() }}</g-link>
                        <g-link class="nav__link rightLink" to="/contact/">{{ lang[langPath].contact.toUpperCase() }}</g-link>
                        <!-- Switcher component-->
                        <!--<switcher></switcher>-->
                    </div>
                </div>
            </nav>
        </header>

        <transition name="fade" appear>
            <main ref="main">
                 <slot></slot>
            </main>
        </transition>

        <transition name="fade">
            <impressum v-if="overlayActive" ></impressum>
        </transition>

        <cookie-message v-show="shouldShowCookieMessage" :cookieMessage="lang[langPath].cookieMessage"/>

        <footer ref="footer" id="importantInfo" class="importantInfo">
            <a @click="toggleOverlay">Impressum | Datenschutz</a>
        </footer>
    </div>
</template>

<static-query>
    query {
        metadata {
            siteName
        }
    }
</static-query>

<script>
    import Hamburger from '~/components/nav/Hamburger.vue';
    import Switcher from '~/components/nav/Switcher.vue';
    import Impressum from '~/components/impressum/Impressum.vue';
    import CookieMessage from '~/components/cookie/CookieMessage.vue';
    import Lang from '~/lang/nav/nav.json';
    import ImagesLoaded from "imagesloaded";

    export default {
        components: {
            Hamburger,
            Switcher,
            CookieMessage,
            Impressum
        },

        data: function () {
            return {
                lang: Lang,
                activeLanguage: 'de',
                langPath: 'nav-de',
                shouldShowCookieMessage: false,
                overlayActive: false,
            }
        },

        mounted() {
            // this.setLanguage();
            // window.addEventListener('langChanged', this.setLanguage);
            window.addEventListener('cookiesAccepted', this.checkIfCookiesAccepted, {passive: true});
            this.checkIfCookiesAccepted();
            ImagesLoaded(this.$refs.main, this.setInitialImportantInfoState);

            window.addEventListener('routeChanged', this.setBodyHeight, {passive: true});
            window.addEventListener('resize', this.setBodyHeight, {passive: true});
            window.addEventListener('impressumOverlayClosed', this.toggleOverlay, {passive: true});

            if (document.body.offsetHeight > window.innerHeight) {
                let importantInfo = document.getElementById('importantInfo');
                importantInfo.style.display = 'initial';
            }

            window.onscroll = function() {
                this.updateImportantInfoOnScroll();
            }.bind(this);
        },

        methods: {
            setLanguage() {
                if (localStorage.getItem("language") !== null) {
                    this.activeLanguage = localStorage.getItem("language");
                }

                this.langPath = 'nav-' + this.activeLanguage;
            },

            setInitialImportantInfoState() {
                if (window.innerHeight >= document.body.offsetHeight) {
                    this.$refs.footer.style.display = 'initial';
                } else {
                    this.$refs.footer.style.display = 'none';
                }

                this.setBodyHeight();
            },

            setBodyHeight() {
                document.body.style.height = '100%';

                if (document.body.scrollHeight > window.innerHeight) {
                    document.body.style.height = document.body.scrollHeight + 'px';
                } else {
                    document.body.style.height = '100%';
                }
            },

            updateImportantInfoOnScroll() {
                let importantInfo = document.getElementById('importantInfo');

                if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
                    importantInfo.style.display = 'initial';
                } else {
                    importantInfo.style.display = 'none';
                }
            },

            onHamburgerClick() {
                this.hamburgerClicked = !this.hamburgerClicked;
                let body = document.body;

                if (this.hamburgerClicked) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = 'initial';
                }
            },

            toggleOverlay() {
                if (this.overlayActive) {
                    document.body.style.overflow = 'initial';
                    this.overlayActive = false;
                } else {
                    document.body.style.overflow = 'hidden';
                    this.overlayActive = true;
                }
            },

            checkIfCookiesAccepted() {
                this.shouldShowCookieMessage = localStorage.getItem("cookiesAccepted") === null;
            },
        }
    }
</script>


<style lang="scss">
    // Default styles
    @import './styles/default';
    // Global fonts
    @import url("https://use.typekit.net/lvt4ped.css");
</style>