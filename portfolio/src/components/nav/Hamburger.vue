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
        <div ref="menu-overflow" v-on:click="hamburgerClick" :class="{closed: !hamburgerOpen}" class="menu-overflow"></div>
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
                        label: 'Home',
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
                let menuOverflow = this.$refs['menu-overflow'];

                if (!this.hamburgerOpen) {
                    this.openHamburger(lineOne, lineTwo, menu, menuOverflow);
                } else {
                    this.closeHamburger(lineOne, lineTwo, menu, menuOverflow);
                }
            },

            openHamburger(lineOne, lineTwo, menu, menuOverflow) {
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
                menuOverflow.style.display = 'flex';
                // Animate the menu / overflow opacity
                Velocity(menu, {opacity: 1}, {duration: 250});
                Velocity(menuOverflow, {opacity: 0.5}, {duration: 250});
                // Animate third line
                Velocity(lineTwo, {translateY: -15}, {duration: 200, easing: 'easeOutElastic', complete: function() {
                    Velocity(lineTwo, {rotateZ: -45}, {duration: 200, easing: 'easeOutElastic'});
                }});

                this.resetIsAnimatingState();
            },

            closeHamburger(lineOne, lineTwo, menu, menuOverflow) {
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
                // Animate opacity / hide menuOverflow
                Velocity(menuOverflow, {opacity: 0}, {duration: 100, complete: function() {
                    menuOverflow.style.display = 'none';
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
    .menu-container {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .hamburger-container {
        position: absolute;
        top: 35px;
        left: 30px;
        z-index: 2;
    }

    .line-one, .line-two {
        background: #212121;
        border-radius: 6px;
        width: 45px;
        height: 5px;
        transform-origin: center;
        @media only screen and (min-width: 1024px) {
            display: none !important;
        }
    }

    .line-one.open, .line-two.open {
        background: #FFFFFF;
    }

    .menu-text.open {
        color: #FFFFFF;
    }

    .line-two {
        margin-top: 10px;
    }

    .menu-text {
        font-size: 15px;
        margin-top: 10px;
        @media only screen and (min-width: 1024px) {
            display: none;
        }
    }

    .menu {
        display: none;
        opacity: 0;
        position: absolute;
        flex-direction: column;
        justify-content: center;
        z-index: 1;
        width: 70%;
        height: 100vh;
        background: #212121;
        .nav-item {
            text-decoration: none;
            font-family: 'Raleway', sans-serif;
            font-weight: 600;
            font-size: 40px;
            color: #FFFFFF;
            text-align: center;
            margin-top: 20px;
            @media only screen and (min-width: 768px) {
                font-size: 52px;
            }
        }
        @media only screen and (min-width: 1024px) {
            display: none !important;
        }
    }

    .menu.closed {
        opacity: 0;
        transition: opacity 0.3s ease;
        display: none;
    }

    .menu-overflow {
        display: none;
        position: absolute;
        background: #FFFFFF;
        opacity: 0;
        right: 0;
        top: 0;
        flex-direction: column;
        justify-content: center;
        z-index: 1;
        width: 30%;
        height: 100vh;
        @media only screen and (min-width: 1024px) {
            display: none !important;
        }
    }
</style>