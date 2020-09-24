<template>
    <div class="projectOverlay">
        <div class="controls">
            <div class="left">
                <left-arrow class="arrow-icon"/>
            </div>
            <div @click="overlayClose" class="close">
                <close-icon class="close-icon"/>
            </div>
            <div class="right">
                <right-arrow class="arrow-icon"/>
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
    import LeftArrow from '~/components/icons/LeftArrow.vue';
    import RightArrow from '~/components/icons/RightArrow.vue';
    import CloseIcon from '~/components/icons/CloseIcon.vue';

    export default {
        props: ['projectInfo'],

        components: {
            LeftArrow,
            RightArrow,
            CloseIcon
        },

        data: function () {
            return {
                project: this.projectInfo,
                availableGalleryHeight: 0
            }
        },

        mounted() {
          this.initialiseRoyalSlider();
          window.addEventListener('resize', this.adjustSize);
        },

        methods: {
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
