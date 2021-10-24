<template>
    <div class="lk">
        <div class="lk-aside">
            <lk-logo />
            <lk-nav />
        </div>
        <lk-body />
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"
import LkLogo from "@/components/LkLogo.vue"
import LkBody from "@/components/LkBody.vue"
import LkNav from "@/components/LkNav.vue"
import { getUserInfo } from "@/api/auth"

@Component({
    components: {
        LkLogo,
        LkBody,
        LkNav,
    },
})
export default class LkLayout extends Vue {

    @Watch("$mainStore.user.name", { immediate: true })
    async updateUserInfo(): Promise<void> {
        if(!this.$mainStore.user.name) {
            try {
                const res = await getUserInfo()
                const { name, role, id } = res.data
                this.$mainStore.user.updateUserInfo({ name, role, id })
            } catch (e) {
                console.log(e)
                await this.$router.push({ path: this.$mainPaths.LoginLayout })
            }
        }
    }

}
</script>

<style lang="scss">
    .lk {
        display: flex;
        min-height: 100vh;
        background-color: #242424;
        background-image: url("../assets/svg/lk-line.svg");
        background-repeat: no-repeat;
        background-position: left bottom;
        background-size: 280px 234px;
        &-aside {
            min-width: 260px;
        }
    }
</style>