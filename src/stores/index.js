import { createStore } from 'vuex'
import { firebaseConfig } from '@/config/firebase'
import axios from 'axios'

const store = createStore({
  state: {
    userId: null,
    token: null,
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId
      state.token = payload.token
    },
  },
  actions: {
    auth(context, payload) {
      let url = ''
      if (payload.mode === 'signin') {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`
      } else if (payload.mode === 'signup') {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`
      }

      const authDTO = {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }

      return axios
        .post(url, authDTO)
        .then((res) => {
          context.commit('setUser', { userId: res.data.localId, token: res.data.idToken })
          console.log('[res]', res)
        })
        .catch((err) => {
          const errorMessage = new Error(err.response.data.error.message || 'UNKNOWN_ERROR')
          throw errorMessage
        })
    },

    signup(context, payload) {
      const signUpDTO = {
        ...payload,
        mode: 'signup',
      }
      return context.dispatch('auth', signUpDTO)
    },
    signin(context, payload) {
      const signInDTO = {
        ...payload,
        mode: 'signin',
      }
      return context.dispatch('auth', signInDTO)
    },
  },
  getters: {},
})

export default store
