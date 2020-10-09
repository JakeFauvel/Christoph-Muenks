<template>
    <div class="layout">
        <header class="header">
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

        <slot></slot>
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
    import Lang from '~/lang/nav/nav.json';

    export default {
        components: {
            Hamburger,
            Switcher
        },

        data: function () {
            return {
                lang: Lang,
                activeLanguage: 'de',
                langPath: 'nav-de'
            }
        },

        mounted() {
            // this.setLanguage();
            // window.addEventListener('langChanged', this.setLanguage);
        },

        methods: {
            setLanguage() {
                if (localStorage.getItem("language") !== null) {
                    this.activeLanguage = localStorage.getItem("language");
                }

                this.langPath = 'nav-' + this.activeLanguage;
            },

            onHamburgerClick() {
                this.hamburgerClicked = !this.hamburgerClicked;
                let body = document.body;

                if (this.hamburgerClicked) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = 'initial';
                }
            }
        }
    }
</script>

<style lang="scss">
    // Default styles
    @import './styles/default';
    // Global fonts
    @import url("https://use.typekit.net/lvt4ped.css");
</style>