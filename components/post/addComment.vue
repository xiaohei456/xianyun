<template>
  <!-- 添加评论的组件 -->
  <div class="addcom">
    <div class="title">评论</div>
    <div class="content">
      <textarea rows="5" cols="92" placeholder="请输入内容" v-model="content"  style="resize: none" ></textarea>
      <div class="btn" style="float:right">
        <el-button
          type="primary"
          style="width:58px;height:28px;font-size:12px;text-align:center;line-height:6px;"
        ><div @click='add'>提交</div></el-button>
      </div>
    </div>
    <div class="photo" >
      <el-upload
      name='files'
        action="http://127.0.0.1:1337/upload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="imgSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny" style='width:50px'>
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      dialogImageUrl: "",
      dialogVisible: false,
      pics:[],
      // 被回复者的id
      id:this.$route.query.id
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    imgSuccess(req,file){
      // 添加图片数据
      this.pics.push(req[0].id)
      console.log(this.pics)
    },
    // 提交评论
    add(){
      // // 获取数据

      // let form={
      //   contnet:this.content,
      //   pics:this.pics,
      //   post:this.id
      // }
      // let token=this.$store.state.user.userInfo.token
      // // 发送ikqingi
      // this.$axios .post('/comments',form,{ headers: { Authorization: `Bearer ${token}`} })
      // .then(res=>{
      //   console.log(res)
      // })
      let post = this.id;
        const pics=this.pics
        const form={pics,post,content: this.content }
      const token = this.$store.state.user.userInfo.token;
      //提交评论
      this.$axios .post( "/comments",
        form,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(res => {
          // console.log(res);
          // 发射一个事件，监听品论发表成功后，要重新去获取评论数据
          this.$emit('addSuccess')
          if(res.status===200){
          this.$message.success('评论成功')
          this.content=''
          this.dialogImageUrl=''

          }
        })
    }
  }
};
</script>
<style lang="less" scoped>
.title{
  font-size:20px;
  margin:10px 0;
}
</style>