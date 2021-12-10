<template>
    <div
        v-if="students.length"
        class="students-list"
    >
        <list-students-row
            v-for="(user, index) in students"
            :key="`${user.surname}${index}`"
            :user="user"
            :index="index"
        />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import { getStudents } from "@/api/users"
import ListStudentsRow from "@/components/ListStudentsRow.vue"

@Component({
    components: {
        ListStudentsRow,
    },
})
export default class ListStudentsView extends Vue {

    students = []

    async mounted(): Promise<void> {
        try {
            const { data } = await getStudents()
            this.students = data
        } catch (e) {
            this.$mainStore.notification.changeNotification(true, this.$mainNotification.error)
            throw new Error(`Get list students - ${e}`)
        }
    }
}
</script>

<style lang="scss">
    .students-list {
        background: $bg-info;
        border-radius: 30px;
        padding: 30px 40px;
        color: $color-black;
    }
</style>