<template>
    <div ref="mainLayout" class="layout">
        <header class="header">
            <hamburger @hamburgerClick="onHamburgerClick"/>

            <nav class="nav">
                <div class="left">
                    <g-link class="nav__link main" to="/">CHRISTOPH MÜNKS</g-link>
                </div>

                <div class="right">
                    <g-link class="nav__link" to="/projects">{{ lang['nav-en'].projects.toUpperCase() }}</g-link>
                    <g-link class="nav__link" to="/products/">{{ lang['nav-en'].products.toUpperCase() }}</g-link>
                    <g-link class="nav__link" to="/about/">{{ lang['nav-en'].about.toUpperCase() }}</g-link>
                    <g-link class="nav__link" to="/contact/">{{ lang['nav-en'].contact.toUpperCase() }}</g-link>
                    <switcher class="switcher"></switcher>
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
    import Hamburger from '~/components/nav/Hamburger.vue'
    import Switcher from '~/components/nav/Switcher.vue'
    import Lang from '~/lang.json'

    export default {
        components: {
            Hamburger,
            Switcher
        },

        data: function () {
            return {
                lang: Lang
            }
        },

        methods: {
            onHamburgerClick() {
                this.hamburgerClicked = !this.hamburgerClicked;
                if (this.hamburgerClicked) {
                    this.$refs.mainLayout.style.overflow = 'hidden';
                } else {
                    this.$refs.mainLayout.style.overflow = 'initial';
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