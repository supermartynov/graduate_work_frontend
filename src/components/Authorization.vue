<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="login">
                  <h1>{{ $t('authorization.login') }}</h1>
                  <p class="text-muted">{{ $t('authorization.enter-cred') }}</p>

                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text"
                                  v-model="form.email"
                                  class="form-control"
                                  :class="{'is-invalid': ($v.form.email.$dirty && !$v.form.email.required || $v.form.email.$dirty && !$v.form.email.email)}"
                                  v-bind:placeholder="$t('authorization.username')"
                                  autocomplete="username email" />
                    <small class="invalid-feedback" v-if="$v.form.email.$dirty && !$v.form.email.required || $v.form.email.$dirty && !$v.form.email.email">
                      {{ $t('authorization.incorrect-mail') }}
                    </small>
                  </b-input-group>

                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password"
                                  v-model="form.password"
                                  class="form-control"
                                  v-bind:placeholder="$t('authorization.password')"
                                  autocomplete="current-password" />
                  </b-input-group>

                  <b-input-group class="mb-4" v-if="show">
                    <small class="invalid-feedback d-block">
                      {{ $t('authorization.incorrect-cred') }}
                    </small>
                  </b-input-group>

                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="primary" class="px-4">{{ $t('authorization.login') }}</b-button>
                    </b-col>
                    <b-col cols="4" class="ml-auto mr-auto mt-auto ">
                      <router-link v-bind:to="`/` + $i18n.locale + `/topics`">{{ $t('registration.go-home') }}</router-link>
                    </b-col>
                  </b-row>
                </b-form>

                <b-card-footer class="mt-5 bg-white">
                  <b-row>
                    <b-col class="text-center mb-2">
                      {{ $t('authorization.login-with') }}
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
              <b-card-body class="text-center mt-3 ">
                <div>
                  <h2>{{ $t('authorization.already-auth') }}</h2>
                  <h5>{{ $t('authorization.start-today') }}</h5>
                  <router-link to="registration" >
                    <b-button size="lg" variant="secondary" class="mt-5">
                      {{ $t('authorization.register') }}
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
import {i18n} from "@/plugin/i18n";

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
            this.$store.commit('UPDATE_LOGIN', this.form.email)
            this.show = !this.show
        this.$router.push(`/${i18n.locale}/topics`)
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
