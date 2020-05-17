<template>
    <div class="menu-container">
        <div v-on:click="hamburgerClick" class="hamburger-container">
            <div ref="lineOne" class="line-one" :class="{open: hamburgerOpen}"></div>
            <div ref="lineTwo" class="line-two" :class="{open: hamburgerOpen}"></div>
            <div ref="menuText" class="menu-text" :class="{open: hamburgerOpen}">MENU</div>
        </div>
        <div ref="menu" class="menu" :class="{closed: !hamburgerOpen}">
            <a v-for="navItem in navItems" :href="navItem.route" class="nav-item">{{ navItem.label }}</a>
        </div>
    </div>
</template>
<script>
    let Velocity = require('velocity-animate');

    module.exports = {
        data: function () {
            return {
                hamburgerOpen: false,
                isAnimating: false,
                navItems: {
                    0: {
                        label: 'HOME',
                        route: '/'
                    },
                    1: {
                        label: 'PROJECTS',
                        route: '/projects'
                    },
                    2: {
                        label: 'PRODUCTS',
                        route: '/products'
                    },
                    3: {
                        label: 'ABOUT',
                        route: '/about'
                    },

                    3: {
                        label: 'CONTACT',
                        route: '/contact'
                    },
                }
            }
        },

        methods: {
            hamburgerClick() {
                let lineOne = this.$refs.lineOne;
                let lineTwo = this.$refs.lineTwo;
                let menu = this.$refs.menu;

                if (!this.hamburgerOpen) {
                    this.openHamburger(lineOne, lineTwo, menu);
                } else {
                    this.closeHamburger(lineOne, lineTwo, menu);
                }
            },

            openHamburger(lineOne, lineTwo, menu) {
                if (this.isAnimating) return;
                this.isAnimating = true;

                // Set hamburger state / emit event
                this.hamburgerOpen = !this.hamburgerOpen;
                this.$emit('hamburgerClick', this.hamburgerOpen);

                // Animate the first line
                Velocity(lineOne, {translateY: 0}, {duration: 200, easing: 'easeOutElastic', complete: function() {
                    Velocity(lineOne, {rotateZ: 45}, {duration: 200,  easing: 'easeOutElastic'});
                }});
                // Display the menu / overflow
                menu.style.display = 'flex';
                // Animate the menu / overflow opacity
                Velocity(menu, {opacity: 1}, {duration: 250});
                // Animate third line
                Velocity(lineTwo, {translateY: -15}, {duration: 200, easing: 'easeOutElastic', complete: function() {
                    Velocity(lineTwo, {rotateZ: -45}, {duration: 200, easing: 'easeOutElastic'});
                }});

                this.resetIsAnimatingState();
            },

            closeHamburger(lineOne, lineTwo, menu) {
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
                Velocity(menu, {opacity: 0}, {duration: 100, complete: function() {
                    menu.style.display = 'none';
                }});
                // Animate the third line
                Velocity(lineTwo, {rotateZ: 0}, {duration: 200, easing: 'easeOutElastic', complete: function() {
                    Velocity(lineTwo, {translateY: 0}, {duration: 200, easing: 'easeOutElastic'});
                }});

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