<template>
  <div>
    <div v-for="child in children">
      <div v-if="!child.children">
        <ReplyComment :message="child"/>
      </div>
      <div v-else>
        <tree-message :message="child"/>
      </div>
    </div>
  </div>
</template>

<script>
import TreeMessage from "@/components/TreeMessage";
import ReplyComment from "@/components/ReplyComment";

export default {
  name: "tree-children-message",
  props: ['children'],
  data: function () {
    return {
    }
  },
  components: {ReplyComment, TreeMessage},

}
</script>

<style scoped>

</style>