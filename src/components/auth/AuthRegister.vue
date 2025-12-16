<script>
import { Field as VeeField, Form as VeeForm } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'AuthRegister',
  components: {
    VeeForm,
    VeeField,
  },
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required('E-Mail Adresse wird benötigt')
        .trim()
        .email('Das ist keine gütige E-Mail Adresse'),
      password: yup
        .string()
        .required('Passwort wird benötigt')
        .trim()
        .min(6, 'Das Passwort muss mindestens 6 zeichen lang sein'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwörter stimmen nicht überein'),
    })
    return {
      schema,
    }
  },
  methods: {
    submitData(values) {
      console.log('values', values)
    },
  },
}
</script>

<template>
  <div>
    <div class="my-5 text-center offset-2 col-8">
      <img class="img-fluid" src="/src/assets/welcome.svg" alt="" />
    </div>
    <div class="text-center text-vue">
      <h2>Jetzt registrieren</h2>
      <p>oder <a class="text-vue2" href="/">melden Sie sich mit Ihrem Konto an</a></p>
    </div>
    <VeeForm @submit="submitData" :validation-schema="schema" v-slot="{ errors }">
      <div class="row needs-validation text-vue" novalidate>
        <!-- EMAIL -->
        <div class="mb-3 col-8 offset-2">
          <label class="form-label" for="email"><strong>E-Mail-Adresse</strong></label>
          <VeeField as="input" name="email" type="email" class="form-control" id="email" />
          <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>
        </div>
        <!-- PASSWORD -->
        <div class="mb-3 col-8 offset-2">
          <label class="form-label" for="password"><strong>Passwort</strong></label>
          <VeeField as="input" name="password" type="password" class="form-control" id="password" />
          <small class="text-danger" v-if="errors.password">{{ errors.password }}</small>
        </div>
        <!-- CONFORM PASSWORD -->
        <div class="mb-3 col-8 offset-2">
          <label class="form-label" for="confirmPassword"
            ><strong>Passwort wiederholen</strong></label
          >
          <VeeField
            as="input"
            name="confirmPassword"
            type="password"
            class="form-control"
            id="confirmPassword"
          />
          <small class="text-danger" v-if="errors.confirmPassword">{{
            errors.confirmPassword
          }}</small>
        </div>
        <!-- BUTTON -->
        <div class="mb-3 col-8 offset-2">
          <div class="d-grid">
            <button class="btn bg-vue">Registrieren</button>
          </div>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<style scoped></style>
