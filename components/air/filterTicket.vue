<template>
  <div class="filter">
    <!-- 筛选机票的下拉选项 -->

    <div class="filter_header">
      <!--左边提示信息 -->
      <div class="header_left">单程： {{info.departCity}} - {{info.destCity}} / {{info.departDate}}</div>
      <!-- //   右边的下拉选项筛选 -->
      <div class="header_right">
        
         
            <el-select v-model="fliter.airport" class='select' placeholder="起飞机场" size="mini"  @change='filterTicket' >
                <!-- // 动态生成下拉数据 -->
              <el-option :value='item.value' :label='item.label' v-for="(item,index) in fliterOption.airport" :key='index'></el-option>
            </el-select>
          
            <el-select v-model="fliter.flightTimes" class='select' placeholder="起飞时间" size="mini"  @change='filterTicket'>
                <!-- // 动态生成下拉数据 -->
              <el-option :value='item.value' :label='item.label' v-for="(item,index) in fliterOption.flightTimes" :key='index'></el-option>
            </el-select>
            <el-select v-model="fliter.company" class='select' placeholder="航空公司" size="mini"  @change='filterTicket'>
                <!-- // 动态生成下拉数据 -->
              <el-option :value='item.value' :label='item.label' v-for="(item,index) in fliterOption.company" :key='index'></el-option>
            </el-select>
            <el-select v-model="fliter.size" class='select' placeholder="机型" size="mini"  @change='filterTicket'>
                <!-- // 动态生成下拉数据 -->
              <el-option :value='item.value' :label='item.label' v-for="(item,index) in fliterOption.sizes" :key='index'></el-option>
            </el-select>
       
      </div>
    </div>
    <div class="filter_footer" >筛选：  <el-button type="primary" size='mini' round plain @click='filterOver'>撤销</el-button></div>
  </div>
  
</template>

<script>
export default {
  props: {
    //   本自组价需要的数据
    // 航班信息,
    info:{
        type:Object,
        default:{}
    },
    // 航班的下拉选择
    options:{
        type:Object,
        default:{
            airport:[]
        }
    }
 
  },
  data() {
    return {
      fliter: {
        airport: "",
        flightTimes:'',
        company:'',
        size:''
      }
    };
  },
  computed: {
      fliterOption(){
        //   下拉选项
        // 起飞机场
        var airport=[]
    //    this.options.airport.forEach(v=>{
    //        v && airport.push({value:v,label:v})
    //    })
    console.log(this.options)
    airport=this.options.airport.map(v=>{
        return {value:v,label:v||"全部机场"}
    })
    //    起飞时间
    var flightTimes=[{value:'',label:'全天'}]
    this.options.flightTimes.forEach(v=>{
        flightTimes.push({
            value:v.from+"|"+v.to,
            label:`${v.from}:00--${v.to}:00`
        })
    })
    //  航空公司
    var company=[{value:'',label:'全部航空公司'}]
    this.options.company.forEach(v=>{
        company.push({value:v,label:v})
    })
    // 机型大小
    var sizes=[
        {value:'L',label:'大'},
        {value:'M',label:'中'},
        {value:'S',label:'小'}
    ]
 
       return {airport,flightTimes,company,sizes}
      }
  },
  methods: {
      filterTicket(){
        //   筛选条件改变时
        // console.log(this.fliter)
        // 这里是子组件，我们要改变兄弟组件的列表显示，我们要先向父组件，发射一个事件，同时传递一个参数，参数就是我们筛选下拉选项选中的值
        this.$emit('fliter',this.fliter)
      },
      filterOver(){
        //   撤销筛选
        this.fliter={
        airport: "",
        flightTimes:'',
        company:'',
        size:''
    
      }
    //   再次发射事件
    this.$emit('fliter',this.fliter)
      }
  }
};
</script>

<style lang="less" scoped>
.filter {
  .filter_header {
    display: flex;
    justify-content: space-between;
    .header_left {
      font-size: 13px;
      display: flex;
      align-items: center;
    }
  }
  .header_right {
      display:flex;
      .select{
          width:120px;
      }
  }
}
</style>