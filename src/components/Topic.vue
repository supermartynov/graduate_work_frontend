<template>
  <div className="animated fadeIn">
    <b-row>
      <b-col v-for="topic in get_topics" lg="4">
        <a v-bind:href="'#/' + $i18n.locale + '/tasks'">
          <b-card class="text-white bg-primary topics-cards">
              <div class="h2 m-0">{{topic.title}}</div>
              <div>{{topic.short_description}}</div>
              <b-progress height={} class="progress-white progress-xs my-3" :value=topic.id />
              <small class="text-muted">{{topic.description}}</small>
          </b-card>
        </a>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Topic",
  computed: {
    get_topics() {
      return this.$store.getters.ALL_TOPICS;
    }
  },
  mounted: function () {
    this.$store.dispatch('GET_TOPICS');
  }
}

</script>
