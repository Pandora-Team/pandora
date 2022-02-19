<template>
    <div class="students">
        <h1>Участники PANDORA</h1>
        <div class="students-nav">
            <btn-status
                type="link"
                :path="paths.ListEventsView"
                :status="typesStatus.linkEvents"
            />
            <btn-status
                type="link"
                :path="paths.ListStudentsView"
                :status="typesStatus.linkStudents"
            />
        </div>
        <div class="students-body">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import BtnStatus from "@/components/BtnStatus.vue"
import paths from "@/router/paths"
import { typesStatus } from "@/definitions/typeStatus"

@Component({
    components: {
        BtnStatus,
    },
})
export default class StudentsView extends Vue {
    paths = paths
    typesStatus = typesStatus
}
</script>

<style lang="scss">
    .students {
        @media all and (max-width: 800px) {
            margin-top: 90px;
        }
        h1 {
            margin-bottom: 30px;
            color: $color-black;
        }
        &-nav {
            margin-bottom: 30px;
        }
    }
</style>