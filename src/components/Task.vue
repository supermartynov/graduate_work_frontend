<template>
  <div>
    <div className="animated fadeIn">
      <b-row class="pb-4">
        <b-col lg="4"></b-col>
        <b-col lg="4">
          <b-btn type="button" class="btn btn-block btn-square btn-success" v-b-modal.task-add-modal title="Add task">Create task</b-btn>
        </b-col>
      </b-row>

      <b-row v-for="task in get_tasks">
        <b-col lg="12">
          <a v-bind:href="'#/tasks/' + task.id">
            <b-card>
              <b-row>
                <b-col lg="9">
                  <div class="h2 m-0">{{task.title}}</div>
                  <div>
                    <span v-bind:class="{'text-success': task.difficulty_id === 1, 'text-warning': task.difficulty_id === 2, 'text-danger': task.difficulty_id === 3}">{{task.difficulty.title}}</span>
                    <span class="text-muted">, {{task.topic.title}}, Database: {{task.database.title}}</span>
                  </div>
                </b-col>
                <b-col lg="3">
                  <b-btn class="btn btn-block float-right" variant="outline-success" type="button">Solve task</b-btn>
                </b-col>
              </b-row>
            </b-card>
          </a>
        </b-col>
      </b-row>
    </div>
    <TaskAdd></TaskAdd>
  </div>
</template>

<script>
import TaskAdd from "@/components/TaskAdd";
import Chat from "@/components/Chat";
export default {
  name: "Task",
  components: {
    Chat,
    TaskAdd
  },
  data: function() {
    return {
      add_modal: false
    };
  },
  computed: {
    get_tasks() {
      return this.$store.getters.ALL_TASKS;
    }
  },
  mounted: function () {
    this.$store.dispatch('GET_TASKS');
  },
  methods: {

  }
}
</script>

<style scoped>

</style>