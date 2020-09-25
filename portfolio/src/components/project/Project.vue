<template>
    <div class="projectOverlay">
        <div class="controls">
            <div @click="leftArrowClick" class="left">
                <left-arrow ref="leftArrow" class="arrow-icon"/>
            </div>
            <div @click="overlayClose" class="close">
                <close-icon class="close-icon"/>
            </div>
            <div @click="rightArrowClick" class="right">
                <right-arrow ref="rightArrow" class="arrow-icon"/>
            </div>
        </div>

        <div class="flex-container">
            <div class="content">
                <div class="text-info">
                    <h2 class="projectHeader">{{ project.title }}</h2>
                    <p class="projectInfo">{{ project['long-description'] }}</p>
                </div>

                <div ref="royalSliderElement" id="full-width-slider" class="royalSlider heroSlider rsMinW">
                    <div class="rsContent" v-for="image in project['additionalImages']">
                        <img class="rsImg" :src="image" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    require('../../assets/js/royalslider/jquery-1.8.3.min');
    require('../../assets/js/royalslider/jquery.royalslider.min');
    import ProjectsLang from '~/lang/projects/projects.json';
    import LeftArrow from '~/components/icons/LeftArrow.vue';
    import RightArrow from '~/components/icons/RightArrow.vue';
    import CloseIcon from '~/components/icons/CloseIcon.vue';

    export default {
        props: ['projectInfo', 'page', 'projectIndex'],

        components: {
            LeftArrow,
            RightArrow,
            CloseIcon
        },

        data: function () {
            return {
                projectsLang: ProjectsLang,
                activeLanguage: 'en',
                project: this.projectInfo,
                parentPageName: this.page,
                index: this.projectIndex,
                availableGalleryHeight: 0,
                leftArrowDisabled: false,
                rightArrowDisabled: false,
            }
        },

        mounted() {
            this.setLanguage();
            this.initialiseRoyalSlider();
            this.checkSelected();
            window.addEventListener('resize', this.adjustSize);
        },

        methods: {
            setLanguage() {
                if (localStorage.getItem("language") !== null) {
                    this.activeLanguage = localStorage.getItem("language");
                }
            },

            overlayClose() {
                // Dispatch a custom event to listen for
                // the language change accross the site
                let event = new CustomEvent("overlayClosed", {});
                dispatchEvent(event);
            },

            initialiseRoyalSlider() {
                this.adjustSize();
                jQuery(document).ready(function($) {
                    $('#full-width-slider').royalSlider({
                        arrowsNav: true,
                        keyboardNavEnabled: true,
                        controlsInside: true,
                        imageScaleMode: 'fit',
                        arrowsNavAutoHide: false,
                        controlNavigation: 'none',
                        thumbsFitInViewport: false,
                        navigateByClick: true,
                        startSlideId: 0,
                        autoPlay: false,
                        transitionType:'move',
                        fullscreen: {
                            enabled: true,
                            nativeFS: true
                        }
                    });
                });
            },

            checkSelected() {
                let parent = document.getElementsByClassName(this.parentPageName)[0];
                let currentIndex = parseInt(this.index);

                if (currentIndex === 1 && currentIndex !== parent.children.length - 1) {
                    this.disableArrow(this.$refs.leftArrow.$el);
                    this.leftArrowDisabled = true;

                } else if (currentIndex === 1 && currentIndex === parent.children.length - 1) {
                    this.disableArrow(this.$refs.leftArrow.$el);
                    this.leftArrowDisabled = true;
                    this.disableArrow(this.$refs.rightArrow.$el);
                    this.rightArrowDisabled = true;

                } else if (currentIndex > 1 && this.index < parent.children.length - 1) {
                    this.enableArrow(this.$refs.leftArrow.$el);
                    this.enableArrow(this.$refs.rightArrow.$el);
                    this.leftArrowDisabled = false;
                    this.rightArrowDisabled = false;
                } else if (currentIndex === parent.children.length - 1) {
                    this.disableArrow(this.$refs.rightArrow.$el);
                    this.leftArrowDisabled = false;
                    this.rightArrowDisabled = true;

                }
            },

            disableArrow(arrow) {
                arrow.classList.add('disabled');
                arrow.disabled = true;
            },

            enableArrow(arrow) {
                arrow.classList.remove('disabled');
                arrow.enabled = true;
            },

            leftArrowClick() {
                if (!this.leftArrowDisabled) {
                    console.log('leftArrowClick()');
                }
            },

            rightArrowClick() {
                if (!this.rightArrowDisabled) {
                    console.log('rightArrowClick()');
                }
            },


            adjustSize() {
                let sizeFactor = 0.3;
                if (document.body.offsetWidth > 768) sizeFactor = 0.6;
                this.availableGalleryHeight = document.body.offsetHeight * sizeFactor + 'px';
                this.$refs.royalSliderElement.style.height = this.availableGalleryHeight;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/js/royalslider/royalslider.css';
    @import '../../assets/js/royalslider/skins/minimal-white/rs-minimal-white.css';
    @import './styles/project';
</style>
