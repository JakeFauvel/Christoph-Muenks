<template>
    <div @click="onSelectedClick" ref="dropdownContainer" class="dropdown-container">
        <div class="selected-language">
            <span ref="activeLangueSpan">{{ activeLanguage.toUpperCase() }}</span>
            <dropdown-icon :class="{'rotate': open}" ref="dropdownIcon"></dropdown-icon>
        </div>

        <div @click="alternativeSelected" class="alternative-language">
            <span>{{ alternateLanguage.toUpperCase() }}</span>
        </div>
    </div>
</template>
<script>
    import DropdownIcon from '~/components/nav/DropdownIcon.vue'
    export default {
        components: {
            DropdownIcon
        },

        data: function () {
            return {
                activeLanguage: 'en',
                alternateLanguage: 'de',
                open: false
            }
        },

        mounted() {
            this.setInitialActiveLang();
            this.setSecondary();
            window.addEventListener('langChanged', this.setLanguage);
        },

        methods: {
            onSelectedClick() {
                if (!this.open) {
                    this.$refs.dropdownContainer.style.overflow = 'initial';
                } else {
                    this.$refs.dropdownContainer.style.overflow = 'hidden';
                }

                this.open = !this.open;
            },

            setLanguage() {
                if (localStorage.getItem("language") !== null) {
                    this.activeLanguage = localStorage.getItem("language");
                }

                this.activeLanguage === 'en' ? this.alternateLanguage = 'de' : this.alternateLanguage = 'en';
            },

            alternativeSelected() {
                this.onSelectedClick;
                let previousActive = this.activeLanguage;
                this.activeLanguage = this.alternateLanguage;
                this.alternateLanguage = previousActive;
                localStorage.setItem('language', this.activeLanguage);

                // Dispatch a custom event to listen for
                // the language change accross the site
                let event = new CustomEvent("langChanged", {});
                dispatchEvent(event);
            },

            setInitialActiveLang() {
                if (localStorage.getItem("language") !== null) {
                    this.activeLanguage = localStorage.getItem("language");
                } else {
                    localStorage.setItem('language', this.activeLanguage);
                }
            },

            setSecondary() {
                if (this.activeLanguage === 'en') {
                    this.alternateLanguage = 'de';
                } else if (this.activeLanguage === 'de') {
                    this.alternateLanguage = 'en';
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import './styles/switcher';
</style>