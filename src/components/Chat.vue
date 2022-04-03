<template>
  <div>
    <b-row>
      <b-card>
        <b-col lg="12">
          <b-form-textarea v-model="message.content" id="description" placeholder="Enter the description of the task"></b-form-textarea>
          <b-button @click="send_message">Отправить комментарий</b-button>
        </b-col>
      </b-card>
      <br>
      <b-button @click="clear_array">Очистить массив с сообщениями</b-button>
    </b-row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      task_id: this.$route.params.id,
      message: {
        email: this.$store.getters.GET_EMAIL,
        content: '',
      }
    }
  },
  mounted: {

  },
  computed: {
    get_messages() {
      return this.$store.getters.GET_MESSAGES
    }
  },
  methods: {
    send_message: function () {
      var payload = this.message;
      payload.task_id = this.task_id;
      this.$socket.emit('send_message', payload)
    },
    clear_array: function () {
      this.$store.commit("DELETE_MESSAGES");
      this.commit.get_messages();
    }
  }
}
</script>