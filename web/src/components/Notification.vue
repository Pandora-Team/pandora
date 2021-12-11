<template>
    <transition-from-right>
        <div
            v-if="visible"
            class="notification"
            :class="inlineClass"
        >
            {{ text }}
        </div>
    </transition-from-right>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"
import TransitionFromRight from "@/components/transition/TransitionFromRight.vue"

@Component({
    components: {
        TransitionFromRight,
    },
})
export default class Notification extends Vue {

    @Watch("$mainStore.notification.visible")
    closeNotification(): void {
        if (this.visible) {
            setTimeout(() => {
                this.$mainStore.notification.changeNotification({ state: false, text: "", type: "" })
            }, 2000)
        }
    }

    get visible(): boolean {
        return this.$mainStore.notification.visible
    }

    get text(): string {
        return this.$mainStore.notification.text
    }

    get type(): string {
        return this.$mainStore.notification.typeNotification
    }

    get inlineClass(): any {
        return {
            "notification--success": this.type === "success",
            "notification--failed":  this.type === "failed",
        }
    }
}
</script>

<style lang="scss">
    .notification {
        position: absolute;
        z-index: 100;
        bottom: 20px;
        right: 20px;
        border-radius: 20px;
        padding: 10px 20px;
        background: $color-gray;
        &--success {
            background: $color-green;
        }
        &--failed {
            background: $color-red;
        }
    }
</style>