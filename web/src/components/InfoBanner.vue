<template>
    <div class="info-banner">
        <div class="info-banner__text">
            <h1>Привет, {{ name }}!</h1>
            <p>
                Добро пожаловать в PANDORA! Здесь ты можешь записаться на&nbsp;занятия,
                узнать о будущих и прошедших событиях.
            </p>
            <p>Будь в курсе k-pop движухи в Туле.</p>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"

@Component({
    components: {},
})
export default class InfoBanner extends Vue {

    name = ""

    @Watch("$mainStore.user.name", { immediate: true })
    updateName(): void {
        this.name = this.$mainStore.user.name
    }

}
</script>

<style lang="scss">
    .info-banner {
        background-size: cover;
        background: url("../assets/banner/banner1.jpg") no-repeat right;
        margin-bottom: 20px;
        border-radius: 30px;
        padding: 45px 80px;
        &__text {
            max-width: 660px;
            h1 {
                text-align: left;
                font-weight: 700;
                color: white;
                font-size: 30px;
                line-height: 37px;
                margin-bottom: 26px;
            }
            p {
                font-size: 18px;
                line-height: 22px;
                color: white;
                margin-bottom: 14px;
                &:nth-last-of-type(1) {
                    margin-bottom: 0;
                }
            }
        }
    }
</style>