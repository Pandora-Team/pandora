<template>
    <div
        class="nav-link"
        :class="{'nav-link--active': active}"
    >
        <div class="nav-link__wrapper">
            <simple-svg
                :src="iconPath"
                width="35"
                height="35"
                custom-class-name="nav-link__icon"
            />
            <router-link :to="path">
                {{ name }}
            </router-link>
        </div>
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

    @Prop({ type: String, default: "" })
    icon!: string

    active = false
    fillColor = "#FFFFFF"

    @Watch("$route.path", { immediate: true, deep: true })
    changeActive(route: string): void {
        this.active = route === this.path
        this.active ? this.fillColor = "#8A54F2" : this.fillColor = "#FFFFFF"
    }

    get iconPath(): string {
        if(!this.icon) return ""
        return require(`@/assets/svg/${this.icon}-link.svg`)
    }

}
</script>

<style lang="scss">
    .nav-link {
        min-height: 82px;
        display: flex;
        align-items: center;
        position: relative;
        outline: none;
        &::before {
            transition: left .5s;
            content: "";
            width: 10px;
            height: 100px;
            background: $color-hover;
            position: absolute;
            top: -7px;
            left: -10px;
            border-radius: 0 20px 20px 0;
        }
        &__wrapper {
          transition: .5s;
          padding-left: 40px;
          height: 82px;
          display: flex;
          align-items: center;
          width: 100%;
        }
        &__icon {
          margin-right: 20px;
          path {
            transition: .5s;
            fill: $color-white;
          }
        }
        &--active {
            &::before {
                left: 0;
            }
            .nav-link__wrapper {
              background: $gradient-active-link;
            }
          .nav-link__icon {
            path {
              fill: $color-hover-text;
            }
          }
            a {
              color: $color-hover-text;
            }
        }
    }
</style>