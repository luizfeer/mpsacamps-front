<template>

<div class="flex flex-col items-center justify-center w-full px-1 z-10">
    <div v-if="loading" class="flex flex-col items-center justify-center w-full h-full">
        <q-spinner-bars color="white" size="4em" />
    </div>
    <div v-else-if="listaEspera">
        <div class="text-xl text-center text-white">
            Você está na lista de espera
        </div>
        <div class="text-lg text-center text-white">
          <div class="p-6">
          <p class="mb-4">Prezado(a) <span class="font-bold">{{ user.name }}</span>,</p>
          <p class="mb-4">Gostaríamos de informar que sua inscrição no <span class="font-bold">MPS2024</span> foi registrada com sucesso, mas no momento todas as vagas já foram preenchidas e sua inscrição ficará na lista de espera.</p>
          <p class="mb-4">Não se preocupe, caso haja alguma desistência ou surgimento de novas vagas, entraremos em contato com você o mais breve possível para confirmar sua inscrição.</p>
          <p class="mb-4">Agradecemos pelo seu interesse e aguardamos a oportunidade de tê-lo(a) conosco neste evento.</p>
          <p class="mt-4">Atenciosamente,</p>
        </div>
        </div>

    </div>

    <q-form v-else @submit.prevent="onSubmit" ref="form" class="q-gutter-md w-full">
        <!-- title 'Atualize seus dados' -->
        <div class="text-h5 text-center text-white">
            {{ userExists ? 'Revise e edite seus dados' : 'Cadastre-se' }}
        </div>
        <div>
            <q-chip v-if="senhaValidada" class="bg-blue-500 text-white" label="Incrição como equipe" />

        </div>
        <div class="border border-gray-700 p-1 md:p-2 rounded-md">
        <div class="col-12 row">
          <div class="p-4 col-12 col-md-6">
              <q-input label-color="white" v-model="user.name" label="Nome" filled dark standout lazy-rules :rules="[ val => !!val || 'Nome é obrigatório' ]" />
          </div>
           <div  class="p-4 col-12 col-sm-6">
              <q-input v-model="user.cpf" label="Seu CPF" unmasked-value mask="###.###.###-##" filled label-color="white" dark lazy-rules :rules="[ val => !!val || 'CPF é obrigatório' ]" />
          </div>

        </div>
        <div class="col-12 row">
          <div class="p-4 col-12 col-md-6">
              <q-input v-model="user.cellJunto" label="Telefone" mask="(##) #####-####" placeholder="(XX) XXXXX-XXXX" filled label-color="white" dark lazy-rules :rules="[ val => !!val || 'Telefone é obrigatório' ]" />
          </div>
          <div class="p-4 col-12 col-md-6">
              <q-select v-model="user.genero" filled color="blue" class="mb-5" dark label="Gênero"  emit-value :options="[
              { label: 'Feminino', value: 'feminino' },
              { label: 'Masculino', value: 'masculino' },
            ]" />
          </div>
          </div>
          <div class ="col-12 row">
            <div class="p-4 col-12 col-md-6">
              <q-input v-model="user.data_nasc" label="Data de Nascimento" mask="##/##/####" filled label-color="white" dark lazy-rules :rules="[ val => !!val || 'Data de Nascimento é obrigatório' ]" />
            </div>
          <div class="p-4 col-12 col-md-6">
            <q-input v-model="user.idade" label="Idade" mask="###" filled label-color="white" dark lazy-rules :rules="[ val => !!val || 'Idade é obrigatório' ]" />
          </div>
        </div>
        </div>
        <!-- <div class="col-12 row border border-gray-700 p-1 md:p-2 rounded-md" >

          <div  class="p-4 col-12 col-sm-4">
              <q-input v-model="user.responsavel" label="Nome do Responsável" filled label-color="white" dark lazy-rules :rules="[val => !!val || 'Nome do Responsável é obrigatório' ]" />
          </div>
          <div class="p-4 col-12 col-sm-4">
              <q-input v-model="user.cellResponsavelJunto" label="Telefone do Responsável" mask="(##) #####-####" filled label-color="white" dark lazy-rules :rules="[val => !!val || 'Telefone do Responsável é obrigatório' ]" />
          </div>
          <div class="p-4 col-12 col-sm-4">
              <q-input v-model="user.documento_responsavel" label="CPF do Responsável" unmasked-value mask="###.###.###-##" filled label-color="white" dark lazy-rules :rules="[val => !!val || 'CPF do Responsável é obrigatório' ]" />
          </div>
          <q-chip class="bg-gray-500 text-white ml-4 ">
            <q-icon color="white" /> <span class="text-white ml-1"> Sim, o responsável é obrigatório para todos.</span>
          </q-chip>
        </div> -->

        <div class="col-12 row  border border-gray-700 p-1 md:p-2 rounded-md">
          <div class="p-4 col-12 col-md-6">
            <q-select
              filled
              color="blue"
              v-model="user.church"
              use-input
              hide-selected
              label="Igreja"
              dark
              emit-value
              clearable
              id=" church"
              fill-input
              input-debounce="500"
              :options="churchs"
              @filter="filterFn"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Nem todas as igrejas estão listadas, selecione 'Outra não listada' e informe o nome da sua igreja.
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

          </div>
          <div class="p-4 col-12 col-md-6" v-if="user.church === 'Outra não listada'">
              <q-input v-model="user.churchText" label="Qual Igreja?" filled label-color="white" dark lazy-rules :rules="user.church === 'Outra não listada' ? [ val => !!val || 'Igreja é obrigatório' ] : []" />
          </div>
          <!-- <div class="p-4 col-12 col-md-6">
              <q-input v-model="user.pastor" label="Nome do seu Pastor" filled label-color="white" dark lazy-rules :rules="[ val => !!val || 'Pastor é obrigatório' ]" />
            </div> -->
         </div>
         <div class="col-12 row border border-gray-700 p-1 md:p-2 rounded-md" >
        <div class="col-12 row">
            <div class="p-4 col-12 col-md-6">
                <q-input v-model="user.address" placeholder="Rua América, 100" label="Endereço" filled label-color="white" dark lazy-rules :rules="[ val => !!val || 'Endereço é obrigatório' ]" />
            </div>
            <div class="p-4 col-12 col-md-6">

                <q-input v-model="user.cep" label="CEP" unmasked-value mask="#####-###" filled label-color="white" dark lazy-rules :rules="[ val => !!val || 'CEP é obrigatório' ]" />
            </div>
        </div>
        <div class="col-12 row">
            <div class="p-4 col-12 col-sm-4">
                <q-input v-model="user.complemento" label="Complemento" filled label-color="white" dark lazy-rules />
            </div>
            <div class="p-4 col-12 col-sm-4">
                <q-input v-model="user.cidade" label="Cidade" filled label-color="white" dark lazy-rules :rules="[ val => !!val || 'Cidade é obrigatório' ]" />
            </div>
            <div class="p-4 col-12 col-sm-4">
                <!-- q-select to states -->
                <q-select v-model="user.estado" filled color="blue" class="mb-5" dark label="Estado" :options="states"  emit-value />
            </div>
        </div>
        </div>
        <div class=" border border-gray-700 p-1 md:p-2 rounded-md">
          <div class="row">
            <div class="col-12">
              <q-checkbox v-model="cupom" label="Tenho um cupom de desconto" color="blue" dark />
                </div>
            </div>

          <div class="row" v-if="cupom" >
            <div class="col-12">
              <q-input v-model="user.cupom" label="Cupom de desconto" filled label-color="white" dark lazy-rules :rules="cupom ? [ val => !!val || 'Cupom é obrigatório' ] : []" v-if="cupom" />
              </div>
          </div>

         </div>
        <!-- <div class="col-12 row border border-gray-700 p-1 md:p-2 rounded-md">
            <div class="p-4 col-12 col-md-4">
                <q-input v-model="user.alergia" label="Tem alergia ou restrição alimentar?" filled label-color="white" dark lazy-rules  />
            </div>
            <div class="p-4 col-12 col-md-4">
                <q-input v-model="user.medicamento" label="Toma algum medicamento?" filled label-color="white" dark lazy-rules />
            </div>
            <div class="p-4 col-12 col-md-4">
                <q-input v-model="user.info_add" label="Alguma coisa que precisamos saber?" filled label-color="white" dark lazy-rules />
            </div>
        </div> -->

        <!-- v-for to show erros in message -->
        <div v-if="msg && msg.length > 0" class="col-12 row">
            <div class="p-4 col-12">
                <q-card class="bg-red-9 text-white">
                    <q-card-section>
                        <div class="text-subtitle2">
                            <ul>
                                <li v-for="m in msg" :key="m">
                                  <q-icon name="error" />
                                  {{ m }}
                                </li>
                            </ul>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="w-full m-auto lg:max-w-32 p-5">
          <q-btn class=" bg-purple-900 hover:bg-purple-700 rounded-lg py-3  w-full block" label="Salvar" @click="onSubmit" type="submit" />
        </div>

    </q-form>

</div>

</template>

<script>
import {
  useQuasar
} from 'quasar'
import {
  ref,
  onMounted,
  watch
  , toRefs
} from 'vue'
import {
  api
} from 'boot/axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'
export default {
  name: 'FormUser',
  props: {
    senhaValidada: {
      type: Boolean,
      default: false
    }
  },

  setup (props, { emit }) {
    const $q = useQuasar()
    const msg = ref([])
    const ageMask = [/\d/, /\d/, /\d/]
    const form = ref(null)
    const disable = ref(true)
    const store = useUserStore()
    const { senhaValidada } = toRefs(props)

    const { user, userExists, loading } = storeToRefs(store)
    const listaEspera = ref(false)
    watch(
      () => user.value.church,
      (church) => {
        console.log('church', church)
        if (church === 'Outra não listada') {
          user.value.churchText = ''
        }
      }
    )
    watch(
      () => user.value.data_nasc,
      (dataNasc) => {
        if (dataNasc && dataNasc.length === 10) {
          const [day, month, year] = dataNasc.split('/')
          const data = new Date(`${year}-${month}-${day}`)
          const ano = data.getFullYear()
          const mes = data.getMonth() + 1
          const dia = data.getDate()
          const dataAtual = new Date()
          const anoAtual = dataAtual.getFullYear()
          const mesAtual = dataAtual.getMonth() + 1
          const diaAtual = dataAtual.getDate()
          let idade = anoAtual - ano
          if (mesAtual < mes || (mesAtual === mes && diaAtual < dia)) {
            idade--
          }
          user.value.idade = idade
        }
      })
    const validateForm = () => {
      const requiredFields = [
        'name',
        'data_nasc',
        'idade',
        'cpf',
        'address',
        'cep',
        'cidade',
        'estado',
        'church',
        // 'pastor',
        // 'documento_responsavel',
        // 'responsavel',
        // 'cellResponsavelJunto',
        'cellJunto'
        // 'alergia',
        // 'medicamento',
        // 'info_add'
      ]
      const namesPt = {
        name: 'Nome',
        data_nasc: 'Data de Nascimento',
        idade: 'Idade',
        cpf: 'CPF',
        address: 'Endereço',
        cep: 'CEP',
        cidade: 'Cidade',
        estado: 'Estado',
        church: 'Igreja',
        pastor: 'Pastor',
        documento_responsavel: 'CPF do Responsável',
        responsavel: 'Nome do Responsável',
        cellResponsavelJunto: 'Celular do Responsável',
        cellJunto: 'Celular',
        alergia: 'Alergia',
        medicamento: 'Medicamento',
        info_add: 'Informações adicionais'
      }

      const errors = []
      msg.value = []
      console.log(user.value)

      requiredFields.forEach(field => {
        if (!user.value[field]) {
          // errors.push(`O campo ${field} é obrigatório`)
          errors.push(`O campo '${namesPt[field]}' é obrigatório`)
        }
      })
      if (errors.length > 0) {
        msg.value = errors
        return false
      }
      return true
    }
    const onSubmit = async () => {
      console.log('onSubmit', user.value)
      loading.value = true
      const val = validateForm()
      if (!val) {
        loading.value = false
        return
      }
      separaDDD(user.value.cellJunto)
      user.value.cep = user.value.cep.replace('-', '')
      user.value.cpf = user.value.cpf.replace('.', '').replace('.', '').replace('-', '')

      user.value.documento_responsavel = user.value.documento_responsavel.replace('.', '').replace('.', '').replace('-', '')
      // user.value.ddd = user.value.cellResponsavelJunto.substring(1, 3)
      // user.value.cellphone_responsavel = user.value.cellResponsavelJunto.substring(5, 16)
      // user.value.ddd_responsavel = user.value.cellResponsavelJunto.substring(1, 3)
      if (user.value.church === 'Outra não listada') {
        user.value.church = `Outra não listada: ${user.value.churchText}`
      }

      if (userExists.value) {
        await updateUser()
      } else {
        await createUser()
      }
    }
    const updateUser = async () => {
      try {
        const payload = {
          name: user.value.name,
          church: user.value.church,
          cellphone: user.value.cellphone,
          genero: user.value.genero,
          cep: user.value.cep,
          cpf: user.value.cpf,
          idade: user.value.idade,
          responsavel: user.value.responsavel,
          documento_responsavel: user.value.documento_responsavel,
          // ddd_responsavel: user.value.ddd_responsavel,
          // cellphone_responsavel: user.value.cellphone_responsavel,
          address: user.value.address,
          complemento: user.value.complemento,
          cidade: user.value.cidade,
          estado: user.value.estado,
          ddd: user.value.ddd,
          equipe: user.value.equipe,
          alergia: user.value.alergia,
          medicamento: user.value.medicamento,
          info_add: user.value.info_add,
          data_nasc: user.value.data_nasc,
          pastor: user.value.pastor,
          cupom: user.value.cupom
        }
        const { data } = await api.post('/update-user', {
          collection: 'Users',
          data: {
            ...payload
          }
        })

        $q.notify({
          message: 'Usuário atualizado com sucesso',
          color: 'green-4',
          textColor: 'white',
          icon: 'check',
          position: 'top'
        })
        if (data.listaEspera) {
          listaEspera.value = true
          $q.notify({
            message: 'Você está na lista de espera',
            color: 'orange-4',
            textColor: 'white',
            icon: 'warning',
            position: 'top'
          })
        } else {
          emit('userCreated', true)
        }
      } catch (error) {
        console.log(error)
        if (error.response) {
          console.log(error.response.data)
          msg.value = error.response.data.message
        }
        $q.notify({
          message: 'Erro ao atualizar usuário',
          color: 'red-4',
          textColor: 'white',
          icon: 'warning',
          position: 'top'
        })
      } finally {
        loading.value = false
      }
    }
    const createUser = async () => {
      try {
        const { data } = await api.post('/create-user', {
          collection: 'Users',
          data: {
            name: user.value.name,
            church: user.value.church,
            cellphone: user.value.cellphone,
            genero: user.value.genero,
            cep: user.value.cep,
            cpf: user.value.cpf,
            idade: user.value.idade,
            responsavel: user.value.responsavel,
            documento_responsavel: user.value.documento_responsavel,
            // ddd_responsavel: user.value.ddd_responsavel,
            // cellphone_responsavel: user.value.cellphone_responsavel,
            address: user.value.address,
            complemento: user.value.complemento,
            cidade: user.value.cidade,
            estado: user.value.estado,
            ddd: user.value.ddd,
            equipe: user.value.equipe,
            alergia: user.value.alergia,
            medicamento: user.value.medicamento,
            info_add: user.value.info_add,
            data_nasc: user.value.data_nasc,
            pastor: user.value.pastor,
            cupom: user.value.cupom
          }
        })
        if (data.listaEspera) {
          listaEspera.value = true
          $q.notify({
            message: 'Você está na lista de espera',
            color: 'orange-4',
            textColor: 'white',
            icon: 'warning',
            position: 'top'
          })
        } else {
          emit('userCreated', true)

          $q.notify({
            message: 'Usuário cadastrado com sucesso',
            color: 'green-4',
            textColor: 'white',
            icon: 'check',
            position: 'top'
          })
        }
      } catch (error) {
        console.log(error)
        if (error.response) {
          console.log(error.response.data)
          msg.value = error.response.data.message
        }
        $q.notify({
          message: 'Erro ao cadastrar usuário',
          color: 'red-4',
          textColor: 'white',
          icon: 'warning',
          position: 'top'
        })
      } finally {
        loading.value = false
      }
    }
    const separaDDD = (value) => {
      // separa o DDD do número do telefone (11) 99999-9999
      console.log(value)
      user.value.ddd = value.substring(1, 3)
      user.value.cellphone = value.substring(5, 16)
      user.value.cellphone = user.value.cellphone.replace('-', '')
    }

    onMounted(async () => {
      // get params from url

      await store.getUserContext()
      user.value.equipe = senhaValidada.value

      console.log('dsfsdf', senhaValidada.value)
      console.log('mount', user.value)
      if (user.value.listaEspera) {
        listaEspera.value = true
      }
    })

    const states = ref([{
      label: 'Acre',
      value: 'AC'
    },
    {
      label: 'Alagoas',
      value: 'AL'
    },
    {
      label: 'Amapá',
      value: 'AP'
    },
    {
      label: 'Amazonas',
      value: 'AM'
    },
    {
      label: 'Bahia',
      value: 'BA'
    },
    {
      label: 'Ceará',
      value: 'CE'
    },
    {
      label: 'Distrito Federal',
      value: 'DF'
    },
    {
      label: 'Espírito Santo',
      value: 'ES'
    },
    {
      label: 'Goiás',
      value: 'GO'
    },
    {
      label: 'Maranhão',
      value: 'MA'
    },
    {
      label: 'Mato Grosso',
      value: 'MT'
    },
    {
      label: 'Mato Grosso do Sul',
      value: 'MS'
    },
    {
      label: 'Minas Gerais',
      value: 'MG'
    },
    {
      label: 'Pará',
      value: 'PA'
    },
    {
      label: 'Paraíba',
      value: 'PB'
    },
    {
      label: 'Paraná',
      value: 'PR'
    },
    {
      label: 'Pernambuco',
      value: 'PE'
    },
    {
      label: 'Piauí',
      value: 'PI'
    },
    {
      label: 'Rio de Janeiro',
      value: 'RJ'
    },
    {
      label: 'Rio Grande do Norte',
      value: 'RN'
    },
    {
      label: 'Rio Grande do Sul',
      value: 'RS'
    },
    {
      label: 'Rondônia',
      value: 'RO'
    },
    {
      label: 'Roraima',
      value: 'RR'
    },
    {
      label: 'Santa Catarina',
      value: 'SC'
    },
    {
      label: 'São Paulo',
      value: 'SP'
    },
    {
      label: 'Sergipe',
      value: 'SE'
    },
    {
      label: 'Tocantins',
      value: 'TO'
    }
    ])
    const stringOptions = [
      'Passos - IPB',
      'Machado - IPI ',
      'Alpinópolis - IPI',
      'Carmo do Rio Claro - IPI',
      'Conceição da Aparecida - IPI',
      'Muzambinho - IPI',
      'Areado - IPI',
      'Alterosa - IPI',
      'Nova Resende - IPI',
      'Divisa Nova - Batista',
      'Igreja Católica',
      'Alfenas - IPI',
      'Caconde - IPI',
      'Guaxupé - IPI',
      'São Sebastião do Paraíso - IPB',
      'São Bartolomeu - IPI',
      'Outra não listada'
    ]
    const churchs = ref(stringOptions)

    return {
      msg,
      states,
      disable,
      form,
      user,
      ageMask,
      onSubmit,
      loading,
      userExists,
      churchs,
      listaEspera,
      cupom: ref(false),
      filterFn (val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          churchs.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
