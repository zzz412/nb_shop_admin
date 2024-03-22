<template>
  <div class="newGoods-view">
    <el-form ref="formRef" label-width="100px" :model="form" :rules="formRules">
      <el-form-item label="商品分类" prop="goodsCategoryId">
        <!--<el-input class="inline-input" placeholder="请输入内容" v-model="form.goodsCategoryId" />-->
        <el-cascader
          class="inline-input"
          :props="cascaderProps"
          :placeholder="goodsCateName || '请选择商品分类'"
          v-model="form.goodsCategoryId"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsName">
        <el-input class="inline-input" placeholder="请输入内容" v-model="form.goodsName" />
      </el-form-item>
      <el-form-item label="商品简介" prop="goodsIntro">
        <el-input type="textarea" class="inline-input" placeholder="请输入内容" v-model="form.goodsIntro" />
      </el-form-item>
      <el-form-item label="商品价格" prop="originalPrice">
        <el-input type="number" class="inline-input" placeholder="请输入内容" v-model.number="form.originalPrice" />
      </el-form-item>
      <el-form-item label="商品售卖价" prop="sellingPrice">
        <el-input type="number" class="inline-input" placeholder="请输入内容" v-model.number="form.sellingPrice" />
      </el-form-item>
      <el-form-item label="商品库存" prop="stockNum">
        <el-input type="number" class="inline-input" placeholder="请输入内容" v-model.number="form.stockNum" />
      </el-form-item>
      <el-form-item label="商品标签" prop="tag">
        <el-input class="inline-input" placeholder="请输入内容" v-model="form.tag" />
      </el-form-item>
      <el-form-item label="上架状态">
        <el-radio-group v-model="form.goodsSellStatus">
          <el-radio-button :label="0">上架</el-radio-button>
          <el-radio-button :label="1">下架</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品主图" prop="goodsCoverImg">
        <nb-upload :avatar.sync="form.goodsCoverImg" />
      </el-form-item>
      <el-form-item label="商品详情" prop="goodsDetailContent">
        <!--<el-input class="inline-input" placeholder="请输入内容" v-model="form.goodsDetailContent" />-->
        <NbEditor :html.sync="form.goodsDetailContent" />
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm" type="primary">提交内容</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import NbUpload from '@/components/NbUpload.vue'
import { checkNewGoodsRules } from '@/utils/validate'
import { addGoodsApi, cateListApi, editGoodsApi, getGoodsApi } from '@/api/goods'
import NbEditor from '@/components/NbEditor'

export default {
  name: 'GoodsNew',
  components: { NbEditor, NbUpload },
  // 接收动态路由参数
  props: ['goodsId'],
  data() {
    return {
      goodsCateName: '',
      form: {
        goodsCategoryId: '',
        goodsCoverImg: '',
        goodsDetailContent: '',
        goodsIntro: '',
        goodsName: '',
        goodsSellStatus: 0,
        originalPrice: '',
        sellingPrice: '',
        stockNum: '',
        tag: ''
      },
      formRules: checkNewGoodsRules(),
      cascaderProps: {
        // 设置只获取最后一个节点的值
        emitPath: false,
        lazy: true,
        // node表示当前操作节点 resolve返回函数（需要将渲染的内容返回）
        lazyLoad: this.loadCateSelect
      }
    }
  },
  methods: {
    async initForm() {
      if (!this.goodsId) return
      const { goods, firstCategory, secondCategory, thirdCategory } = await getGoodsApi(this.goodsId)
      // 处理响应参数值
      this.form = {
        goodsCategoryId: goods.goodsCategoryId,
        goodsCoverImg: goods.goodsCoverImg,
        goodsDetailContent: goods.goodsDetailContent,
        goodsIntro: goods.goodsIntro,
        goodsName: goods.goodsName,
        goodsSellStatus: goods.goodsSellStatus,
        originalPrice: goods.originalPrice,
        sellingPrice: goods.sellingPrice,
        stockNum: goods.stockNum,
        tag: goods.tag
      }
      // 处理分类名
      this.goodsCateName = `${firstCategory.categoryName} / ${secondCategory.categoryName} / ${thirdCategory.categoryName}`
    },
    async submitForm() {
      try {
        // 1. 校验表单格式
        await this.$refs.formRef.validate()
        // 2. 提交数据
        this.goodsId ? await editGoodsApi({ goodsId: this.goodsId, ...this.form }) : await addGoodsApi(this.form)
        // 3. 成功反馈
        this.$message.success('操作成功')
        this.$router.push('/goods/list')
      } catch (e) {
        console.log('校验失败')
      }
    },
    // 加载分类下拉选项
    async loadCateSelect(node, resolve) {
      console.log(node)
      const { list } = await cateListApi({
        pageNumber: 1,
        pageSize: 1000,
        categoryLevel: node.level + 1,
        parentId: node.value || 0
      })
      // 通过value设置下列选项值  label设置下列选项显示值  leaf控制是否加载下一级【true不加载  false加载】
      const result = list.map((item) => ({ value: item.categoryId, label: item.categoryName, leaf: node.level >= 2 }))
      resolve(result)
    }
  },
  mounted() {
    this.initForm()
  }
}
</script>

<style scoped lang="scss">
.newGoods-view {
  .inline-input {
    width: 300px;
  }
}
</style>