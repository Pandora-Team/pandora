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
        position: relative;
        overflow: hidden;
        outline: none;
        &::before {
            transition: top .5s;
            content: "";
            width: 10px;
            height: 100%;
            background: #AD00FF;
            position: absolute;
            top: -100%;
            left: 0;
            border-radius: 0 20px 20px 0;
        }
        a {
            font-size: 18px;
            line-height: 22px;
            color: #FFFFFF;
            text-decoration: none;
        }
        &--active {
            &::before {
                top: 0;
            }
        }
    }
</style>