<template>
  <div class="panel-body">
    <textarea class="form-control" rows="2" v-model="payload.message_body" v-bind:placeholder="$t('chat.add-comment')"/>
    <div class="mar-top clearfix">
      <button class="btn btn-sm btn-primary pull-right" @click="reply">{{$t('chat.comment')}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentForm",
  data: function () {
    return {
      show: false,
      payload: {
        message_body: '',
        email: this.$store.getters.GET_EMAIL,
        room: this.$route.params.id
      }
    }

  },
  methods: {
    show_form: function () {
      this.show = !this.show
    },
    reply: function () {
      this.$socket.emit("send_message", this.payload)
    }
  },
}
</script>

<style scoped>

</style>