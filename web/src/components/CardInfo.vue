<template>
    <div class="card-info">
        <slot />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({
    components: {},
})
export default class CardInfo extends Vue {

}
</script>

<style lang="scss">
    .card-info {
        background: #F6F6FC;
        border-radius: 30px;
        padding: 30px;
        width: fit-content;
        p {
            font-size: 16px;
            line-height: 20px;
            color: #000000;
            margin-bottom: 16px;
        }
        ul {
            li {
                padding-left: 20px;
                position: relative;
                font-size: 16px;
                line-height: 20px;
                color: #000000;
                margin-bottom: 6px;
                &::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 5px;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #AD00FF;
                }
                &:nth-last-of-type(1) {
                    margin-bottom: 0;
                }
            }
        }
    }
</style>