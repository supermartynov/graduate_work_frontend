<template>
  <div>
    <b-modal v-model="show" id="task-add-modal" size="lg">
      <template v-slot:modal-title>
        Create new task
      </template>
      <form @submit.prevent="add">
        <b-row>
          <b-col sm="12">
            <b-form-group>
              <label for="topic_id">Topic:</label>
              <b-form-select v-model="task.topic" id="topic_id" placeholder="Select the topic"
                             :plain="true">
                <option v-for="topic in get_topics" v-bind:value="topic.id">{{topic.title}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <b-form-group>
              <label for="database_id">Database:</label>
              <b-form-select v-model="task.database" id="database_id" placeholder="Select the database"
                             :plain="true">
                <option v-for="database in get_databases" v-bind:value="database.id">{{database.title}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <b-form-group>
              <label for="title">Title:</label>
              <b-form-input v-model="task.title" type="text" id="title" placeholder="Enter the title of the task"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <b-form-group>
              <label for="difficulty">Difficulty:</label>
              <b-form-select v-model="task.difficulty" id="difficulty" placeholder="Select the difficulty"
                             :plain="true">
                <option v-for="difficulty in get_difficulties" v-bind:value="difficulty.id">{{difficulty.title}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <b-form-group>
              <label for="description">Description:</label>
              <b-form-textarea v-model="task.description" id="description" placeholder="Enter the description of the task"></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <b-form-group>
              <label for="answer">Right answer:</label>
              <b-form-textarea v-model="task.answer" id="answer" placeholder="Enter the answer to the task"></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <b-form-group>
              <label for="helper">Hints (optional):</label>
              <b-form-textarea v-model="task.helper" id="help" placeholder="Enter hints to the task"></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
      </form>
      <template v-slot:modal-footer>
        <b-btn type="button" class="btn btn-secondary float-right" @click="show = false">Close</b-btn>
        <b-btn type="submit" class="btn btn-success float-right" @click="add()">Create</b-btn>
      </template>
    </b-modal>
    <b-modal v-model="show_notification" id="task-notification-modal" size="sm">
      <template v-slot:modal-title>
        {{notification_header}}
      </template>
      {{notification_body}}
      <template v-slot:modal-footer>
        <b-btn v-if="success_notification === false" type="button" class="btn btn-danger float-right" @click="show_notification = false">Ok</b-btn>
        <b-btn v-if="success_notification === true" type="button" class="btn btn-success float-right" @click="$router.go(0)">Ok</b-btn>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "TaskAdd",
  data: function() {
    return {
      show: false,
      show_notification: false,
      notification_header: '',
      notification_body: '',
      success_notification: null,
      task: {
        title: null,
        topic: null,
        database: null,
        description: null,
        answer: null,
        helper: null,
        difficulty: null
      }
    }
  },
  mounted: function() {
    this.$store.dispatch('GET_TOPICS');
    this.$store.dispatch('GET_DATABASES');
    this.$store.dispatch('GET_DIFFICULTIES');
  },
  computed: {
    get_topics() {
      return this.$store.getters.ALL_TOPICS;
    },
    get_databases() {
      return this.$store.getters.ALL_DATABASES;
    },
    get_difficulties() {
      return this.$store.getters.ALL_DIFFICULTIES;
    }
  },
  methods: {
    add: function() {
      var self = this;
      return this.$store.dispatch('ADD_TASK', this.task).then(function(res) {
        if (res.data.success) {
          self.notification_header = 'Success';
          self.notification_body = 'Task \"' + res.data.title + '\" has been created!';
          self.success_notification = true;
        } else {
          self.notification_header = 'Error';
          self.notification_body = 'Your task has not been created!';
          self.success_notification = false;
        }
        self.show_notification = true;
      })
    }
  }
}
</script>

<style scoped>

</style>