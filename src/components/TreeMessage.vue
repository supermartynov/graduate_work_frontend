<template>
  <div>
    <a class="media-left" href="#"><img class="img-circle img-sm" alt="Профиль пользователя"
                                        src="https://bootstraptema.ru/snippets/icons/2016/mia/1.png"></a>
    <div v-bind:class="{'media-body': message.hierarchy_level === 1}">
      <div>
        <div class="mar-btm">
          <a href="#" class="btn-link text-semibold media-heading box-inline">{{ message.user.login }}</a>
          <p class="text-muted text-sm"><i class="fa fa-mobile fa-lg"></i> {{ message.created }}</p>
        </div>
        <p>{{ message.message_body }} </p> <!-- Сообщение от пользователя  !-->
        <button type="button" class="btn btn-link mt-n3">Ответить</button>
        <p>
          <tree-children-message v-if="message.children" :children="message.children"/>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "tree-message",
  props: ['message'],
  beforeCreate: function () {
    this.$options.components.TreeChildrenMessage = require('./TreeChildrenMessage').default
  }
}
</script>

<style scoped>

</style>