<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { getOrderAPI } from '@/apis/pay.js'
import { useRoute, useRouter } from 'vue-router'
import { useCountDown } from '@/composables/useCountDown.js'
import { ElMessage, ElMessageBox } from 'element-plus'

const { formatTime, countDownFinished, start } = useCountDown()
const router = useRouter() // 使用 useRouter 获取路由实例
const route = useRoute()
const payInfo = ref({})
const getPayInfo = async () => {
  const res = await getOrderAPI(route.query.id)
  payInfo.value = res.result
  //初始化倒计时秒数
  start(res.result.countdown)
}
onMounted(() => getPayInfo())

// 监听 countDownFinished 的变化，如果倒计时结束，则返回到购物车页面
watchEffect(() => {
  if (countDownFinished.value) {
    ElMessageBox.confirm('是否返回购物车重新下单?', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        router.push('/cart')
        ElMessage({
          type: 'success',
          message: '跳转成功'
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消跳转'
        })
      })
  }
})

//跳转支付
//携带订单id以及回调地址跳转到支付地址(get)
// 支付地址
const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const backURL = 'http://localhost:5173/paycallback'
//当需要在 URL 中传递参数时，为了避免特殊字符对 URL 的解析造成干扰，
//我们通常需要使用 encodeURIComponent 函数将参数进行编码。
//该函数会将一些特殊字符（如空格、问号和&等）替换为它们对应的百分比编码值
const redirectUrl = encodeURIComponent(backURL)
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.id}&redirect=${redirectUrl}`
</script>

<template>
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 付款信息 -->
      <div class="pay-info">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <p v-if="!countDownFinished">
            支付还剩 <span>{{ formatTime }}</span
            >, 超时后将取消订单
          </p>
          <p v-else>支付超时，请返回购物车重新下单</p>
          <!-- 倒计时结束时显示超时提示 -->
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{ payInfo.payMoney?.toFixed(2) }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a>
          <a class="btn alipay" :href="payUrl"></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-pay-page {
  margin-top: 20px;
}

.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;

  .icon {
    font-size: 80px;
    color: #1dc779;
  }

  .tip {
    padding-left: 10px;
    flex: 1;

    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }

      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }

  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }

      &:last-child {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }
}

.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;

  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;

    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }

  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;

    &.active,
    &:hover {
      border-color: $xtxColor;
    }

    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png)
        no-repeat center / contain;
    }

    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg)
        no-repeat center / contain;
    }
  }
}
</style>
