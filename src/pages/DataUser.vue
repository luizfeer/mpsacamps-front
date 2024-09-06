<template>
<div class="p-4 block relative">
    <q-table flat bordered title="Cadastros Federa" :rows="user" :columns="columns" row-key="name" binary-state-sort :filter="filter">
        <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </template>
        <template v-slot:body="props">
            <q-tr :props="props">

                <q-td key="name" :props="props" @click="openModal(props)" class="cursor-pointer">
                    {{ props.row.name }}
                </q-td>

                <q-td key="email" :props="props">
                    {{ props.row.email }}
                </q-td>

                <q-td key="phone" :props="props">
                    <a :href="`https://api.whatsapp.com/send?phone=55${props.row.ddd}${props.row.cellphone}&text=Olá ${props.row.name}, tudo bem?`" target="_blank" class="text-green-500">
                        <q-icon name="phone" /> {{ props.row.cellphone }}
                    </a>

                </q-td>

                <q-td key="address" :props="props">
                    {{ `${props.row.address}, ${props.row.complemento}, ${props.row.cidade}` }}
                </q-td>

                <q-td key="createFormat" :props="props">
                    {{ props.row.createFormat }}
                </q-td>
                <q-td key="cpf" :props="props">
                    {{ props.row.cpf }}
                </q-td>
                <q-td key="pagamento" :props="props">
                    <a :href="`https://dash.pagar.me/merch_Br1VvYXiQi6rOpe9/acc_XkDLbMPIbUr3JnNB/orders?date_filters=SevenDays&period_type=date_filters&customers=${props.row.email}&sort_mode=desc&page=1&size=30&is_test_account=false`" target="_blank" class="text-green-500">
                        <q-icon name="cart" /> Pagarme
                    </a>
                    <div v-if="props.row.copyCharges.length">
                        <q-chip :key="props.row.copyCharges[0].event_desc.chargeId" :label="props.row.copyCharges[0].event_desc.data.status" :color="props.row.copyCharges[0].event_desc.data.status === 'Pago' ? 'green' : 'red'" />
                        <span class="bg-blue-900 rounded-full p-2 px-4 ml-2" color="white">{{ props.row.copyCharges[0].event_desc.data.meio }}</span>
                        <span class="bg-blue-900 rounded-full p-2 px-4 ml-2" color="white">{{ props.row.copyCharges[0].event_desc.data.amount }}</span>
                        <span class="bg-blue-900 rounded-full p-2 px-4 ml-2" color="white">{{ formatData(props.row.copyCharges[0].event_desc.createAt) }}</span>
                        <span class="bg-blue-900 rounded-full p-2 px-4 ml-2" color="white">Lote {{ props.row.copyCharges[0].event_desc.data.lote }}</span>
                        <span v-if="props.row.copyCharges.length > 1">
                          {{ props.row.copyCharges.length }}
                          <q-btn @click="openModalPagamentos(props)" class="bg-blue-500 text-white" label="Ver outros pagamentos" />
                        </span>

                    </div>
                    <div v-else>
                        sem pagamento
                    </div>

                </q-td>
                <q-td key="cidade" :props="props">
                    {{ props.row.cidade }}
                </q-td>

                <q-td key="estado" :props="props">
                    {{ props.row.estado }}
                </q-td>

                <q-td key="church" :props="props">
                    {{ props.row.church }}
                </q-td>

                <q-td key="documento_responsavel" :props="props">
                    {{ props.row.documento_responsavel }}
                </q-td>

                <q-td key="cep" :props="props">
                    {{ props.row.cep }}
                </q-td>

                <q-td key="idade" :props="props">
                    {{ props.row.idade }}
                </q-td>

                <q-td key="complemento" :props="props">
                    {{ props.row.complemento }}
                </q-td>

                <q-td key="genero" :props="props">
                    {{ props.row.genero }}
                </q-td>

                <q-td key="medicamento" :props="props">
                    {{ props.row.medicamento }}
                </q-td>

                <q-td key="responsavel" :props="props">
                    {{ props.row.responsavel }}
                </q-td>

                <q-td key="pastor" :props="props">
                    {{ props.row.pastor }}
                </q-td>

                <q-td key="ddd" :props="props">
                    {{ props.row.ddd }}
                </q-td>

                <q-td key="cellphone_responsavel" :props="props">
                    {{ props.row.cellphone_responsavel }}
                </q-td>

                <q-td key="alergia" :props="props">
                    {{ props.row.alergia }}
                </q-td>

                <q-td key="data_nasc" :props="props">
                    {{ props.row.data_nasc }}
                </q-td>

                <q-td key="pais" :props="props">
                    {{ props.row.pais }}
                </q-td>

                <q-td key="info_add" :props="props">
                    {{ props.row.info_add }}
                </q-td>

                <q-td key="ddd_responsavel" :props="props">
                    {{ props.row.ddd_responsavel }}
                </q-td>

                <q-td key="camiseta" :props="props">
                    {{ props.row.camiseta }}
                </q-td>

                <q-td key="equipe" :props="props">
                    {{ props.row.equipe }}
                </q-td>

                <q-td key="listaEspera" :props="props">
                    {{ props.row.listaEspera }}
                </q-td>

                <q-td key="id" :props="props">
                    {{ props.row.id }}
                </q-td>

                <q-td key="charges" :props="props">
                    <div v-if="props.row.charges && props.row.charges.length">
                        <q-chip v-for="charge in props.row.charges" :key="charge.event_desc.data.userID" :label="charge.event_desc.data.status" :color="charge.event_desc.data.status === 'Pago' ? 'green' : 'red'" />

                        <span v-for="charge in props.row.charges" :key="charge.id">
                            <span class="bg-blue-900 rounded-full p-2 px-4 ml-2" color="white">{{ charge.event_desc.data.meio }}</span>
                            <span class="bg-blue-900 rounded-full p-2 px-4 ml-2" color="white">{{ charge.event_desc.data.amount }}</span>
                            <span class="bg-blue-900 rounded-full p-2 px-4 ml-2" color="white">{{ charge.event_desc.createAt }}</span>
                            <span class="bg-blue-900 rounded-full p-2 px-4 ml-2" color="white">Lote {{ charge.event_desc.data.lote }}</span>
                        </span>
                    </div>
                    <div v-else>
                        sem pagamento
                    </div>
                </q-td>

            </q-tr>

        </template>

    </q-table>
    <q-dialog v-model="modal" maximized>
        <q-card>
            <q-card-section class="row items-center">
                <div class="text-h6">{{ userSelected.name }}</div>
                <q-btn dense flat icon="close" @click="modal = false" />
            </q-card-section>

            <q-card-section>

                <div class="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <q-img src="/FEUPAM-logo.png" style="width: 150px; height: 40px;" class="ml-5 mt-4" />

                        <div class="px-4 py-5 sm:px-6 flex">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">
                                Comprovante de Inscrição Federa
                            </h3>
                        </div>
                        <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Nome completo
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.name }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        CPF
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.cpf }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Data de Nascimento
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.data_nasc }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Idade
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.idade }} anos
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Gênero
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.genero }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Cidade
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.cidade }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Estado
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.estado }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Igreja
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.church }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Pastor(a)
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.pastor }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Responsável
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.responsavel }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Celular
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.cellphone }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Email
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.email }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Alergia
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.alergia === 'Não' ? 'Não possui' : userSelected.alergia }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Medicamento
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.medicamento === 'Não' ? 'Não usa' : userSelected.medicamento }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-2">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Endereço
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ userSelected.address }}, {{ userSelected.complemento }}, {{ userSelected.cep }}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <h4 class="text-md font-medium text-gray-500 mb-4">
                                Cobranças
                            </h4>
                            <ul class="border border-gray-200 rounded-md divide-y divide-gray-200" v-if="userSelected.charges.length>0">
                                <li v-for="charge in userSelected.charges" :key="charge.id" class="p-4 pt-10 relative flex items-center flex-wrap justify-between text-sm text-gray-600">
                                    <div class="w-full">
                                        <div class="row col-12">

                                            <span class="col-6">Lote {{ charge.event_desc.data.lote }}</span>

                                            <span class="col-6">ID do pagamento: {{ charge.event_desc.chargeId }}</span>
                                        </div>
                                        <div class="row col-12 mt-2 pt-2 border-t border-gray-3\00">

                                            <span class="col-6">Realizada em: {{ formatData(charge.event_desc.createAt) }}</span>

                                            <span class="col-6">Valor R${{ (charge.event_desc.data.amount/100) }}</span>
                                        </div>

                                    </div>
                                    <div class="ml-4 flex-shrink-0 absolute right-2 top-2">
                                        <span :class="{'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800': charge.event_desc.data.status === 'Pago', 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800': charge.status === 'Falhou'}">
                                            {{ charge.status }}
                                        </span>
                                    </div>
                                </li>
                            </ul>
                            <div v-else class="text-center text-gray-500 py-4">
                                <span class="text-base">Nenhuma cobrança encontrada</span>
                            </div>
                        </div>
                    </div>

                </div>

            </q-card-section>
        </q-card>
    </q-dialog>
    <q-dialog v-model="modalPagamentos" maximized>
        <q-card>
            <q-card-section class="row items-center">
                <div class="text-h6">{{ userSelected.name }}</div>
                <q-btn dense flat icon="close" @click="modalPagamentos = false" />
            </q-card-section>

            <q-card-section>

                <div class="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <q-img src="/FEUPAM-logo.png" style="width: 150px; height: 40px;" class="ml-5 mt-4"
                            />
                        <div class="px-4 py-5 sm:px-6 flex">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">
                                Lista de pagamentos
                            </h3>
                        </div>
                          <div class="flex flex-col text-black">
                          <div v-for="registro in userSelected.charges" :key="registro.event_desc.chargeId" class="p-4 border rounded-lg m-4 mb-0" :class="{'bg-green-100': registro.event_desc.data.status === 'Pago', 'bg-red-100': registro.event_desc.data.status !== 'Pago'}">
                            <h2 class="font-bold text-xl mb-2">Evento: {{ registro.event_desc.data.event }}</h2>
                            <p>Email: {{ registro.event_desc.data.email }}</p>
                            <p>Quantia: {{ registro.event_desc.data.amount / 100 }} R$</p>
                            <p>Status: <span :class="{'text-green-800': registro.event_desc.data.status === 'Pago', 'text-red-800': registro.event_desc.data.status !== 'Pago'}">{{ registro.event_desc.data.status }}</span></p>
                            <p>Data do pagamento: {{ formatData(registro.event_desc.createAt) }}</p>
                            <p>Meio de pagamento: {{ registro.event_desc.data.meio }}</p>
                            <p>Parcelas: {{ registro.event_desc.data.parcelas }}</p>
                            <p>chargeId: {{ registro.event_desc.data.chargeId }}</p>
                            <p>{{ registro.event_desc.data.payLink }}</p>
                            <p>lote: {{ registro.event_desc.data.lote }}</p>

                          </div>
                        </div>
                </div>
                </div>

            </q-card-section>
        </q-card>
    </q-dialog>

    <div>

        <q-checkbox v-for="column in addtionalColumns" :key="column.name" :label="column.label" v-model="column.visible" @click="column.visible ? addColumn(column.name) : removeColumn(column.name)" />

    </div>
    <q-btn @click="todos()" class="bg-green-500 text-white my-4" label="Reseta todos" />

    <div class="gap-4 flex">
        <q-btn @click="soEquipe()" class="bg-blue-500 text-white" label="Só equipe" />
        <q-btn @click="naoEquipe()" class="bg-blue-500 text-white" label="Não equipe" />
        <q-btn @click="listaEspera()" class="bg-blue-500 text-white" label="Só lista de espera" />
        <q-btn @click="soMeninas()" class="bg-blue-500 text-white" label="Só meninas" />
        <q-btn @click="soMeninos()" class="bg-blue-500 text-white" label="Só meninos" />
        <q-btn @click="soPagos()" class="bg-blue-500 text-white" label="Só pagos" />
        <q-btn @click="soPagamentoComErro()" class="bg-blue-500 text-white" label="Só não pagos" />
        <q-btn @click="soSemPagamento()" class="bg-blue-500 text-white" label="Só sem pagamento" />

    </div>
    <div class="mt-4">
      <p class="text-white">Filtros aplicados:</p>
      <q-chip v-for="filtro in filtros" :key="filtro" :label="filtro" />

    </div>
    <div>
      <q-btn @click="exportar()" class="bg-green-500 text-white my-4 mt-8" label="Exportar Planilha" />
    </div>
</div>
</template>

<script>
// import userImport from '../js/user.js'
import * as XLSX from 'xlsx/xlsx.mjs'

import {
  useQuasar
} from 'quasar'
import {
  api
} from 'boot/axios'
import {
  ref,
  onMounted
} from 'vue'
import {
  useRouter
} from 'vue-router'
export default {
  setup () {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }

    // userImport.filter(item => item.user.listaEspera);

    const columns = ref([{
      name: 'name',
      label: 'Name',
      field: 'props.name',
      align: 'left',
      sortable: true,
      style: 'width: 100px'
    }

    ])

    const addColumn = (name) => {
      const collumn = addtionalColumns.value.find(column => column.name === name)
      console.log(collumn)
      columns.value.push(collumn)
    }
    const removeColumn = (name) => {
      columns.value = columns.value.filter(column => column.name !== name)
    }
    const addtionalColumns = ref([{
      name: 'cpf',
      label: 'CPF',
      field: 'cpf',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },

    {
      name: 'pagamento',
      label: 'Pagamento',
      field: 'pagamento',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'email',
      label: 'Email',
      field: 'props.email',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false

    },
    {
      name: 'phone',
      label: 'Phone',
      field: 'phone',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false

    },
    {
      name: 'address',
      label: 'Address',
      field: 'address',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false

    },
    {
      name: 'createFormat',
      label: 'Data da inscrição',
      field: 'createFormat',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false

    },

    {
      name: 'cidade',
      label: 'Cidade',
      field: 'cidade',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'estado',
      label: 'Estado',
      field: 'estado',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'church',
      label: 'Igreja',
      field: 'church',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'documento_responsavel',
      label: 'Documento Responsável',
      field: 'documento_responsavel',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'cep',
      label: 'CEP',
      field: 'cep',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'idade',
      label: 'Idade',
      field: 'idade',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'complemento',
      label: 'Complemento',
      field: 'complemento',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'genero',
      label: 'Gênero',
      field: 'genero',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'medicamento',
      label: 'Medicamento',
      field: 'medicamento',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'responsavel',
      label: 'Responsável',
      field: 'responsavel',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'pastor',
      label: 'Pastor',
      field: 'pastor',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'ddd',
      label: 'DDD',
      field: 'ddd',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'cellphone_responsavel',
      label: 'Telefone Responsável',
      field: 'cellphone_responsavel',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'alergia',
      label: 'Alergia',
      field: 'alergia',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'data_nasc',
      label: 'Data de Nascimento',
      field: 'data_nasc',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'pais',
      label: 'País',
      field: 'pais',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'info_add',
      label: 'Informações Adicionais',
      field: 'info_add',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'ddd_responsavel',
      label: 'DDD Responsável',
      field: 'ddd_responsavel',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'camiseta',
      label: 'Camiseta',
      field: 'camiseta',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'name',
      label: 'Nome',
      field: 'name',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'equipe',
      label: 'Equipe',
      field: 'equipe',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'listaEspera',
      label: 'Lista de Espera',
      field: 'listaEspera',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'id',
      label: 'ID',
      field: 'id',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    },
    {
      name: 'charges',
      label: 'Cobranças',
      field: 'charges',
      align: 'left',
      sortable: true,
      style: 'width: 100px',
      visible: false
    }

    ])
    const userSelected = ref({})
    const modal = ref(false)
    const openModal = (row) => {
      console.log(row)
      userSelected.value = row.row
      modal.value = true
    }

    const modalPagamentos = ref(null)

    const openModalPagamentos = (row) => {
      console.log(row)
      userSelected.value = row.row
      modalPagamentos.value = true
    }
    const user = ref([])
    const $q = useQuasar()
    const userImport = ref([])
    const router = useRouter()

    onMounted(async () => {
      const evento = router.currentRoute.value.params.evento

      $q.loading.show()

      // get data by api /fetch-users
      try {
        const response = await api.get(`/getall-data?collection=${evento}`)
        console.log(response)
        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i]
          // if (item.createAt) {
          //   item.createFormat = formatData(item.createAt)
          // } else {
          //   item.createFormat = 'Não informado'
          // }
          item.copyCharges = item.charges

          if (item.copyCharges?.length > 1) {
            // sort charges by createAt
            item.tentativasPagamento = item.copyCharges.length

            item.copyCharges.sort((a, b) => {
              return new Date(b.event_desc.createAt) - new Date(a.event_desc.createAt)
            })
            // busca se alguma charge tem status pago
            const chargePago = item.copyCharges.find(charge => charge.event_desc.data.status === 'Pago')
            // remove o charge pago da posição antiga
            item.copyCharges = item.copyCharges.filter(charge => charge.event_desc.data.status !== 'Pago')
            // add o charge pago na primeira posição
            if (chargePago) {
              item.copyCharges.unshift(chargePago)
            }
          }
          if (item.copyCharges[0] && item.copyCharges[0].event_desc && item.copyCharges[0].event_desc.data.status === 'Falhou') {
            item.createFormat = `Tentativa de pagamento em ${formatData(item.copyCharges[0]?.event_desc.createAt)}`
          } else {
            item.createFormat = `Pagamento em ${formatData(item.copyCharges[0]?.event_desc.createAt)}`
          }
          response.data[i] = {
            ...item,
            ...item.copyCharges[0],
            charges: item.charges

          }
        }

        // const users = response.data.forEach(item => {

        // })
        // ordena usuarios pela data de inscrição
        response.data.sort((a, b) => {
          return new Date(a.copyCharges[0]?.event_desc.createAt._seconds) - new Date(b.copyCharges[0]?.event_desc.createAt._seconds)
        })
        user.value = response.data
        userImport.value = response.data
        $q.loading.hide()
      } catch (error) {
        console.log(error)
        $q.notify({
          message: 'Erro ao carregar os dados',
          color: 'negative',
          position: 'top'
        })
      }
    })
    const filtros = ref([])
    const listaEspera = () => {
      $q.loading.show()

      user.value = user.value.filter(item => {
        return item.listaEspera && item.listaEspera === true
      })

      user.value.sort((a, b) => {
        return new Date(b.createAt) - new Date(a.createAt)
      })
      filtros.value.push('listaEspera')
      $q.loading.hide()
    }
    const soMeninos = () => {
      $q.loading.show()
      user.value = user.value.filter(item => item.genero === 'masculino')
      filtros.value.push('masculino')

      $q.loading.hide()
    }
    const soMeninas = () => {
      $q.loading.show()
      user.value = user.value.filter(item => item.genero === 'feminino')
      filtros.value.push('feminino')
      $q.loading.hide()
    }
    const todos = () => {
      try {
        $q.loading.show()
        user.value = userImport.value
        filtros.value = []
        $q.loading.hide()
      } catch (error) {
        console.log(error)
      }
    }
    const soPagos = () => {
      $q.loading.show()

      user.value = user.value.filter(item => {
        return item.charges[0] && item.copyCharges[0].event_desc.data.status === 'Pago'
      })
      filtros.value.push('pagos')
      $q.loading.hide()
    }
    const soPagamentoComErro = () => {
      $q.loading.show()
      user.value = user.value.filter(item => {
        return item.charges[0] && item.copyCharges[0].event_desc.data.status !== 'Pago'
      })
      filtros.value.push('pagamentoComErro')
      $q.loading.hide()
    }
    const soSemPagamento = () => {
      $q.loading.show()
      user.value = user.value.filter(item => {
        return item.copyCharges.length === 0
      })
      filtros.value.push('semPagamento')
      $q.loading.hide()
    }
    const soEquipe = () => {
      $q.loading.show()
      user.value = user.value.filter(item => {
        return item.equipe === true
      })
      filtros.value.push('equipe')
      $q.loading.hide()
    }
    const naoEquipe = () => {
      $q.loading.show()
      user.value = user.value.filter(item => {
        return item.equipe === false
      })
      filtros.value.push('naoEquipe')
      $q.loading.hide()
    }
    const formatData = (evento) => {
      if (!evento) return 'Não informado'
      if (evento._seconds === undefined) return 'Não informado'
      const date = new Date(evento._seconds * 1000 + evento._nanoseconds / 1000000)

      const dia = date.getDate().toString().padStart(2, '0')
      const mes = (date.getMonth() + 1).toString().padStart(2, '0') // Os meses em JavaScript começam em 0 para janeiro, 1 para fevereiro, etc.
      const ano = date.getFullYear()

      const horas = date.getHours().toString().padStart(2, '0')
      const minutos = date.getMinutes().toString().padStart(2, '0')
      const segundos = date.getSeconds().toString().padStart(2, '0')

      return `${dia}/${mes}/${ano} às ${horas}:${minutos}:${segundos}`
    }
    const exportar = () => {
      // Dados de exemplo: um array de objetos
      const data = user.value

      // Cria uma planilha vazia
      const ws = XLSX.utils.json_to_sheet(data)

      // Cria um novo livro de trabalho com a planilha
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Planilha1')

      // Gera o arquivo Excel (formato .xlsx)
      XLSX.writeFile(wb, 'dados.xlsx')
    }

    return {
      soEquipe,
      listaEspera,
      soSemPagamento,
      todos,
      removeColumn,
      user,
      columns,
      addColumn,
      addtionalColumns,
      userSelected,
      modal,
      openModal,
      options,
      soMeninos,
      soMeninas,
      soPagos,
      soPagamentoComErro,
      filter: ref(''),
      formatData,
      exportar,
      openModalPagamentos,
      modalPagamentos,
      userImport,
      naoEquipe,
      filtros

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
