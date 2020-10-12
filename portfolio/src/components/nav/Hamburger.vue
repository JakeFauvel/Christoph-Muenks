<template>
    <div class="menu-container">
        <div v-on:click="hamburgerClick" class="hamburger-container" :class="{open: hamburgerOpen}">
            <div ref="lineOne" class="line-one" :class="{open: hamburgerOpen}"></div>
            <div ref="lineTwo" class="line-two" :class="{open: hamburgerOpen}"></div>
            <div ref="lineThree" class="line-three" :class="{open: hamburgerOpen}"></div>
        </div>

        <div ref="menu" class="menu" :class="{closed: !hamburgerOpen}">
            <g-link class="nav-item" to="/">
                <div class="nav-item-underline"></div>
                {{ lang[langPath].projects.toUpperCase() }}
            </g-link>
            <g-link class="nav-item" to="/products/">
                <div class="nav-item-underline"></div>
                {{ lang[langPath].products.toUpperCase() }}
            </g-link>
            <g-link class="nav-item" to="/about/">
                <div class="nav-item-underline"></div>
                {{ lang[langPath].about.toUpperCase() }}
            </g-link>
            <g-link class="nav-item" to="/contact/">
                <div class="nav-item-underline"></div>
                {{ lang[langPath].contact.toUpperCase() }}
                <div class="nav-item-language-underline"></div>
            </g-link>

            <!--<div class="language-options-container">-->
                <!--<a ref="langEN" @click="enLanguageSelect" class="language-option">-->
                    <!--EN-->
                <!--</a>-->
                <!--<a ref="langDE" @click="deLanguageSelect" class="language-option">-->
                    <!--DE-->
                <!--</a>-->
            <!--</div>-->
        </div>
    </div>
</template>
<script>
    import Lang from '~/lang/nav/nav.json';

    export default {
        data: function () {
            return {
                lang: Lang,
                hamburgerOpen: false,
                isAnimating: false,
                activeLanguage: 'de',
                langPath: 'nav-de',
                Velocity: null,
            }
        },

        mounted() {
            // this.setLanguage();
            // window.addEventListener('langChanged', this.setLanguage);

            // Only load Velocity if process is on the client side
            if (process.isClient) {
               this.Velocity =  require('./VelocityCopy');
            }
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
                // this.getActiveLanguage();

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
                this.Velocity(lineOne, {translateY: 10}, {duration: 200, easing: 'easeOutElastic', complete: function() {
                        this.Velocity(lineOne, {rotateZ: 45}, {duration: 200,  easing: 'easeOutElastic'});
                }.bind(this)});

                // Move third line to the middle and hide
                this.Velocity(lineThree, {translateY: -10}, {duration: 200, easing: 'easeOutElastic', complete: function() {
                    lineThree.style.display = 'none';10
                }});

                // Rotate line two to finish the X
                this.Velocity(lineTwo, {translateY: 0}, {duration: 200, easing: 'easeOutElastic', complete: function() {
                        this.Velocity(lineTwo, {rotateZ: -45}, {duration: 200,  easing: 'easeOutElastic'});
                }.bind(this)});

                // Display the menu / overflow
                menu.style.display = 'flex';
                // Animate the menu / overflow opacity
                this.Velocity(menu, {opacity: 1}, {duration: 250});

                this.resetIsAnimatingState();
            },

            closeHamburger(lineOne, lineTwo, lineThree, menu) {
                if (this.isAnimating) return;
                this.isAnimating = true;

                // Set hamburger state/emit event
                this.hamburgerOpen = !this.hamburgerOpen;
                this.$emit('hamburgerClick', this.hamburgerOpen);

                // Animate the first line
                this.Velocity(lineOne, {rotateZ: 0}, {duration: 200, easing: 'easeOutElastic', complete: function() {
                        this.Velocity(lineOne, {translateY: 0}, {duration: 200, easing: 'easeOutElastic'});
                }.bind(this)});

                // Show the second line
                lineTwo.style.display = 'block';
                // Animate opacity / hide menu
                this.Velocity(menu, {opacity: 0}, {duration: 200, complete: function() {
                    menu.style.display = 'none';
                }});

                // Animate the third line
                this.Velocity(lineTwo, {rotateZ: 0}, {duration: 200, easing: 'easeOutElastic', complete: function() {
                        this.Velocity(lineTwo, {translateY: 0}, {duration: 200, easing: 'easeOutElastic'});
                }.bind(this)});

                // Move third line to the middle and hide
                lineThree.style.display = 'block';
                this.Velocity(lineThree, {translateY: 0}, {duration: 200, easing: 'easeOutElastic'});

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