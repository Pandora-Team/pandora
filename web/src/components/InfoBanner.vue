<template>
    <div class="info-banner">
        <div class="info-banner__text">
            <h1>Привет, Настя!</h1>
            <p>
                Добро пожаловать в PANDORA! Здесь ты можешь записаться на занятия,
                узнать о будущих и прошедших событиях.
            </p>
            <p>Будь в курсе k-pop движухи в Туле.</p>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({
    components: {},
})
export default class InfoBanner extends Vue {

}
</script>

<style lang="scss">
    .info-banner {
        background-size: cover;
        background: url("../assets/banner/banner1.jpg") no-repeat right;
        margin-bottom: 40px;
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