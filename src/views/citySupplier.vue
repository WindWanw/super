<template>
    <el-table

            style="width: 50%" :data="tableData">
        <el-table-column
                prop=city
                label="城市"
                width="180">
        </el-table-column>
        <el-table-column
                prop=num
                label="商户数量"
                width="180">
        </el-table-column>
        <el-table-column
            prop=types1
            label="线上商户"
            width="180">
    </el-table-column>
        <el-table-column
                prop=types2
                label="线下商户"
                width="180">
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            getData() {
                this.$api.citySupplier().then(res => {
                    this.tableData = res.data;
                    console.log(res.data);
                });
            }
        },

        created() {
            this.getData();
        }
    }
</script>