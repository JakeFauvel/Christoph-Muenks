<template>
    <Layout>
        <div class="page-content products">
            <projects v-for="(productInfo, i) in productsLang[activeLanguage]"
                      :project="productInfo"
                      :key="productInfo.key"
                      v-on:click.native="toggleOverlay(productInfo, i)">
            </projects>

            <transition name="fade">
                <project v-if="overlayActive" :projectInfo="productInfo" :projectIndex="productIndex" page="products" class="productOverlay"></project>
            </transition>
        </div>
    </Layout>
</template>

<script>
    import ProductsLang from '~/lang/pages/products.json';
    import Projects from '~/components/project/Projects.vue';
    import Project from '~/components/project/ProjectScrolling.vue';

    export default {
        metaInfo: {
            title: 'Christoph Münks - Products'
        },

        components: {
            Projects,
            Project
        },

        mounted() {
            document.body.style.overflow = 'initial';
            // this.setLanguage();
            // window.addEventListener('langChanged', this.setLanguage);
            window.addEventListener('overlayClosed', this.toggleOverlay);

            let event = new CustomEvent("routeChanged", {});
            dispatchEvent(event);
        },

        data: function () {
            return {
                productsLang: ProductsLang,
                activeLanguage: 'de',
                langContentPath: 'de',
                overlayActive: false,
                productInfo: null,
                productIndex: null,
            }
        },

        methods: {
            setLanguage() {
                if (localStorage.getItem("language") !== null) {
                    this.activeLanguage = localStorage.getItem("language");
                }

                this.langContentPath = this.activeLanguage;
            },

            toggleOverlay(productInfo, index) {
                this.productInfo = productInfo;
                this.productIndex = index;

                if (this.overlayActive) {
                    document.body.style.overflow = 'initial';
                    this.overlayActive = false;
                } else {
                    document.body.style.overflow = 'hidden';
                    this.overlayActive = true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles/products';
</style>