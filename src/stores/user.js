import { defineStore } from 'pinia'
import { api } from 'boot/axios'

import { Notify } from 'quasar'
export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: '',
      church: '',
      ddd: '',
      genero: '',
      cep: '',
      cpf: '',
      idade: '',
      data_nasc: '',
      responsavel: '',
      documento_responsavel: '',
      ddd_responsavel: '',
      cellphone: '',
      cellphone_responsavel: '',
      cellJunto: '',
      cellResponsavelJunto: '',
      address: '',
      complemento: '',
      cidade: '',
      estado: '',
      equipe: false,
      alergia: '',
      medicamaento: '',
      info_add: '',
      pastor: ''
    },
    charges: [],
    loading: false,
    userExists: false,
    userStorage: null,
    token: null,
    tokenTime: null
  }),
  getters: {
    isLogin: (state) => state.user !== {},
    getTokenTime: (state) => state.tokenTime
  },
  actions: {
    logOut () {
      this.user = {}
      this.userExists = false
      this.userStorage = null
      this.token = null
      this.tokenTime = null
    },
    setTokenTime (time) {
      this.tokenTime = time
    },
    setUser (user) {
      this.user = user
    },
    setToken (token) {
      this.token = token
    },
    setUserStorage (userStorage) {
      this.userStorage = userStorage
    },
    juntaDDD () {
      this.user.cellJunto = '(' + this.user.ddd + ') ' + this.user.cellphone
      this.user.cellResponsavelJunto =
        '(' +
        this.user.ddd_responsavel +
        ') ' +
        this.user.cellphone_responsavel
    },
    async getUserContext () {
      this.loading = true
      try {
        await api.get('/get-collection?collection=Users').then((response) => {
          if (response.data) {
            this.user = response.data
            this.charges = response.data.charges
            this.userExists = true
            this.juntaDDD()
          }
        })
      } catch (error) {
        console.log(error)
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === 'Não foi encontrado nenhum dado'
        ) {
          return
        }
        Notify.create({
          message: 'Erro ao carregar dados do usuário',
          color: 'red-4',
          textColor: 'white',
          icon: 'warning',
          position: 'top'
        })
      } finally {
        this.loading = false
      }
    }
  }
})
