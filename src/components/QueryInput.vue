<template>
  <div class="relative">
    <b-card-body>
      <b-row>
        <b-col cols="10">
          <HighlightableInput
              style="min-height:55px; max-height: 150px; text-indent: 20px;"
              class="w-100 border-danger font-size-2 text-left bg-light"
              highlight-style="background-color:yellow"
              :highlight-enabled="highlightEnabled"
              :highlight="highlight"
              v-model="sql_answer"
              aria-placeholder="Enter the your query on SQL"
          />
        </b-col>
        <b-col cols="2" order="2">
          <b-form-select  style="width: 120px; margin-top: -50px; margin-left: -70px"
                         class="ml-n-4 mt-n-5"
                         v-if="!(hints.length === 0) && selected_hint === ''"
                         v-model="selected_hint"
                         :options="hints"
                         :select-size="hints.length"/>
        </b-col>
      </b-row>
      <b-row style="width: 100%">
        <b-col cols="10">

        </b-col>
        <b-col cols="2">

        </b-col>
      </b-row>
<!--      <section>
        <b-field>
          <b-select
              style="width: 20%"
              :input="this.hints"
              multiple
              native-size="8"
              v-model="selectedOptions">
            <option value="flint">Flint</option>
            <option value="silver">Silver</option>
            <option value="vane">Vane</option>
            <option value="billy">Billy</option>
            <option value="jack">Jack</option>
            <option value="heisenberg">Heisenberg</option>
            <option value="jesse">Jesse</option>
            <option value="saul">Saul</option>
            <option value="mike">Mike</option>
          </b-select>
        </b-field>
      </section>-->
      <!--v-b-tooltip.top.html="tipMethod"-->
      <!--<b-form-textarea v-model="sql_answer" placeholder="Enter the your query on SQL"></b-form-textarea-->
    </b-card-body>
    <footer>
      <b-btn type="button" class="btn btn-success float-right" @click="check_field">Send answer</b-btn>
      <b-btn type="button" variant="primary" class="btn btn-primary float-right mr-1">Execute</b-btn>
    </footer>
    {{selected}}
    {{ mistake_message }}
    <br>
    {{selected_hint}}


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
      hints: [],
      selected_hint: "",
      selected: [],
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
      this.selected_hint = ""
      let query_arr = this.sql_answer.trim().replace(/\s+/g, ' ').split(/[ ,]+/)
      console.log(query_arr)
      if (query_arr[query_arr.length - 1].includes("\.") &&
          query_arr[query_arr.length - 1].indexOf("\.") === query_arr[query_arr.length - 1].length - 1
      )
      {
        let target_table = query_arr[query_arr.length - 1].split("\.")[0];
        if (target_table.trim() !== "") {
          let find_table_flag = false
          for (let table of this.tables) {
            if (target_table.toLowerCase() === table.title) {
              find_table_flag = true
              target_table = table
              break
            }
          }
          console.log(find_table_flag)
          if (find_table_flag) {
            this.hints = target_table.fields
            return
          }
        }
      }
      this.hints = []
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
  },

  /*computed: {
    tipMethod() {
      if (this.hints.length === 0) {
        return null
      }
      let options = ""
      for (let hint of this.hints) {
        options += ` <option>` + hint + `</option>`
      }
      let html_tags = `<b-field> <b-select native-size="${this.hints.length}">` + options +` </b-select></b-field>`

      return html_tags
    }
  }}*/
}
</script>

<style scoped>

</style>