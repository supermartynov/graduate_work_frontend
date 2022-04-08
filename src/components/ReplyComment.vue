<template>
  <div v-bind:class="{'ml-3': message.hierarchy_level === 2}">
    <a class="media-left" href="#"><img class="img-circle img-sm" alt="Профиль пользователя"
                                        src="https://bootstraptema.ru/snippets/icons/2016/mia/2.png"></a>
    <div class="mar-btm">
      <a href="#" class="btn-link text-semibold media-heading box-inline">{{ message.user.login }}</a>
      <p class="text-muted text-sm"> {{ message.created }}</p>
    </div>
    <p>{{ message.message_body }} </p>

    <button type="button" class="btn btn-link mt-n4" @click="show_form">
      Ответить
    </button>
    <div class="panel" v-show="show">
      <div class="panel-body">
        <textarea class="form-control" rows="2" v-model="payload.message_body" placeholder="Добавьте Ваш комментарий"/>
        <div class="mar-top clearfix">
          <button class="btn btn-sm btn-primary pull-right" @click="reply">Ответить</button>
        </div>
      </div>
    </div>
    <hr>
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