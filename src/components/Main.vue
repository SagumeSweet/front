<template>
    <div class="main-container">
        <Header />
        <Content />
        <Footer />
    </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';
import Content from './Content.vue';

export default {
    components: {
        Header,
        Footer,
        Content,
    },
};
</script>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%; /* 确保宽度为100% */
}
</style>
