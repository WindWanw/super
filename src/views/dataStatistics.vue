<template>
   <div class='dataStatistics' >
      <!-- 总计 -->
      <div class="total_wrap">
         <div class="title">
            总计
         </div>
         <div class="total">
            <div class="item">
               <i class="iconfont zongdingdanshu"></i>
               <div class="item_right">
                  <p>总用户数</p>
                  <p>{{total.userCount}}<span>个</span></p>
               </div>
            </div>
            <div class="item">
               <i class="iconfont zongdingdanshu"></i>
               <div class="item_right">
                  <p>总专引师数</p>
                  <p>{{total.guideCount}}<span>个</span></p>
               </div>
            </div>
            <div class="item">
               <i class="iconfont zongdingdanshu"></i>
               <div class="item_right">
                  <p>代理商数</p>
                  <p>{{total.agentCount}}<span>个</span></p>
               </div>
            </div>
            <div class="item">
               <i class="iconfont zongdingdanshu"></i>
               <div class="item_right">
                  <p>商家数</p>
                  <p>{{total.supplierCount}}<span>个</span></p>
               </div>
            </div>
            <div class="item">
               <i class="iconfont zongdingdanshu"></i>
               <div class="item_right">
                  <p>总金额</p>
                  <p>￥{{total.amount}}</p>
               </div>
            </div>
         </div>
      </div>
      <!-- 消息 -->
      <div class="message_info">
         <div class="title">消息中心</div>
         <div class="info" v-for="(item,index) in messageList" :key="index">
            <div class="info_text">{{index+1}}.{{item.title}}</div>
            <div class="info_date">{{item.times | formatTimeStamp}}</div>
            <el-badge class="mark" :value="item.count"/>
         </div>
      </div>
      
   </div>
</template>

<script>
   export default {
     data () {
       return {
          total:{},//总计
          messageList:[]
      }
   },
   components: {

   },
   methods:{
      // 获取统计数据
      getTotal(){
         this.$api.getCount()
         .then(res=>{
            this.total=res.data;
         })
      },
      //获取通知消息
      getMessageList(){
         this.$api.getMessageList({
            data:[1,2,3]
         })
         .then(res=>{
            this.messageList=res.data;
         })
      }
   },
   created(){
      this.getTotal();
      this.getMessageList();
   }
      
   }
</script>

<style scoped>
.total_wrap{
   width: 100%;
   background-color: #fff;
}
.total{
   display: flex;
   /* justify-content: space-between; */
   align-items: center;
   flex-wrap: wrap;
   color: #fff;
   padding: 20px 20px 0 20px;
   box-sizing: border-box;
}
.item{
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
.item_right{
   display: flex;
   flex-direction: column;
   align-items: flex-end;
}
.item i{
   font-size: 28px;
}
.item p:nth-child(2){
   font-size: 24px;
   /* font-weight: bold; */
}
.item p:nth-child(2) span{
   font-size: 14px;
   margin-left: 2px;
}
.total .item:nth-child(1){
   background-color: #00Adf3;
}
.total .item:nth-child(2){
   background-color: #70C238;
}
.total .item:nth-child(3){
   background-color: #FF9E66;
}
.total .item:nth-child(4){
   background-color: #FFBF34;
}
.total .item:nth-child(5){
   background-color: #00D0E2;
}
.total .item:nth-child(6){
   background-color: #39CFFB;
}
/* 消息 */
.message_info{
   background-color: #fff;
   margin-top: 20px;
}
.info{
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
.mark{
   position: absolute;
   right: 0;
   top: -10px;
}
</style>
