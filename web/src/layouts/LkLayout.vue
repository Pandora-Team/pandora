<template>
    <div class="lk">
        <div
            v-if="!isMobile"
            class="lk-aside"
        >
            <lk-logo />
            <lk-nav />
        </div>
        <div
            class="lk-body"
            :class="inlineClass"
        >
            <lk-header v-if="!isMobile" />
            <lk-body :mobile="isMobile" />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkLogo from "@/components/LkLogo.vue"
import LkBody from "@/components/LkBody.vue"
import LkNav from "@/components/LkNav.vue"
import LkHeader from "@/components/LkHeader.vue"
import { getUserId } from "@/api/auth"

@Component({
    components: {
        LkLogo,
        LkBody,
        LkNav,
        LkHeader,
    },
})
export default class LkLayout extends Vue {

    async mounted(): Promise<void> {
        await this.$mainStore.events.getListEvents()
        if (!this.$mainStore.user.id) {
            const { data: { id } } = await getUserId()
            this.$mainStore.user.setUserId(id)
        }
        await this.$mainStore.user.getUserInfo()
    }

    get isMobile(): boolean {
        return this.$mainStore.app.isMobile
    }

    get inlineClass(): {[key: string]: boolean} {
        return {
            "lk-body--scroll": !this.isMobile && this.needScroll,
        }
    }

    get needScroll(): boolean {
        return this.$mainStore.app.needScrollIntoBody
    }
}
</script>

<style lang="scss">
.lk {
    display: flex;
    min-height: 100vh;
    background-color: $color-black;
    background-image: url("../assets/bg/lk-line.png");
    background-repeat: no-repeat;
    background-position: left bottom;
    background-size: 265px 193px;
    @media all and (max-width: 800px) {
        background-color: $color-white;
    }

    &-aside {
        min-width: 300px;
    }

    &-body {
        width: calc(100% - 300px);
        margin: 40px 40px 40px 0;
        background: $color-white;
        border-radius: 40px;
        position: relative;

        &--scroll {
            .lk-body__wrapper {
                max-height: 717px;
                overflow-y: scroll;
                scrollbar-width: none;
                &::-webkit-scrollbar {
                    width: 0;
                    height: 0;
                }
                @media all and (max-width: 500px) {
                    max-height: 100vh;
                }
            }
        }

    }
}

@media all and (max-width: 1366px) {
    .lk {
        background-image: none;

        &-body {
            margin: 10px 10px 10px 0;
            border-radius: 0 0 40px 40px;
            width: calc(100% - 200px);
        }

        &-aside {
            min-width: 200px;
        }
    }
}

@media all and (max-width: 1000px) {
    .lk {
        &-body {
            width: calc(100% - 84px);
            &__wrapper {
                padding: 20px 30px;
            }
        }

        &-aside {
            min-width: 84px;
        }
    }
}

@media all and (max-width: 800px) {
    .lk {
        padding: 20px;

        &-body {
            margin: 0;
            width: 100%;
            &__wrapper {
                padding: 0;
            }
        }
    }
}
</style>