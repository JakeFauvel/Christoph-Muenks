<template>
    <div class="cookieContainer">
        <span class="cookieMessage">{{ cookieMessage }}</span>
        <input @click="cookiesAccepted" class="cookieAccept" value="OK">
    </div>
</template>

<script>
    export default {
        props: ['cookieMessage'],

        methods: {
            cookiesAccepted() {
                console.log('cookiesAccepted!');
                localStorage.setItem('cookiesAccepted', 'true');

                let event = new CustomEvent("cookiesAccepted", {});
                dispatchEvent(event);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles/cookie';
</style>