<template>
  <div class="finance">
    <div class="table_title">
      <div class="search_wrap">
        <el-select style="margin:0 10px" v-model="status" size="small" filterable placeholder="类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          clearable
          v-model="name"
          placeholder="请输入持卡人姓名"
          size="small"
          style="width:200px;margin:0 10px"
        ></el-input>
        <el-button type="primary" size="small" @click="search" icon="el-icon-search">搜索</el-button>
      </div>
    </div>

    <div class="content">
      <el-table :data="dataList.list" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="UID">
                <span>{{ props.row.uid }}</span>
              </el-form-item>
              <el-form-item label="提现金额">
                <span>{{ props.row.amount }}</span>
              </el-form-item>
              <el-form-item label="持卡人">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="银行">
                <span>{{ props.row.bank }}</span>
              </el-form-item>
              <el-form-item label="银行卡号">
                <span>{{ props.row.bank_account }}</span>
              </el-form-item>
              <el-form-item label="申请时间">
                <span>{{ props.row.create_times }}</span>
              </el-form-item>
              <el-form-item label="反馈信息">
                <span>{{ props.row.info }}</span>
              </el-form-item>
              <el-form-item label="审核人">
                <span>{{ props.row.checker }}</span>
              </el-form-item>
              <el-form-item label="付款人">
                <span>{{ props.row.payer }}</span>
              </el-form-item>
              <el-form-item label="个人所得税">
                <span>{{ props.row.tax }}</span>
              </el-form-item>
              <el-form-item label="实际打款">
                <span>{{ props.row.pay_amount }}</span>
              </el-form-item>
              <el-form-item label="审核时间">
                <span>{{ props.row.check_times }}</span>
              </el-form-item>
              <el-form-item label="付款时间">
                <span>{{ props.row.pay_times }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="持卡人姓名" prop="name"></el-table-column>
        <el-table-column label="提现金额" prop="amount"></el-table-column>
        <el-table-column label="银行" prop="bank"></el-table-column>
        <el-table-column label="申请时间" prop="create_times"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-button
              :type="scope.row.status | withdrawStatus"
              size="mini"
            >{{scope.row.status | withdrawText}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="status">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="centerDialogVisible=true;id=scope.row.id"
              v-if="scope.row.status == 0"
              size="mini"
            >审核通过</el-button>
            <el-button
              type="danger"
              v-if="scope.row.status == 0"  
              @click="centerDialogVisible2=true;id=scope.row.id"
              size="mini"
            >驳回申请</el-button>
            <el-button
              type="success"
              v-if="scope.row.status == 1"
              @click="centerDialogVisible3=true;id=scope.row.id"
              size="mini"
            >确认打款</el-button>
            <el-button type="danger" v-if="scope.row.status == 1" size="mini">打款失败</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataList.total"
      ></el-pagination>
    </div>
    <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
      <el-input v-model="tax" placeholder="个人所得税"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="passWithdraw">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="centerDialogVisible2" width="30%" center>
      <el-input type="textarea" v-model="info" placeholder="反馈信息"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="blowWithdraw">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="centerDialogVisible3" width="30%" center>
      <el-input v-model="pay_amount" placeholder="打款金额"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="payWithdraw">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: 0,
          label: "待审核"
        },
        {
          value: 1,
          label: "已审核"
        },
        {
          value: 2,
          label: "已打款"
        },
        {
          value: 3,
          label: "未通过审核"
        },
        {
          value: 4,
          label: "打款失败"
        }
      ],
      loading: false,
      dataList: [],
      page: 1,
      limit: 10,
      status: 0,
      name: "",
      tax: "",
      info: "",
      pay_amount:"",
      centerDialogVisible: false,
      centerDialogVisible2: false,
      centerDialogVisible3: false
    };
  },
  watch: {},
  components: {},
  methods: {
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api
        .getWithdrawList({
          page: this.page,
          LIMIT: this.limit,
          status: this.status,
          name: this.name
        })
        .then(res => {
          this.dataList = res.data || [];
          this.loading = false;
        });
    },
    //分页
    handleSizeChange(val) {
      this.page = val;
      this.getDataList();
    },
    //分条
    handleCurrentChange(val) {
      this.limit = val;
      this.getDataList();
    },
    //搜索
    search() {
      this.page = 1;
      this.getDataList();
    },
    //通过审核
    passWithdraw() {
      this.centerDialogVisible = false;
      this.$api
        .passWithdraw({
          id: this.id,
          tax: this.tax
        })
        .then(res => {
          this.$message[res.code ? "warning" : "success"](res.data);
          this.getDataList();
        });
    },
    blowWithdraw() {
      this.centerDialogVisible2 = false;
      this.$api
        .blowWithdraw({
          id: this.id,
          info: this.info
        })
        .then(res => {
          this.$message[res.code ? "warning" : "success"](res.data);
          this.getDataList();
        });
    },
    payWithdraw() {
      this.centerDialogVisible3 = false;
      this.$api
        .payWithdraw({
          id: this.id,
          pay_amount: this.pay_amount
        })
        .then(res => {
          this.$message[res.code ? "warning" : "success"](res.data);
          this.getDataList();
        });
    },
    unquaWithdraw() {
      this.centerDialogVisible = false;
      this.$api
        .unquaWithdraw({
          id: this.id,
          info: this.info
        })
        .then(res => {
          this.$message[res.code ? "warning" : "success"](res.data);
          this.getDataList();
        });
    }
  },
  created() {
    this.getDataList();
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}
</style>
