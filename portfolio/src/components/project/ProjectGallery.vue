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

        <div class="content">
            <div class="textTitle">
                <h2 class="projectHeader">{{ project.title }}</h2>
            </div>

            <div ref="royalSliderElement" id="full-width-slider" class="royalSlider heroSlider rsMinW">
                <!-- Gallery images appended dynamically based on project index -->
            </div>

            <div class="textDescription">
                <p class="projectInfo">{{ project['long-description'] }}</p>
            </div>
        </div>
    </div>
</template>

<script>
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
                jQuery: null,
                projectsLang: ProjectsLang,
                activeLanguage: 'de',
                project: this.projectInfo,
                parentPageName: this.page,
                index: this.projectIndex,
                availableGalleryHeight: 0,
                leftArrowDisabled: false,
                rightArrowDisabled: false,
            }
        },

        mounted() {
            // Only load Velocity if process is on the client side
            if (process.isClient) {
                require('../../assets/js/royalslider/jquery-1.8.3.min');
                require('../../assets/js/royalslider/jquery.royalslider.min');
            }

            this.checkSelected();
            // this.setLanguage();
            this.initialiseRoyalSlider();
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
                let slides = this.assembleSlides();
                let slideString = '';
                slides.forEach(function(slide) {
                    slideString = slideString + slide.outerHTML;
                });

                jQuery('.royalSlider').royalSlider('destroy').empty().royalSlider({
                    slides: slideString,
                    autoScaleSlider: true,
                    arrowsNav: true,
                    keyboardNavEnabled: true,
                    imageScaleMode: 'fit',
                    arrowsNavAutoHide: false,
                    controlNavigation: 'none',
                    thumbsFitInViewport: false,
                    navigateByClick: true,
                    startSlideId: 0,
                    autoPlay: false,
                    transitionType: 'move'
                });
            },

            assembleSlides() {
                let slides = [];

                this.project['additionalImages'].forEach(function (image) {
                    let rsContent = document.createElement('div');
                    rsContent.classList.add('rsContent');

                    let rsImage = document.createElement('img');
                    rsImage.src = image;
                    rsImage.id = image;
                    rsImage.classList.add('rsImage');
                    rsImage.alt = '';
                    rsImage.style.height = '100%';

                    rsContent.appendChild(rsImage);
                    slides.push(rsContent);
                });

                return slides;
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
                    this.index = parseInt(this.index) - 1;
                    if (this.projectsLang[this.activeLanguage][this.index]) this.project = this.projectsLang[this.activeLanguage][this.index];
                    this.initialiseRoyalSlider();
                    this.checkSelected();
                }
            },

            rightArrowClick() {
                if (!this.rightArrowDisabled) {
                    this.index = parseInt(this.index) + 1;
                    if (this.projectsLang[this.activeLanguage][this.index]) this.project = this.projectsLang[this.activeLanguage][this.index];
                    this.initialiseRoyalSlider();
                    this.checkSelected();
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/js/royalslider/royalslider.css';
    @import '../../assets/js/royalslider/skins/minimal-white/rs-minimal-white.css';
    @import './styles/project';
</style>
