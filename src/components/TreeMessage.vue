<template>
  <div>
    <a class="media-left ml-2" href="#">
      <img v-if="message.user.login == 'user1' " class="img-circle img-sm" alt="Профиль пользователя" src="https://bootstraptema.ru/snippets/icons/2016/mia/4.png">
      <img v-if="message.user.login == 'user2' " class="img-circle img-sm" alt="Профиль пользователя" src="https://bootstraptema.ru/snippets/icons/2016/mia/2.png">
      <img v-if="message.user.login == 'user3' " class="img-circle img-sm" alt="Профиль пользователя" src="https://bootstraptema.ru/snippets/icons/2016/mia/1.png">
    </a>
    <div>
      <b-card v-if="!isDeleted" v-bind:title="message.user.login" style="width: 75%">
        <div class="card-body mt-n4">
          <b-card-text class="mb-3">
            <p class="card-text">{{ message.message_body }}</p>
          </b-card-text>
        </div>
        <b-card-text class="bg-white mb-n3 text-left">
          <button type="button" class="btn btn-link mt-n4" @click="show_form">
            {{ $t('chat.reply') }}
          </button>
          <button type="button" v-if="message.user.login === this.$store.getters.GET_LOGIN" class="btn btn-link mt-n4" @click="delete_message">
            {{ $t('chat.delete') }}
          </button>
          <button type="button" v-if="message.user.login === this.$store.getters.GET_LOGIN" class="btn btn-link mt-n4" @click="show_form">
            {{ $t('chat.change') }}
          </button>
          <div class="panel" v-show="show">
            <div class="panel-body">
              <textarea class="form-control" rows="2" v-model="payload.message_body"
                        v-bind:placeholder="$t('add-comment')"/>
              <div class="mar-top clearfix">
                <button class="btn btn-sm btn-primary pull-right" @click="reply">{{ $t('chat.reply') }}</button>
              </div>
            </div>
          </div>
        </b-card-text>
      </b-card>
      <hr>
      <div v-if="isDeleted">
        <b-card v-if="isDeleted" v-bind:title="message.user.login" style="width: 75%">
          <div class="card-body mt-n4">
            <b-card-text class="mb-3">
              <p class="card-text">{{ $t('chat.deleted') }}</p>
            </b-card-text>
          </div>
        </b-card>
        <hr>
      </div>

      <div class="ml-3">
        <tree-children-message v-if="message.children" :children="message.children"/>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "tree-message",
  props: ['message'],
  data: function () {
    return {
      show: false,
      isDeleted: false,
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
    },
    delete_message: function () {
      this.isDeleted = !this.isDeleted;
    }
  },
  beforeCreate: function () {
    this.$options.components.TreeChildrenMessage = require('./TreeChildrenMessage').default
  }
}
</script>

<style scoped>

</style>