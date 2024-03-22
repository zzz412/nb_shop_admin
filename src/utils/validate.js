// 表单规则校验文件

// * 1. 校验新增商品规则
export function checkNewGoodsRules() {
  return {
    goodsCategoryId: [{ required: true, message: '分类不能为空', trigger: 'blur' }],
    goodsName: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
    goodsIntro: [{ required: true, message: '商品简介不能为空', trigger: 'blur' }],
    tag: [{ required: true, message: '商品标签不能为空', trigger: 'blur' }],
    originalPrice: [
      { required: true, message: '价格不能为空', trigger: 'blur' },
      { type: 'number', min: 0, max: 999999, message: '范围0-999999之间', trigger: 'blur' }
    ],
    sellingPrice: [
      { required: true, message: '售卖价不能为空', trigger: 'blur' },
      { type: 'number', min: 0, max: 999999, message: '范围0-999999之间', trigger: 'blur' }
    ],
    stockNum: [
      { required: true, message: '库存不能为空', trigger: 'blur' },
      { type: 'number', min: 0, max: 9999, message: '范围0-999之间', trigger: 'blur' }
    ],
    goodsCoverImg: [{ required: true, message: '商品主图不能为空', trigger: 'blur' }],
    goodsDetailContent: [{ required: true, message: '商品介绍不能为空', trigger: 'blur' }]
  }
}
