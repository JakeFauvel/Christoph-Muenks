<template>
    <div class="menu-container">
        <div v-on:click="hamburgerClick" class="hamburger-container">
            <div ref="lineOne" class="line-one" :class="{open: hamburgerOpen}"></div>
            <div ref="lineTwo" class="line-two" :class="{open: hamburgerOpen}"></div>
            <div ref="lineThree" class="line-three" :class="{open: hamburgerOpen}"></div>
        </div>

        <div ref="menu" class="menu" :class="{closed: !hamburgerOpen}">
            <a class="nav-item" href="/">
                <div class="nav-item-underline"></div>
                {{ lang[langPath].projects.toUpperCase() }}
            </a>
            <a class="nav-item" href="/products/">
                <div class="nav-item-underline"></div>
                {{ lang[langPath].products.toUpperCase() }}
            </a>
            <a class="nav-item" href="/about/">
                <div class="nav-item-underline"></div>
                {{ lang[langPath].about.toUpperCase() }}
            </a>
            <a class="nav-item" href="/contact/">
                <div class="nav-item-underline"></div>
                {{ lang[langPath].contact.toUpperCase() }}
            </a>
            <div class="nav-item-language-underline"></div>

            <div class="language-options-container">
                <a ref="langEN" @click="enLanguageSelect" class="language-option">
                    EN
                </a>

                <a ref="langDE" @click="deLanguageSelect" class="language-option">
                    DE
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import Lang from '~/lang/nav.json';
    let Velocity = require('velocity-animate');

    export default {
        data: function () {
            return {
                lang: Lang,
                hamburgerOpen: false,
                isAnimating: false,
                activeLanguage: 'en',
                langPath: 'nav-en',
            }
        },

        mounted() {
            this.setLanguage();
            window.addEventListener('langChanged', this.setLanguage);
        },

        methods: {
            setLanguage() {
                if (localStorage.getItem("language") !== null) {
                    this.activeLanguage = localStorage.getItem("language");
                }

                this.langPath = 'nav-' + this.activeLanguage;
            },

            hamburgerClick() {
                let lineOne = this.$refs.lineOne;
                let lineTwo = this.$refs.lineTwo;
                let lineThree = this.$refs.lineThree;
                let menu = this.$refs.menu;
                this.getActiveLanguage();

                if (!this.hamburgerOpen) {
                    this.openHamburger(lineOne, lineTwo, lineThree, menu);
                } else {
                    this.closeHamburger(lineOne, lineTwo, lineThree, menu);
                }
            },

            getActiveLanguage() {
                if (localStorage.getItem("language") !== null) {
                    this.activeLanguage = localStorage.getItem("language");
                }

                this.setActiveLanguageStyle();
            },

            setActiveLanguageStyle() {
                if (this.activeLanguage === 'en') {
                    if (this.$refs.langDE.classList.contains('active-language')) this.$refs.langDE.classList.remove('active-language');
                    this.$refs.langEN.classList.add('active-language');
                } else if (this.activeLanguage) {
                    if (this.$refs.langEN.classList.contains('active-language')) this.$refs.langEN.classList.remove('active-language');
                    this.$refs.langDE.classList.add('active-language');
                }
            },

            enLanguageSelect() {
                this.activeLanguage = 'en';
                localStorage.setItem('language', this.activeLanguage);
                this.setActiveLanguageStyle();
                this.langPath = 'nav-' + this.activeLanguage;

                // Dispatch a custom event to listen for
                // the language change accross the site
                let event = new CustomEvent("langChanged", {});
                dispatchEvent(event);
            },

            deLanguageSelect() {
                this.activeLanguage = 'de';
                localStorage.setItem('language', this.activeLanguage);
                this.setActiveLanguageStyle();
                this.langPath = 'nav-' + this.activeLanguage;

                // Dispatch a custom event to listen for
                // the language change accross the site
                let event = new CustomEvent("langChanged", {});
                dispatchEvent(event);
            },

            openHamburger(lineOne, lineTwo, lineThree, menu) {
                if (this.isAnimating) return;
                this.isAnimating = true;

                // Set hamburger state / emit event
                this.hamburgerOpen = !this.hamburgerOpen;
                this.$emit('hamburgerClick', this.hamburgerOpen);

                // Move first line down to the middle
                Velocity(lineOne, {translateY: 12}, {duration: 200, easing: 'easeOutElastic', complete: function() {
                    Velocity(lineOne, {rotateZ: 45}, {duration: 200,  easing: 'easeOutElastic'});
                }});

                // Move third line to the middle and hide
                Velocity(lineThree, {translateY: -12}, {duration: 200, easing: 'easeOutElastic', complete: function() {
                    lineThree.style.display = 'none';
                }});

                // Rotate line two to finish the X
                Velocity(lineTwo, {translateY: 0}, {duration: 200, easing: 'easeOutElastic', complete: function() {
                    Velocity(lineTwo, {rotateZ: -45}, {duration: 200,  easing: 'easeOutElastic'});
                }});

                // Display the menu / overflow
                menu.style.display = 'flex';
                // Animate the menu / overflow opacity
                Velocity(menu, {opacity: 1}, {duration: 250});

                this.resetIsAnimatingState();
            },

            closeHamburger(lineOne, lineTwo, lineThree, menu) {
                if (this.isAnimating) return;
                this.isAnimating = true;

                // Set hamburger state/emit event
                this.hamburgerOpen = !this.hamburgerOpen;
                this.$emit('hamburgerClick', this.hamburgerOpen);

                // Animate the first line
                Velocity(lineOne, {rotateZ: 0}, {duration: 200, easing: 'easeOutElastic', complete: function() {
                    Velocity(lineOne, {translateY: 0}, {duration: 200, easing: 'easeOutElastic'});
                }});

                // Show the second line
                lineTwo.style.display = 'block';
                // Animate opacity / hide menu
                Velocity(menu, {opacity: 0}, {duration: 200, complete: function() {
                    menu.style.display = 'none';
                }});

                // Animate the third line
                Velocity(lineTwo, {rotateZ: 0}, {duration: 200, easing: 'easeOutElastic', complete: function() {
                    Velocity(lineTwo, {translateY: 0}, {duration: 200, easing: 'easeOutElastic'});
                }});

                // Move third line to the middle and hide
                lineThree.style.display = 'block';
                Velocity(lineThree, {translateY: 0}, {duration: 200, easing: 'easeOutElastic'});

                this.resetIsAnimatingState();
            },

            resetIsAnimatingState() {
                setTimeout(function() {
                    this.isAnimating = false;
                }.bind(this), 500);
            }
        }
    }
</script>
<style scoped lang="scss">
    @import 'styles/hamburger';
</style>