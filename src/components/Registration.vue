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
                    <h1>{{ $t('registration.register') }}</h1>
                  </b-col>
                  <b-col>
                    <router-link v-bind:to="`/` + $i18n.locale + `/topics`"><p>{{ $t('registration.go-home') }}</p></router-link>
                  </b-col>

                </b-row>

                <p class="text-muted">{{ $t('registration.create-account') }}</p>

                <b-input-group id="email_input" class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text"
                                id="email"
                                v-model.trim="form.email"
                                :class="{'is-invalid': ($v.form.email.$dirty && !$v.form.email.required || $v.form.email.$dirty && !$v.form.email.email)}"
                                v-bind:placeholder="$t('registration.email')"
                                autocomplete="email" />
                  <small class="invalid-feedback" v-if="$v.form.email.$dirty && !$v.form.email.required || $v.form.email.$dirty && !$v.form.email.email">
                    {{ $t('registration.incorrect-mail') }}
                  </small>
                  <small class="invalid-feedback d-block" v-else-if="alreadyTakenEmail">
                    {{ $t('registration.already-busy-email') }}
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
                                v-bind:placeholder="$t('registration.password')"
                                autocomplete="new-password"  />
                  <small class="invalid-feedback d-block" v-if="($v.form.password.$dirty && !$v.form.password.required) || ($v.form.password.$dirty && !$v.form.password.minLength)">
                    {{ $t('registration.min-password-length') }} - {{ $v.form.password.$params.minLength.min }}
                  </small>
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" v-model="form.password_confirm" class="form-control" v-bind:placeholder="$t('registration.password-confirm')" autocomplete="new-password"/>
                  <small v-if="form.password !== form.password_confirm && $v.form.password_confirm.$dirty" class="invalid-feedback d-block">
                    {{ $t('registration.different-password') }}
                  </small>
                </b-input-group>
                <b-button type="submit" variant="success" block>
                  {{ $t('registration.create-account') }}
                </b-button>
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
import {i18n} from '../plugin/i18n';
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
        this.$router.push(`/${i18n.locale}/authorization`)
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

