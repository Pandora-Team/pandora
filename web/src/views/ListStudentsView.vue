<template>
    <div
        v-if="students.length"
        class="students-list"
    >
        <div
            class="students-list__sorting"
            @click="sorting"
        />
        <list-students-row
            v-for="(user, index) in students"
            :key="`${user.surname}_${user.id}_${index}`"
            :user="user"
        />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import { getStudents } from "@/api/users"
import ListStudentsRow from "@/components/ListStudentsRow.vue"
import { UserData } from "@/definitions/interfaces"
import { DateTime } from "luxon"

@Component({
    components: {
        ListStudentsRow,
    },
})
export default class ListStudentsView extends Vue {

    students: UserData[] = []

    needSorting = false

    async mounted(): Promise<void> {
        try {
            const { data } = await getStudents()
            this.students = data.map((student: UserData, index: number) => {
                student.id = index + 1
                return student
            })
        } catch (e) {
            this.$mainStore.notification.changeNotification({ state: true, ...this.$mainNotification.error })
            throw new Error(`Get list students - ${e}`)
        }
    }

    sortByReg(a: UserData, b: UserData): number {
        const first = DateTime.fromISO(a.reg_date.toString())
        const second = DateTime.fromISO(b.reg_date.toString())
        if (this.needSorting) {
            if (first < second) return 1
            if (first > second) return -1
            return 0
        }
        if (first < second) return -1
        if (first > second) return 1
        return 0
    }

    sorting(): void {
        this.needSorting = !this.needSorting
        this.students.sort(this.sortByReg)
    }
}
</script>

<style lang="scss">
    .students-list {
        background: $bg-info;
        border-radius: 30px;
        padding: 30px 40px;
        color: $color-black;
        position: relative;
        @media all and (max-width: 500px) {
            padding: 20px;
        }
        &__sorting {
            cursor: pointer;
            width: 30px;
            height: 30px;
            position: absolute;
            top: -65px;
            right: 0;
            background: url("../assets/sort.png");
            background-size: 30px;
        }
    }
</style>