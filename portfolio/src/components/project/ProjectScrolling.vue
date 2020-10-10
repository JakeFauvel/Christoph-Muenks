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

            <div ref="imageContainer" id="imageContainer" class="imageContainer">
                <img v-for="image in project['additionalImages']" :src="image"  alt="">
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
    import ImagesLoaded from 'imagesloaded';

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
                imageOrientationsArray: [],
            }
        },

        mounted() {
            this.checkSelected();
            ImagesLoaded(this.$refs.imageContainer, this.checkImageOrientations);
            // this.setLanguage();
        },

        methods: {
            setLanguage() {
                if (localStorage.getItem("language") !== null) {
                    this.activeLanguage = localStorage.getItem("language");
                }
            },

            checkImageOrientations() {
                document.getElementById('imageContainer').children.forEach(function(image) {
                    if (image.naturalHeight > image.naturalWidth) {
                        image.style.maxWidth = '65%';
                    }
                });
            },

            overlayClose() {
                // Dispatch a custom event to listen for
                // the language change accross the site
                let event = new CustomEvent("overlayClosed", {});
                dispatchEvent(event);
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
                    this.checkSelected();
                }
            },

            rightArrowClick() {
                if (!this.rightArrowDisabled) {
                    this.index = parseInt(this.index) + 1;
                    if (this.projectsLang[this.activeLanguage][this.index]) this.project = this.projectsLang[this.activeLanguage][this.index];
                    this.checkSelected();
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles/project';
</style>
