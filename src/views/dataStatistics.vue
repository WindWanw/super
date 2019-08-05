<template>
  <div class="dataStatistics" v-if="total !=''">
    <!-- 总计 -->
    <div class="total_wrap">
      <div class="title">总计</div>
      <div class="total">
        <div class="item">
          <i class="iconfont yonghu3"></i>
          <div class="item_right">
            <p>总用户数</p>
            <p>
              {{total.userCount}}
              <span>个</span>
            </p>
          </div>
        </div>
        <div class="item">
          <i class="iconfont yonghu5"></i>
          <div class="item_right">
            <p>总专引师数</p>
            <p>
              {{total.guideCount}}({{total.vestGuide}})
              <span>个</span>
            </p>
          </div>
        </div>
        <div class="item" @click="toCitySupplier">
          <i class="iconfont dailishang"></i>
          <div class="item_right">
            <p>代理商数</p>
            <p>
              {{total.agentCount}}
              <span>个</span>
            </p>
          </div>
        </div>
        <div class="item">
          <i class="iconfont dianpu1"></i>
          <div class="item_right">
            <p>商家数</p>
            <p>
              {{total.supplierCount}}
              <span>个</span>
            </p>
          </div>
        </div>
        <div class="item">
          <i class="iconfont shouru2"></i>
          <div class="item_right">
            <p>总收入金额</p>
            <p>￥{{total.amount}}</p>
          </div>
        </div>

        <div class="item">
          <i class="iconfont qian"></i>
          <div class="item_right">
            <p>进账</p>
            <p>￥{{pallTotal}}</p>
          </div>
        </div>
      </div>
      <!-- <div>
        <div class="progress-box">
          <div class="time">
            <el-tag>昨天进账(￥{{ptotal.yestoday}})</el-tag>
            <div></div>
          </div>
          <div class="progress">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="percentDay"></el-progress>
          </div>
        </div>
        <div class="progress-box">
          <div class="time">
            <el-tag>上周进账(￥{{ptotal.lastWk}})</el-tag>
          </div>
          <div class="progress">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="percentWk"></el-progress>
          </div>
        </div>
      </div>-->
      <div style="margin-top: 20px;" id="title2" class="title">
        <div style="color:#F59E66;">
          优惠券送出总额:
          <b>￥{{total.cards.total}}</b>
        </div>
        <div class="countTable">
          <span>交易额统计</span>
          <el-select
            size="mini"
            style="width:100px;"
            @change="selectTable"
            v-model="value"
            placeholder="7天"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div id="count">
        <div class="progress-box">
          <div class="time">
            <el-tag type="success">已使用(￥{{total.cards.isPay}})</el-tag>
          </div>
          <div class="progress">
            <el-progress type="circle" :width="width" color="#67C23A" :percentage="percentPay"></el-progress>
          </div>
          <div class="time">
            <el-tag type="warning">未使用(￥{{total.cards.unUse}})</el-tag>
          </div>
          <div class="progress">
            <el-progress type="circle" :width="width" color="#F59E66" :percentage="percentUnUse"></el-progress>
          </div>
        </div>

        <div>
          <ve-line :data="chartData"></ve-line>
        </div>
      </div>
    </div>
    <!-- 消息 -->
    <!-- <div class="message_info">
      <div class="title">消息中心</div>
      <div class="info" v-for="(item,index) in messageList" :key="index">
        <div class="info_text">{{index+1}}.{{item.title}}</div>
        <div class="info_date">{{item.times | formatTimeStamp}}</div>
        <el-badge class="mark" :value="item.count"/>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: "", //总计
      messageList: [],
      ptotal: "",
      pallTotal: "",
      percentDay: 0,
      percentWk: 0,
      percentPay: 0,
      percentUnUse: 0,
      width: 200,
      chartData: {
        columns: ["name", "交易额"],
        rows: []
      },
      num: 7,
      options: [
        {
          value: "12",
          label: "12个月"
        },
        {
          value: "6",
          label: "6个月"
        },
        {
          value: "30",
          label: "30天"
        },
        {
          value: "7",
          label: "7天"
        }
      ],
      value: ""
    };
  },
  components: {},
  methods: {
    // 获取统计数据
    getTotal() {
      this.$api.getCount().then(res => {
        this.total = res.data;
        this.ptotal = res.data.pOrder;
        this.pallTotal = res.data.pOrder.total;
        this.percentDay = Number(res.data.pOrder.percentDay);
        this.percentWk = Number(res.data.pOrder.percentWk);
        this.percentPay = Number(res.data.cards.percentPay);
        this.percentUnUse = Number(res.data.cards.percentUnUse);
      });
    },
    //获取通知消息
    getMessageList() {
      this.$api.getMessageList().then(res => {
        if (!res.code) {
          this.$notify({
            title: "注意",
            message: res.data.message,
            iconClass: "iconfont ic_wait",
            onClick:this.toVestOrder(),
            onClose:this.toVestOrder(),
            duration: 0
          });
          this.$notify.close();
          this.toVestOrder()
        }
      });
    },

    toVestOrder() {
      console.log(12)
      // this.$router.push({ path: "/vestOrder" });
    },

    toCitySupplier() {
      this.$router.push({ path: "/citySupplier" });
    },
    countDatas() {
      this.$api.countDatas({ num: this.num }).then(res => {
        this.chartData.rows = res.data || [];
      });
    },
    selectTable(value) {
      this.$api.countDatas({ num: value }).then(res => {
        this.chartData.rows = res.data || [];
      });
    }
  },
  created() {
    this.getTotal();
    this.getMessageList();
    this.countDatas();
  }
};
</script>

<style scoped>
.total_wrap {
  width: 100%;
  background-color: #fff;
}
.total {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  flex-wrap: wrap;
  color: #fff;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
}
.item {
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  margin-bottom: 20px;
  margin-right: 20px;
}
.item_right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.item i {
  font-size: 28px;
}
.item p:nth-child(2) {
  font-size: 24px;
  /* font-weight: bold; */
}
.item p:nth-child(2) span {
  font-size: 14px;
  margin-left: 2px;
}
.total .item:nth-child(1) {
  background-color: #00adf3;
}
.total .item:nth-child(2) {
  background-color: #70c238;
}
.total .item:nth-child(3) {
  background-color: #ff9e66;
}
.total .item:nth-child(4) {
  background-color: #ffbf34;
}
.total .item:nth-child(5) {
  background-color: #00d0e2;
}
.total .item:nth-child(6) {
  background-color: #39cffb;
}
/* 消息 */
.message_info {
  background-color: #fff;
  margin-top: 20px;
}
.info {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  color: #666;
  font-size: 14px;
  position: relative;
}
.mark {
  position: absolute;
  right: 0;
  top: 2px;
}
.progress {
  margin: 40px;
}
.progress-box {
  display: flex;
  align-items: center;
  padding: 10px 10px;
}
.progress-box .time {
  width: 100px;
}
.countTable {
  display: flex;
  justify-content: space-between;
}
#title2 {
  display: flex;
}
#title2 > div {
  flex: 1;
}
#count {
  display: flex;
}
#count > div {
  flex: 1;
}

/* .box-card {
  width: 480px;
} */
</style>
