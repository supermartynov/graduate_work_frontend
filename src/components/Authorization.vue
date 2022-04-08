<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="login">
                  <h1>Вход</h1>
                  <p class="text-muted">Введите логин и пароль</p>

                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text"
                                  v-model="form.email"
                                  class="form-control"
                                  :class="{'is-invalid': ($v.form.email.$dirty && !$v.form.email.required || $v.form.email.$dirty && !$v.form.email.email)}"
                                  placeholder="Username"
                                  autocomplete="username email" />
                    <small class="invalid-feedback" v-if="$v.form.email.$dirty && !$v.form.email.required || $v.form.email.$dirty && !$v.form.email.email">
                      Некорректный email
                    </small>
                  </b-input-group>

                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password"
                                  v-model="form.password"
                                  class="form-control"
                                  placeholder="Password"
                                  autocomplete="current-password" />
                  </b-input-group>

                  <b-input-group class="mb-4" v-if="show">
                    <small class="invalid-feedback d-block">
                      Неверный логин или пароль
                    </small>
                  </b-input-group>

                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="primary" class="px-4">Войти</b-button>
                    </b-col>
                    <b-col cols="4" class="ml-auto mr-auto mt-auto ">
                      <router-link to="/">На главную</router-link>
                    </b-col>
                  </b-row>
                </b-form>

                <b-card-footer class="mt-5 bg-white">
                  <b-row>
                    <b-col class="text-center mb-2">
                      Войти с помощью:
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6" class="col-sm-6 col-md-6">
                      <b-button block class="btn btn-facebook"><span>facebook</span></b-button>
                    </b-col>
                    <b-col cols="6">
                      <b-button block class="btn btn-google-plus" @click="loginWithGoogle" type="button"><span>google</span></b-button>
                    </b-col>
                  </b-row>
                </b-card-footer>
              </b-card-body>

            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none col-md-6 col-sm-6">
              <b-card-body class="text-center">
                <div>
                  <h2>Не зарегистрированы?</h2>
                  <h5>Начните изучать SQL уже сегодня!</h5>
                  <router-link to="registration">
                    <b-button size="lg" variant="secondary">
                    Зарегистрироваться!
                    </b-button>
                  </router-link>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {email, required, minLength} from 'vuelidate/lib/validators'
import axios from "../services/api";
import Chat from "@/components/Chat";
import Task from "@/components/Task";

export default {
  name: 'Login',
  components: {Task, Chat},
  mixins: [validationMixin,],
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      show: false
    }
  },
  validations: {
    form: {
      email: {required, email},
      password: {required, minLength: minLength(5)}
    }
  },
  methods: {
    async login() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      axios.post("/login", {
        login: this.form.email,
        password: this.form.password
      }).then(() => {
            this.$store.commit('UPDATE_EMAIL', this.form.email)
            this.show = !this.show
            this.$router.push("/")
          })
          .catch(() => {
            this.$store.commit('UPDATE_EMAIL', this.form.email)
            this.show = true
          })
    },
    loginWithGoogle() {
      window.open("http://localhost:2000/google", "_self");
    }
  }
}
</script>
