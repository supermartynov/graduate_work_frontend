<template>
  <div>
    <a class="media-left" href="#"><img class="img-circle img-sm" alt="Профиль пользователя"
                                        src="https://bootstraptema.ru/snippets/icons/2016/mia/2.png"></a>
    <div class="card w-75">
      <div class="card-body">
        <h5 class="card-subtitle">{{ message.user.login }}</h5>
        <p class="card-text">{{ message.message_body }}</p>
        <button type="button" class="btn btn-link mt-n4" @click="show_form">
          Ответить
        </button>
        <div class="panel" v-show="show">
          <div class="panel-body">
            <textarea class="form-control" rows="2" v-model="payload.message_body"
                      placeholder="Добавьте Ваш комментарий"/>
            <div class="mar-top clearfix">
              <button class="btn btn-sm btn-primary pull-right" @click="reply">Ответить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ReplyComment",
  components: {},
  props: ['message'],
  data: function () {
    return {
      show: false,
      payload: {
        message_body: '',
        email: this.$store.getters.GET_EMAIL,
        room: this.message.room,
        parent_message_id: this.message.id
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