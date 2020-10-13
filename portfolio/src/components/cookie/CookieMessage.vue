<template>
    <div class="cookieContainer">
        <span class="cookieMessage">{{ cookieMessage }}</span>
        <button @click="cookiesAccepted" class="cookieAccept">OK</button>
    </div>
</template>

<script>
    export default {
        props: ['cookieMessage'],

        methods: {
            cookiesAccepted() {
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