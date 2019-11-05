<template>
  <div class="order_user_form">
    <!-- 订单用户填写 -->
    <!-- 计算属性如果在本组件没有使用的话，他是不会触发的 -->
    <input type="hidden" name="" :vlaue='allPrice'>
    <!-- 乘机人填写 -->
    <div class="user">
      <h3>乘机人</h3>
      <div class="userItem" v-for="(item,index) in form.users"
        :key="index">
          <el-form
        label-position="top"
        label-width="80px"
        :model="item"
        
      >
        <el-form-item label="乘机人类型">
          <el-input placeholder="请输入内容" v-model="item.username" class="input-with-select">
            <el-select slot="prepend" placeholder="请选择" style="width:120px;" value="1">
              <el-option label="成人" value="1"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <div class="delUser" v-if='index>0' @click='form.users.splice(index,1)'>-</div>
        <el-form-item label="证件类型">
          <el-input placeholder="请输入内容" v-model="item.id" class="input-with-select">
            <el-select slot="prepend" placeholder="请选择" style="width:120px;" value="1">
              <el-option label="身份证" value="1"></el-option>
              <el-option label="护照" value="2"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-form>
      </div>
      <el-button type="primary" @click='form.users.push({username:"",id:""})'>添加乘机人</el-button>
    </div>
    <!-- 保险选择 -->
    <div class="insurance">
        <h3>保险</h3>
        <div class="insurance_item" v-for='(item,index) in insurances' :key='index'>
            <el-checkbox size='small'
              :label="item.type+':'+'￥'+item.price+'/份---最高赔付'+item.compensation"
               border
               @change='checkInsurance(item)'
               ></el-checkbox>
        </div>
        <el-checkbox-group v-model="form.insurances">
    
  </el-checkbox-group>

    </div>
    <!-- 联系人 -->
    <div class="contact">
        <h3>联系人</h3>
        <el-form :model="form" status-icon label-width="100px" class="demo-ruleForm">
  <el-form-item label="姓名">
    <el-input type="text" v-model="form.contactName" auto-complete="off" style='width:300px'></el-input>
  </el-form-item>
  <el-form-item label="手机">
    <el-input type="text" v-model="form.contactPhone" auto-complete="off" style='width:300px'>
        <template slot="append"><div @click='sendCode'>发送验证码</div></template>
    </el-input>
  </el-form-item>
  <el-form-item label="验证码">
    <el-input value='000000' style='width:300px'></el-input>
  </el-form-item>
</el-form>
    </div>
    <div class="btn">
          <el-button type="warning" style='width:180px;' @click='commitOrder'>提交订单</el-button>
    </div>
  </div>
</template>

<script>
export default {
    // object,array
    // props:['ticketData','insurances'],
    props:{
        // 机票详情
        ticketData:{
            type:Object,
            default:{}
        },
        // 机票保险
        insurances:{
            type:Array,
            default:[]
        }
    },
  data() {
    return {
      // 提交订单需要的数据
      form: {
        // 乘机人对象数组
        users: [{ username: "学习", id: "111222" }],
        // 选择的保险id数组
        insurances: [],
        // 联系人的名字
        contactName: "小黑",
        // 联系人的电话
        contactPhone: "13192922529",
        // 是否开发票
        invoice: false,
        // 座位id
        seat_xid: this.$route.query.seat_xid,
        // 航班的id
        // 切记数据类型，后台要什么数据类型就给什么类型，给错或报400错误，表示根本没有进入到后台，应为参数不是后台想要的
        air: +this.$route.query.id,
        // 手机验证码
        captcha: '000000'


      },
   
    // 保险费用
        baoPrice:0
    };
  },
  methods: {
    //   复选框选中发生改变时候处罚的事件
      checkInsurance(item){
          const {id,price}=item
        // 判断该id是否已经选过
        // 查询该id
        const index =this.form.insurances.indexOf(id)
        if(index===-1){
            // 之前未选中该id
            // 那么就在数组里面添加该id
            this.form.insurances.push(id)
            // 把价格加上
            this.baoPrice+=price
        }else{
            // 之前已经选中了该id1
            // 那么就要删除该id
            this.form.insurances.splice(index,id)
            // 把价钱减去
            this.baoPrice-=price
        }
        // console.log(item)
        // console.log(this.form)
        // console.log(this.price)
      },
    //   发送验证码
    sendCode(){
        // 方验证码
        this.$axios.post('/captchas',{tel:this.form.contactPhone})
        .then(res=>{
            // console.log(res)
            if(res.status===200){
                this.$message("偷偷告诉你，验证码六个1")
            }
        })
    },
    // 提交订单
    commitOrder(){
        // 获取数据
        // console.log(this.form)
        // 验证数据-假设验证通过
        let isok=true
        // 检查乘机人信息
        this.form.users.forEach(v=>{
            if(v.username===''){
                // 不通过
                isok=false
                // 报错
                this.$message.warning('乘机人名字不能为空')
            }
            if(isNaN(v.id)||v.id===''){
                isok=false
                 this.$message.warning('请输入正确的乘机人证件号码')
            }
        })
        // 检查联系人名字
        if(this.form.contactName===''){
            isok=false;
             this.$message.warning('联系人名字不能为空')
        }
        // 检查联系人号码
        if(this.form.contactPhone===''||isNaN(this.form.contactPhone)){
             this.$message.warning('请输入正确的联系人电话')
        }
        if(!isok){
            return
        }
        // 发送axios请求提交订单
        // 从仓库获取token值
        let token=this.$store.state.user.userInfo.token
        // console.log(token)
        this.$axios.post('/airorders',this.form,{headers:{
            Authorization: `Bearer ${token}` 
        }})
        .then(res=>{
            if(res.status===200){
                // 订单提交成功
                this.$message.success('订单提交成功')
                setTimeout(() => {
                    this.$router.push({path:'/air/pay',query:{id:res.data.data.id}})
                }, 1000);
            }
        })
        



    }
  },
  computed:{
      // 订单总额
    allPrice(){
        // 单人机票价格
        let price = 0
        // 加上一张机票的价格
        price+=this.ticketData.base_price
        // console.log(this.ticketData)
        // 加上油费
        price+=this.ticketData.airport_tax_audlet
        // 加上保险费
        price+=this.baoPrice
        // 最后乘以总人数
       price*=this.form.users.length
    //    发射事件，告诉父组件，数据被修改了
    this.$emit('changePrice',price)
        return price

    }


  }
};
</script>
<style lang="less" scoped>
.order_user_form {
    >div{
        padding-bottom:20px;
        border-bottom:1px dashed #ccc;
    }
    h3{
        font-size:24px;
        font-weight:500;
        margin:10px;
    }
  .user {
      padding-right:60px;
    .userItem{
        position:relative;
        .delUser{
            position:absolute;
            right:20px;
            top:115px;
            background-color: #ccc;
            color:#fff;
            width:20px;
            height:20px;
            border-radius:10px;
            display:flex;
            align-items:center;
            justify-content: center;
            cursor: pointer;

        }
    }
  }
  .insurance{
      .insurance_item{
          margin:20px;
      }
  }
  .btn{
      display:flex;
      justify-content: center;
      height:80px;
      align-items:center;
  }
}
</style>