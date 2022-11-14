<template>
    <div class="root">
        <router-view/>
    </div>
</template>
<script>
export default {
    name: 'App',
    created () {
        document.styleSheets[0].insertRule(`:root{ --screen-width: ${window.innerWidth}px; --screen-height: ${window.innerHeight}px;`)
    },
    watch: {
        $route (to, from) {
            console.log(`[$route -> from]${from.path}\n[$route -> to  ]${to.path}`)
            this.$data.currentRoute = from
            console.log(from)
            this.$set(this.$data, 'currentRoute', to)
        }
    }
}
</script>
