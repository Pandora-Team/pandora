<template>
    <div
        class="wrapper"
        :class="{ 'error': !!error }"
    >
        <div
            v-if="visibleNativeSelect"
            class="select-native"
        >
            <div
                v-if="label"
                class="label"
            >
                {{ label }}
            </div>
            <select
                class="select"
                @change="changeNative"
            >
                <option
                    v-for="item in items"
                    :key="item.id"
                    :value="item.id"
                    :selected="item.id === value"
                >
                    {{ item.value }}
                </option>
            </select>
        </div>
        <div
            v-else
            v-click-away="away"
            class="dropdown"
            :class="{'open': openList}"
        >
            <div
                v-if="label"
                class="label"
            >
                {{ label }}
            </div>
            <div
                class="dropdown-title"
                @click="changeVisibleList"
            >
                {{ activeItem.value }}
            </div>
            <div class="dropdown-list">
                <div
                    v-for="item in items"
                    :key="item.id"
                    class="dropdown-list__item"
                    :class="{ 'active': item.id === value }"
                    @click="changeActiveItem(item)"
                >
                    {{ item.value }}
                </div>
            </div>
        </div>
        <transition
            name="error-input"
            mode="out-in"
        >
            <div
                v-if="!!error"
                class="error-text"
            >
                {{ error }}
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { DropdownData } from "@/components/new/dropdown/dropdown"

@Component({
    components: {},
})
export default class BaseDropdown extends Vue {
    @Prop({ type: String })
    readonly value!: string

    @Prop({ type: Array })
    readonly items!: DropdownData[]

    @Prop({ type: String, default: "" })
    readonly label!: string

    @Prop({ type: String, default: "" })
    readonly error!: string

    openList = false


    get visibleNativeSelect() {
        return this.$mainStore.app.isMobile
    }

    get activeItem() {
        return this.items.find(item => item.id === this.value)
    }

    changeVisibleList() {
        this.openList = !this.openList
    }

    changeActiveItem(item: DropdownData) {
        this.changeVisibleList()
        this.$emit("input", item.id)
    }

    away() {
        if (!this.openList) return
        this.openList = false
    }

    changeNative(event: {target: HTMLSelectElement}) {
        this.$emit("input", event.target.value)
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;

    .label {
        color: #242424;
        margin-bottom: 8px;
    }

    .dropdown {
        margin-bottom: 20px;
        max-width: 350px;
        position: relative;

        &-title {
            padding: 16px 20px;
            color: #242424;
            border-radius: 16px;
            background: white;
            border: 1px solid #242424;
            transition: .5s;
            font-size: 16px;
            position: relative;

            &::after {
                content: "";
                position: absolute;
                right: 20px;
                top: 18px;
                width: 2px;
                height: 2px;
                border: solid #242424;
                border-width: 0 3px 3px 0;
                display: inline-block;
                padding: 3px;
                transition: 0.5s;
                transform-origin: center;
                transform: rotate(45deg);
            }
        }

        &-list {
            box-sizing: border-box;
            opacity: 0;
            position: absolute;
            z-index: -1;
            top: calc(24px + 52px + 8px);
            left: 0;
            width: 100%;
            padding: 16px 20px;
            border-radius: 16px;
            background: white;
            border: 1px solid #242424;
            transition: .5s;
            transition-property: opacity;
            max-height: 200px;
            overflow: auto;

            &__item {
                color:#242424;
                font-size: 16px;
                margin-bottom: 8px;
                cursor: pointer;
            }
        }

        &.open {
            .dropdown-title::after {
                transform: rotate(225deg);
            }
            .dropdown-list {
                opacity: 1;
                z-index: 999;
            }
        }
    }

    .select-native {
        position: relative;

        &::after {
            content: "";
            position: absolute;
            right: 20px;
            top: 42px;
            width: 2px;
            height: 2px;
            border: solid white;
            border-width: 0 3px 3px 0;
            display: inline-block;
            padding: 3px;
            transition: 0.5s;
            transform-origin: center;
            transform: rotate(45deg);
        }

        .select {
            appearance: none;
            width: 100%;
            height: 52px;
            font-size: 16px;
            border-radius: 16px;
            background: #242424;
            padding: 0 20px;
            margin-bottom: 20px;
            color: white;
            border: 1px solid #242424;

        }
    }
}
</style>
