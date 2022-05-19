<template>
  <div class="relative">
    <b-card-body>
      {{ mistake_message }}
      <br>
      {{hint}}
      <HighlightableInput
          v-b-tooltip.hover.top.html="tipMethod"
          style="min-height:55px; max-height: 150px; text-indent: 20px;"
          class="w-100 border-danger font-size-2 text-left bg-light"
          highlight-style="background-color:yellow"
          :highlight-enabled="highlightEnabled"
          :highlight="highlight"
          v-model="sql_answer"
          aria-placeholder="Enter the your query on SQL"
      />
      <!--<b-form-textarea v-model="sql_answer" placeholder="Enter the your query on SQL"></b-form-textarea-->
    </b-card-body>
    <footer>
      <b-btn type="button" class="btn btn-success float-right" @click="check_field">Send answer</b-btn>
      <b-btn type="button" variant="primary" class="btn btn-primary float-right mr-1">Execute</b-btn>
    </footer>


  </div>
</template>

<script>
import HighlightableInput from "vue-highlightable-input";

export default {
  name: "QueryInput",
  components: {HighlightableInput},
  data: function () {
    return {
      show: true,
      sql_answer: "",
      wordsArr: [],
      mistake_message: "",
      hint: [],
      target_table: "",
      highlight: [
        {text: 'select', style: "color:#001180; font-weight: 550;"},
        {text: 'from', style: "color:#001180; font-weight: 550;"},
        {text: 'table', style: "color:#001180; font-weight: 550;"},
        {text: '*', style: "color:#001180; font-weight: 550;"},
        {text: 'WHERE', style: "color:#001180; font-weight: 550;"},
        "table",
      ],
      highlightEnabled: true,
      tables: [
        {
          title: "students",
          fields: ["first_name", "second_name", "third_name", "group_id", "sex"]
        }
      ]
    }
  },
  watch: {
    sql_answer: function () {
      let query_arr = this.sql_answer.split(/[ ,]+/)
      if (query_arr[query_arr.length - 1].includes("\.")) {
        let target_table = query_arr[query_arr.length - 1].split("\.")[0];
        if (target_table.trim() !== "") {
          let find_table_flag = false
          for (let table of this.tables) {
            if (target_table === table.title) {
              find_table_flag = true
              target_table = table
              break
            }
          }
          console.log(find_table_flag)
          if (find_table_flag) {
            this.hint = target_table.fields
          }
        }
      } else {
        this.hint = []
      }
    }
  },
  //select one, two, three from tabletka
  methods: {
    check_field: function () {
      let query_str = this.sql_answer.trim().replace(/\s+/g, ' ').toUpperCase()
      if (query_str.includes("SELECT")) {
        if (!query_str.includes("FROM")) {
          this.mistake_message = "Невалидный запрос"
          return;
        }
        let select_array = query_str.trim().split(/[ ,><=]+/);
        let target_table = select_array[select_array.indexOf("FROM") + 1]
        let find_table_flag = false
        for (let table of this.tables) {
          if (target_table === table.title.toUpperCase()) {
            find_table_flag = true
            target_table = table
            break
          }
        }
        if (find_table_flag === false) {
          this.mistake_message = `Таблицы ${target_table} не существует`
          return
        } else {
          this.mistake_message = ''
        }

        if (!query_str.includes("\*")) {
          let select_sub_array = select_array.slice(select_array.indexOf("SELECT") + 1, select_array.indexOf("FROM"))
          for (let selected_field of select_sub_array) {
            if (!target_table.fields.includes(selected_field.toLowerCase())) {
              this.mistake_message = `В таблице ${target_table.title} отсутствует поле ${selected_field}`
              break
            }
          }
          //select sex from students where a>6
         /* console.log(select_array)
          if (query_str.includes("WHERE") && !query_str.includes("\.")) {
            let select_array = query_str.replace("AND", " ").replace("OR", " ").trim().split(/[ ,><=]+/);
            let select_sub_array = select_array.slice(select_array.indexOf("WHERE") + 1, select_array.length)
            for (let i = 0; i < select_sub_array.length - 1; i++) {
              if (!target_table.fields.includes(select_sub_array[i].toLowerCase()) && i % 2 === 0) {
                this.mistake_message = `В таблице ${target_table.title} отсутствует поле ${select_sub_array[i]}`
                break
              }
            }
          }*/
        }
      }
    },
    check_table_exists: function () {

    }
  },
  computed: {
    tipMethod() {
      return '<strong>' + new Date() + '</strong>'
    }
  }
}
</script>

<style scoped>

</style>