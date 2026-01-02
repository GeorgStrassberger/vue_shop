import { firebaseConfig } from '@/config/firebase'
import axios from 'axios'

let timer

const state = {
  userId: null,
  token: null,
}

const mutations = {
  setUser(state, payload) {
    state.userId = payload.userId
    state.token = payload.token
  },
}

const actions = {
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
        const expiresIn = Number(res.data.expiresIn) * 1000
        const expDate = new Date().getTime() + expiresIn
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.localId)
        localStorage.setItem('expiresIn', expDate)

        timer = setTimeout(() => {
          context.dispatch('autoSignout')
        }, expiresIn)

        context.commit('setUser', { userId: res.data.localId, token: res.data.idToken })
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
  signout(context) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expiresIn')

    clearTimeout(timer)

    context.commit('setUser', { token: null, userId: null })
  },
  autoSignin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const expiresIn = localStorage.getItem('expiresIn')
    const timeLeft = Number(expiresIn) - new Date().getTime()

    if (timeLeft < 0) {
      //refreshToken
      return
    }

    timer = setTimeout(() => {
      context.dispatch('autoSignout')
    }, expiresIn)

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      })
    }
  },
  autoSignout(context) {
    context.dispatch('signout')
  },
}

const getters = {}

const authModule = { state, mutations, actions, getters }

export default authModule
