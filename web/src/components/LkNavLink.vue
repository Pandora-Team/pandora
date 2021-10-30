<template>
    <transition name="link">
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
    </transition>
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
        min-height: 76px;
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
            top: -12px;
            left: -10px;
            border-radius: 0 20px 20px 0;
        }
        &::after {
          content: "";
          transition: background-position 1s;
          position: absolute;
          top: -3px;
          left: 0;
          height: 82px;
          width: 100%;
          z-index: 0;
          opacity: 0.2;
          background: $gradient-active-link;
          background-size: 500% 100%;
          background-position: -130% 0;
        }
        &__wrapper {
          transition: .5s;
          padding-left: 40px;
          height: 36px;
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 3;
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
            &::after {
                background-position: -50% 0;
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