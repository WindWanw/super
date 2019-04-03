<template>
   <div class=''>
       404
   </div>
</template>

<script>
   export default {
     data () {
       return {

     }
   },
   components: {

   },
   created(){
     this.$api.userlist({
       page:1
     }).then(res=>{
       console.log(res)
     })
   }
  }
</script>

<style>

</style>
