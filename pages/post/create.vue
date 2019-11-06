  <template xmlns:v-quill='富文本编辑器'>
  <div class="bx">
    <div class="content">
      <div class="top">
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦！</p>
        <input type="text" placeholder="请输入标题" v-model="title"/>
      </div>

      <div
        class="quill-editor"
        :content="content"
        @change="onEditorChange($event)"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        v-quill:myQuillEditor="editorOption"
      ></div>

      <div class="bottom">
        <span>选择城市</span>
        <el-autocomplete
          @select="handleSelect1"
          v-model="searchValue"
          :fetch-suggestions="querySearchAsync"
          placeholder="请搜索游玩城市"
        ></el-autocomplete>
      </div>
      <div class="public">
        <el-button type="primary"
        @click="postPlan">发布</el-button>
        <span>&nbsp;&nbsp;或者</span>
        <i @click="save">保存到草稿</i>
      </div>
    </div>
    <div  class="aside_right">
    <p>草稿箱&nbsp;({{arr.length}})</p>
    <div v-for="(item,index) in arr" :key="index" class="timefor">
      <div class="el-icon-edit" @click="editPost(item)">{{item.title}}</div>
      <div>{{new Date | getdate}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr:[],
      searchValue: '',
      title: '', // 文章的标题
      content: '<p></p>',
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            // ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            ["link", "image", "video"]// 链接、图片、视频
          ]
        }
      }
      //     config: {
      //     // 上传图片的配置
      //     uploadImage: {
      //       url: 'http://localhost:3000/upload',
      //       headers:{ Authorization: 'Bearer '+ this.$store.state.user.userinfo.token},
      //       name: 'file',
      //       // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
      //       uploadSuccess (res, insert) {
      //         console.log(res)
      //         insert('http://localhost:3000' + res.data.data.url)
      //       }
      //     },
      // }
    }
  },
  methods: {
      editPost(item){
        this.title =item.title
        this.content=item.content
        this.searchValue=item.city
      },
      postPlan(){
          if(this.title.trim()===''){
            this.$message.error('请选择主题')
            return
          }
          if(this.searchValue.trim()===''){
            this.$message.error('请选择城市')
            return
          }
          // console.log(this.$store.state.user.userinfo.token)
          this.$axios.post('/posts',{content:this.content,title:this.title,city:this.searchValue},{headers:{ Authorization:`Bearer ${this.$store.state.user.userinfo.token}`}})
          .then (res=>{
            console.log(res);
            if(res.status==200){
                this.title=''
                this.content='<p></p>'
                this.searchValue=''
              this.$message.success('发布成功')
            }
          })
      },
      save(){
          this.arr.push({title:this.title,content:this.content,city:this.searchValue})
          localStorage.setItem('myplan',JSON.stringify(this.arr))
      },
    handleSelect1(item) {
      this.searchValue = item.name
    },
    querySearchAsync(queryString, callback) {
      //queryString =当前输入框的值
      //发送关键字  广
      //callback()
      console.log(queryString);
      if (queryString) {
        this.$axios
          .get('/airs/city', { params: { name: queryString } })
          .then(res => {
            console.log(res);
            let cityArr = res.data.data
            cityArr.forEach(v => {
              //把市 字去掉 因为后台不需要 '市'字
              v.name = v.name.replace('市', '');
              v.value = v.name
            });
            callback(cityArr)
          })
      }
    },
    onEditorBlur(editor) {
//失去焦点事件
        console.log('editor blur!', editor)
},
      onEditorFocus(editor) {
//获得焦点事件
        console.log('editor focus!', editor)
},
      onEditorReady(editor) {
console.log('editor ready!', editor)
},
      onEditorChange({ editor, html, text }) {
//内容改变事件
        console.log('editor change!', editor, html, text)
this.content = html
},
  },
  filters:{
    getdate:(time, spe) => {
  time = new Date()
  spe = spe || '-'
  // 实现时间格式化
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  month = month >= 10 ? month : '0' + month
  let day = time.getDate()
  // 返回格式化结果
  return year + spe + month + spe + day
}
  },
  mounted () {
this.arr=JSON.parse(localStorage.getItem('myplan'))||[]
console.log(this.arr);
}
}
</script>

<style lang="less" scoped>
.bx {
  display: flex;
  justify-content: space-between;
}
.top {
  margin-top: 20px;
  h2 {
    font-weight: 400;
    font-size: 22px;
  }
  p {
    color: #999999;
    font-size: 12px;
    padding: 15px 0;
  }
  input {
    width: 750px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #dcdfe6;
    text-indent: 1em;
    margin-bottom:20px;
  }
}
.container {
  width: 100%;
  max-width: 750px;
}
.quill-editor {
height: 400px;
 width: 100%;
  overflow-y: auto;
  margin-bottom:20px;
}
.bottom {
  width: 280px;
  // line-height: 40px;
  align-items: center;
  // background-color: red;
  display: flex;
  justify-content: space-between;
  input {
    width: 200px;
    height: 40px;
    text-indent: 1em;
    line-height: 40px;
    border: 1px solid #cfcbcd;
    border-radius: 5px;
    color: #cfcbcd;
  }
}
.public {
  margin: 30px 0;
  width: 210px;
  i {
    font-style: normal;
    color: #ffac13;
    font-weight: 400;
    cursor: pointer;
  }
}
.aside_right {
  // background-color: yellow;
  border: 1px solid #dddddd;
  // height: 100px;
  width: 200px;
  margin-top: 30px;
  padding-left: 10px;
  p {
    padding: 10px 0;
  }
  .timefor{
    padding: 7px 0;
    cursor: pointer;
    &:hover{
      color: #ffac13;
    }
  }
}
</style>