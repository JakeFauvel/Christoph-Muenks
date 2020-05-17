<template>
    <div ref="mainLayout" class="layout">
        <header class="header">
            <hamburger @hamburgerClick="onHamburgerClick"/>

            <nav class="nav">
                <div class="left">
                    <g-link class="nav__link main" to="/">CHRISTOPH MÜNKS</g-link>
                </div>

                <div class="right">
                    <g-link class="nav__link" to="/projects">PROJECTS</g-link>
                    <g-link class="nav__link" to="/products/">PRODUCTS</g-link>
                    <g-link class="nav__link" to="/about/">ABOUT</g-link>
                    <g-link class="nav__link" to="/contact/">CONTACT</g-link>
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

    export default {
        components: {
            Hamburger
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
    @import './styles/default';
</style>