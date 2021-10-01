<template>
    <div
        class="nav-link"
        :class="{'nav-link--active': active}"
    >
        <router-link :to="path">
            {{ name }}
        </router-link>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue, Watch } from "vue-property-decorator"

@Component({})
export default class LkNavLink extends Vue {

    @Prop({ type: String, default: "" })
    path!: string

    @Prop({ type: String, default: "" })
    name!: string

    active = false

    @Watch("$route.path", { immediate: true, deep: true })
    changeActive(route: string): void {
        this.active = route === this.path
    }

}
</script>

<style lang="scss">
    .nav-link {
        min-height: 100px;
        display: flex;
        align-items: center;
        padding-left: 30px;
        a {
            font-size: 18px;
            line-height: 22px;
            color: #FFFFFF;
            text-decoration: none;
        }
        &--active {
            border-left: 10px solid #AD00FF;
            border-radius: 0 20px 20px 0;
        }
    }
</style>