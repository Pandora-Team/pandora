<template>
    <div
        id="app"
        class="app"
    >
        <router-view />
    </div>
</template>

<script lang="ts">

import {Component, Vue, Watch} from "vue-property-decorator"

@Component({})
export default class App extends Vue {
    @Watch("$mainStore.app.disable")
    changeDisable() {
        if (this.$mainStore.app.disable) {
            document.querySelector("body").style.overflow = "hidden"
        } else {
            document.querySelector("body").style.overflow = "auto"
        }
    }
}
</script>

<style lang="scss">
    .app {

    }
</style>

