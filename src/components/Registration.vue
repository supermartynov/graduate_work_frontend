<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form @submit.prevent="register">
                <b-row>
                  <b-col md="9">
                    <h1>Регистрация</h1>
                  </b-col>
                  <b-col>
                    <router-link to="/"><p>На главную</p></router-link>
                  </b-col>
                </b-row>

                <p class="text-muted">Создайте аккаунт</p>

                <b-input-group id="email_input" class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text"
                                id="email"
                                v-model.trim="form.email"
                                :class="{'is-invalid': ($v.form.email.$dirty && !$v.form.email.required || $v.form.email.$dirty && !$v.form.email.email)}"
                                placeholder="Почта"
                                autocomplete="email" />
                  <small class="invalid-feedback" v-if="$v.form.email.$dirty && !$v.form.email.required || $v.form.email.$dirty && !$v.form.email.email">
                    Некорректный email
                  </small>
                  <small class="invalid-feedback d-block" v-else-if="alreadyTakenEmail">
                    Данная почта уже занята
                  </small>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password"
                                class="form-control"
                                v-model="form.password"
                                :class="{'is-invalid': ($v.form.password.$dirty && !$v.form.password.required) || ($v.form.password.$dirty && !$v.form.password.minLength)}"
                                placeholder="Пароль"
                                autocomplete="new-password"  />
                  <small class="invalid-feedback d-block" v-if="($v.form.password.$dirty && !$v.form.password.required) || ($v.form.password.$dirty && !$v.form.password.minLength)">
                    Минимальная длина пароля - {{ $v.form.password.$params.minLength.min }} символов
                  </small>
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" v-model="form.password_confirm" class="form-control" placeholder="Подтверждение пароля" autocomplete="new-password"/>
                  <small v-if="form.password !== form.password_confirm && $v.form.password_confirm.$dirty" class="invalid-feedback d-block">
                    Пароли не совпадают
                  </small>
                </b-input-group>
                <b-button type="submit" variant="success" block>Создать аккаунт</b-button>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {email, required, minLength} from 'vuelidate/lib/validators'
import axios from "../services/api";
export default {
  name: 'Register',
  mixins: [validationMixin,],
  data() {
    return {
      form: {
        password: '',
        email: '',
        password_confirm: ''
      },
      show: false,
      alreadyTakenEmail: false
    }
  },
  validations: {
    form: {
      password: {required, minLength: minLength(5)},
      email: {required, email},
      password_confirm: {required, minLength: minLength(5)},
    },
  },
  methods: {
    register()  {
      if (this.$v.$invalid || (this.form.password !== this.form.password_confirm && this.$v.form.password_confirm.$dirty)) {
        this.$v.$touch()
        return
      }
      axios.post("/registration", {
        password: this.form.password,
        email: this.form.email,
        password_confirm: this.form.password_confirm
      })
      .then(() => {
        this.$router.push("/authorization")
      })
      .catch(err => {
        if (err.response.request.status === 409) {
          this.alreadyTakenEmail = true;
        }
      })
    }
  },
}
</script>

