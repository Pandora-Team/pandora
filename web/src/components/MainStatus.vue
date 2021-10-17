<template>
    <div class="main-status">

    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
@Component({})
export default class MainStatus extends Vue {

    @Prop({ type: String, default: "button" })
    type!: string

}
</script>

<style lang="scss">
   .main-status {

   }
</style>