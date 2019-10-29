<template>
  <div>
    <div class="top">
      <span
        v-for="(value,index) in arr"
        :key="index"
        :class="{current:currentIndex===index}"
        @click="current(index)"
      >{{value.name}}</span>
    </div>
    <div class="input">
      <input type="text" :placeholder="placeholder" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索的索引
      arr: [
        {
          name: "攻略",
          ph: "请输入城市"
        },
        {
          name: "酒店",
          ph: "搜索酒店"
        },
        {
          name: "机票",
          ph: "飞机"
        }
      ],
      // 被选中索引的项
      currentIndex: 0,
      placeholder:'请输入城市'
    };
  },
  methods:{
      current(index){
          this.currentIndex=index
          this.placeholder=this.arr[index].ph
          // 判断如果是点击了飞机，就跳转到飞机票页面
          if(index===2){
            this.$router.push('/air')
          }
      }
  }
};
</script>

<style lang='less' scoped>
div {
  .top {
    display: flex;
    .current {
      background-color: #ccc;
      color: #666;
    }
    span {
      color: #fff;
      padding: 0 20px;
      margin-right: 15px;
      height: 40px;
      display: felx;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &::after{
        content: '';
        width:0;
        height:0;
        border-left:5px solid #fff;
        border-top:40px solid rgba(0,0,0,0);
        position: absolute;
        right:-5px;
      
      }

    }
  }
  .input {
    input {
      text-indent: 1em;
      font-size: 18px;
      width: 550px;
      height: 50px;
      outline: none;
      border: none;
      border-radius:0 5px 5px 5px;
    }
  }
}
</style>