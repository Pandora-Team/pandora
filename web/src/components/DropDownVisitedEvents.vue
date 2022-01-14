<template>
    <div
        :class="classes"
        @click="active = !active"
    >
        <div class="list-students-row__visited-title">
            Список посещенных МК
        </div>
        <transition-fade>
            <div
                v-if="active && list.length"
                class="list-students-row__visited-list"
            >
                <div
                    v-for="item in list"
                    :key="item._id"
                >
                    {{ item.name }}
                </div>
            </div>
        </transition-fade>
        <transition-fade>
            <div
                v-if="active && !list.length"
                class="list-students-row__visited-list"
            >
                <div>
                    Нет посещенных мероприятий
                </div>
            </div>
        </transition-fade>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"
import { styleClass, UserVisitedEventsData } from "@/definitions/interfaces"
import TransitionFade from "@/components/transition/TransitionFade.vue"

@Component({
    components: {
        TransitionFade,
    },
})
export default class DropDownVisitedEvents extends Vue {

    @Prop({ type: Array, default: [] })
    list!: UserVisitedEventsData[]

    active = false

    get classes(): styleClass {
        return [
            "list-students-row__item",
            "list-students-row__visited",
            { "list-students-row__visited--active": this.active },
        ]
    }

}
</script>

<style lang="scss">
.list-students-row__visited {
    cursor: pointer;
    position: relative;
    &-title {
        display: inline-block;
        position: relative;
        white-space: nowrap;
        line-height: 22px;
        &::after {
            transition: .5s;
            transform-origin: center;
            content: "";
            position: absolute;
            right: -20px;
            top: 7px;
            border-style: solid;
            border-width: 5.41px 5px 0 5px;
            border-color: $color-black transparent transparent transparent;
        }
    }

    &-list {
        position: absolute;
        z-index: 2;
        top: 30px;
        right: 0;
        width: calc(100% - 70px);
        padding: 20px 40px 20px 30px;
        box-shadow: 0 5px 16px rgba(36, 36, 36, 0.25);
        background: $color-white;
        border-radius: 10px;
        max-height: 200px;
        overflow-y: auto;
        & > div {
            line-height: 22px;
            margin-bottom: 15px;
            &:nth-last-of-type(1) {
                margin-bottom: 0;
            }
        }
    }

    &--active {
        .list-students-row__visited-title {
            &::after {
                transform: rotate(180deg);
            }
        }
    }
}
</style>