<template>
  <div>
    <b-row>
      <b-col lg="6">
        <b-card>
          <b-card-header class="h4">{{get_task.title}}
            <span v-bind:class="{'text-success': get_task.difficulty_id === 1, 'text-warning': get_task.difficulty_id === 2, 'text-danger': get_task.difficulty_id === 3}" class="float-right h5">{{get_task.difficulty.title}}</span>
          </b-card-header>
          <b-card-body class="pb-5">
            <span class="float-left h5">{{get_task.description}}</span>
          </b-card-body>
          <b-card-footer class="pb-5">
            <b-btn type="button" class="btn btn-info float-right">Help</b-btn>
          </b-card-footer>
        </b-card>
      </b-col>
      <b-col lg="6">
        <b-card>
          <b-card-header class="h4">
            Your query:
          </b-card-header>
          <b-card-body>
            <b-form-textarea v-model="answer.sql_answer" placeholder="Enter the your query on SQL"></b-form-textarea>
          </b-card-body>
          <footer>
            <b-btn type="button" class="btn btn-success float-right">Send answer</b-btn>
            <b-btn type="button" variant="primary" class="btn btn-primary float-right mr-1">Execute</b-btn>
          </footer>
        </b-card>
      </b-col>
      <b-col lg="6">
        <b-card>
          <b-card-header class="h4">
            {{'ERD diagram of the database ' + get_task.database.title}}
          </b-card-header>
          <b-card-body>
            <img style="height: 500px; width: 676px;" src="img/databases/university.png" alt="Database image">
          </b-card-body>
        </b-card>
      </b-col>
      <b-col lg="6">
        <b-card>
          <div slot="header" v-html="caption"></div>
          <b-table bordered="bordered" fixed="fixed" :items="items">
          </b-table>
          <nav>
            <b-pagination prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
          </nav>
        </b-card>
      </b-col>
    </b-row>
    <Chat></Chat>
  </div>
</template>

<script>
import Chat from "@/components/Chat";
export default {
  name: "TaskShow",
  components: {Chat},
  data: function() {
    return {
      answer: {}
    }
  },
  computed: {
    get_task() {
      return this.$store.getters.ONE_TASK;
    },
    items: function() {
      return [
        {first_name: 'Павел', second_name: 'Смирнов', third_name: 'Алексеевич', group_id: '3', sex: 'male'},
        {first_name: 'Игорь', second_name: 'Прошутов', third_name: 'Павлович', group_id: '6', sex: 'male'},
        {first_name: 'Кирилл', second_name: 'Ивлеенко', third_name: 'Алексеевич', group_id: '2', sex: 'male'},
        {first_name: 'Дарья', second_name: 'Каримова', third_name: 'Иванова', group_id: '1', sex: 'female'},
        {first_name: 'Анастасия', second_name: 'Лексоменко', third_name: 'Максимовна', group_id: '2', sex: 'female'},
        {first_name: 'Владимир', second_name: 'Иванов', third_name: 'Олегович', group_id: '6', sex: 'male'},
        {first_name: 'Ольга', second_name: 'Федотова', third_name: 'Владимировна', group_id: '4', sex: 'female'},
        {first_name: 'Сергей', second_name: 'Алексеев', third_name: 'Артемович', group_id: '1', sex: 'male'},
      ]
    }
  },
  mounted: function() {
    this.$store.dispatch('GET_TASK', {params: {id: this.$route.params.id}});
    this.$socket.emit('join_task_page', {task_id: this.$route.params.id})
  },
  updated: function () {
    this.$socket.emit('join_task_page', {task_id: this.$route.params.id})
  }
}
</script>

<style scoped>

</style>