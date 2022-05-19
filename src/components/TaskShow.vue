<template>
  <div>
    <b-row>
      <b-col lg="6">
        <b-card>
          <b-card-header class="h4">
            Your query:
          </b-card-header>
          <QueryInput/>
        </b-card>
      </b-col>
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
      <!--<b-col lg="6">
        <b-card>
          <b-card-header class="h4">
            {{'ERD diagram of the database ' + get_task.database.title}}
          </b-card-header>
          <b-card-body>
            <img style="height: 500px; width: 676px;" src="img/databases/university.png" alt="Database image">
          </b-card-body>
        </b-card>
      </b-col>-->
      <b-col lg="12" >
        <b-card>
          <div slot="header"> <!--v-html="caption"-->  </div>
          <b-table bordered="bordered" fixed="fixed" :fields="fields" :items="items">
          </b-table>
          <nav>
            <b-pagination prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
          </nav>
        </b-card>
      </b-col>
    </b-row>
    <Chat :task_id="this.$route.params.id"/>
  </div>
</template>

<script>
import Chat from "@/components/Chat";
import HighlightableInput from "vue-highlightable-input"
import QueryInput from "@/components/QueryInput";

export default {
  name: "TaskShow",
  components: {QueryInput, Chat, HighlightableInput},
  data: function() {
    return {
      tables: [
        {
          title: 'students',

        }
      ]
    }
  },
  computed: {
    get_task() {
      return this.$store.getters.ONE_TASK;
    },
    items: function() {
      return [
        {first_name: '*', second_name: '*', third_name: '*', group_id: '*', sex: '*',},
        /*{first_name: 'Игорь', second_name: 'Прошутов', third_name: 'Павлович', group_id: '6', sex: 'male'},
        {first_name: 'Кирилл', second_name: 'Ивлеенко', third_name: 'Алексеевич', group_id: '2', sex: 'male'},
        {first_name: 'Дарья', second_name: 'Каримова', third_name: 'Иванова', group_id: '1', sex: 'female'},
        {first_name: 'Анастасия', second_name: 'Лексоменко', third_name: 'Максимовна', group_id: '2', sex: 'female'},
        {first_name: 'Владимир', second_name: 'Иванов', third_name: 'Олегович', group_id: '6', sex: 'male'},
        {first_name: 'Ольга', second_name: 'Федотова', third_name: 'Владимировна', group_id: '4', sex: 'female'},
        {first_name: 'Сергей', second_name: 'Алексеев', third_name: 'Артемович', group_id: '1', sex: 'male'},*/
      ]
    },
    fields: function () {
      return [
        {
          key: 'first_name',
          label: 'first_name'
        },
        {
          key: 'second_name',
          label: 'second_name'
        },
        {
          key: 'third_name',
          label: 'third_name'
        },
        {
          key: 'group_id',
          label: 'group_id'
        },
        {
          key: 'sex',
          label: 'sex'
        }
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