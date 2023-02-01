<template>
  <coupon-detail :is-edit="true" />
</template>
<script>
import CouponDetail from './components/CouponDetail'
export default {
  name: 'UpdateCoupon',
  components: { CouponDetail }
}
</script>
<style scoped>
</style>
