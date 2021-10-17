<template>
    <div
        class="main-status"
        :style="inlineStyle"
    >
        {{ type.title }}
    </div>
</template>

<script lang="ts">

interface Position {
    left: string
    top: string
}

import { Component, Vue, Prop } from "vue-property-decorator"
import { typeStatus } from "@/constants/typeStatus"
@Component({})
export default class MainStatus extends Vue {

    @Prop({ type: Object, default: {} })
    type!: typeStatus

    @Prop({ type: Object, default: {} })
    position!: Position

    get inlineStyle(): string {
        return {
            background: this.type.background,
            left:       this.position.left,
            top:        this.position.top,
        }
    }

}
</script>

<style lang="scss">
   .main-status {
       font-size: 16px;
       padding: 10px;
       color: white;
       line-height: 20px;
       position: absolute;
       top: 0;
       left: 0;
       border-radius: 20px;
   }
</style>