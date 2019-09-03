<template>
  <div class="app-main" id="main">
    <div a0="1" a1="1" a2="1" a3="1" a4="1" a5="1" a6="1" a7="1" a8="1" a9="1"></div>
    <div></div>
    <Col>
      <div></div>
      <div></div>
    </Col>
    <Input />
  </div>
</template>

<script>
class Person {
    constructor(name) {
        this.name = name
    }
}
export default {
    name: 'AppMain',
    // data: () => ({ a: 1, b: 1, c: 1, d: 1234567890, e: 123456789012345678901234567890123456789012345678901234567890 }),
    data: function() {
        return { a: 1 }
    },
    mounted() {
        let a = new Person()
        const obj = { a: 1 }
        const arr = ['error', 'single']
        // new Person() // X
        console.log(a, obj, arr)
        if (a) {
            return false
            // console.log(123)
        }

        if (a === null) {
            let b = 1
            switch (b) {
                case 1:
                    break
                default:
                    break
            }
        }
    }
}
</script>

<style lang="less">
@import './styles/app.less';
.app-main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    @fontsize :14px;
    // table字体
    .ivu-table {
        font-size: @fontsize;
        .ivu-btn-small {
            font-size: @fontsize;
        }
    }
    // btn字体
    .ivu-btn {
        font-size: @fontsize;
        line-height: 18px;
    }
    // form字体
    .ivu-form {
        .ivu-form-item-label {
            font-size: @fontsize;
            line-height: 12px;
        }
        .ivu-select-input,
        .ivu-input {
            font-size: @fontsize;
            line-height: 32px;
        }
        .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
            font-size: @fontsize;
            height: 32px;
            line-height: 32px;
        }
        .ivu-cascader .ivu-cascader-menu-item,
        .ivu-select-item {
            font-size: @fontsize !important;
        }
    }
    .ivu-form-item-content {
        font-size: @fontsize;
    }
    // 富文本
    .ql-container {
        font-size: @fontsize;
    }
}
</style>