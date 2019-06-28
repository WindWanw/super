<template>
    <el-table
            :data="tableData"
            style="width: 50%">
        <el-table-column
                prop="name"
                label="城市"
                width="180">
        </el-table-column>
        <el-table-column
                prop="address"
                label="商户数">
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    name: '南昌',
                    address: 100
                }, {
                    name: '山西',
                    address: 5
                }]
            }
        }
    }
</script>