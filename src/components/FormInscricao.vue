<template>
  <!-- fomulario de inscrição com validação, nome, email, telefone, data de nascimento, cidade, igreja, tem alguma restrição alimentar, observação que devamos star_border atentos, botão de enviar e botão de cancelar -->

    <div class="flex flex-col items-center justify-center w-full px-10">
      <q-form ref="form" class="q-gutter-md w-full">
        <q-input
          v-model="name"
          label="Nome"
          filled
          lazy-rules
          :rules="[ val => !!val || 'Nome é obrigatório' ]"
        />
        <q-input
          v-model="email"
          label="Email"
          filled
          lazy-rules
          :rules="[ val => !!val || 'Email é obrigatório' ]"
        />
        <q-input
          v-model="phone"
          label="Telefone"
          filled
          lazy-rules
          :rules="[ val => !!val || 'Telefone é obrigatório' ]"
        />
        <q-input
          v-model="birthDate"
          label="Data de nascimento"
          mask="##/##/####"
          id="nascimento"
          filled
          lazy-rules
          :rules="[ val => !!val || 'Data de nascimento é obrigatório' ]"
        />

        <q-input
          v-model="city"
          label="Cidade"
          filled
          lazy-rules
          :rules="[ val => !!val || 'Cidade é obrigatório' ]"
        />
        <q-input
          v-model="church"
          label="Igreja"
          filled
          lazy-rules
          :rules="[ val => !!val || 'Igreja é obrigatório' ]"
        />
        <q-input
          v-model="restriction"
          label="Tem alguma restrição alimentar?"
          filled
          lazy-rules
          :rules="[ val => !!val || 'Restrição alimentar é obrigatório' ]"
        />
        <q-input
          v-model="observation"
          label="Observação"
          type="textarea"
          filled
          lazy-rules
          :rules="[ val => !!val || 'Observação é obrigatório' ]"
        />
        <div class="flex gap-4 mt-10">
          <q-btn
            class="bg-sky-600 text-white px-6 py-4"
            label="Enviar"
            @click="sendForm()"
          />
          <q-btn
            class="bg-gray-700
            text-white px-6 py-4"
            label="Cancelar"
            @click="$refs.form.reset()"
          />
        </div>
      </q-form>
    </div>

</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      city: '',
      church: '',
      restriction: '',
      observation: '',
      date: '01/01/2000'
    }
  },
  methods: {
    sendForm () {
      // validate form for ref form
      if (this.$refs.form.validate()) {
        // send form
        console.log('send form')
      }
      // send form
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
