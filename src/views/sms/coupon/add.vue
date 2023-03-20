<template>
  <coupon-detail :is-edit="false" />
</template>
<script>
import CouponDetail from './components/CouponDetail'
export default {
  name: 'AddCoupon',
  components: { CouponDetail }
}
</script>
<style scoped>
</style>
