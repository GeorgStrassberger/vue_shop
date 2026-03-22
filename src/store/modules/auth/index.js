import axios from 'axios'
import { firebaseConfig } from '@/config/firebase'

let timer

const state = {
  userId: null,
  token: null,
}

const buildAuthUrl = (mode) => {
  if (!firebaseConfig.apiKey) {
    throw new Error('VITE_API_KEY fehlt.')
  }

  if (mode === 'signin') {
    return `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`
  }

  if (mode === 'signup') {
    return `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`
  }

  return ''
}

const clearAuthTimer = () => {
  clearTimeout(timer)
}

const setAuthTimer = (context, expiresIn) => {
  clearAuthTimer()
  timer = setTimeout(() => {
    context.dispatch('autoSignout')
  }, expiresIn)
}

const createAuthError = (error) =>
  new Error(error.response?.data?.error?.message || 'UNKNOWN_ERROR')

const mutations = {
  setUser(state, payload) {
    state.userId = payload.userId
    state.token = payload.token
  },
}

const actions = {
  async auth(context, payload) {
    const url = buildAuthUrl(payload.mode)
    if (!url) {
      return null
    }

    const authDTO = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    }

    try {
      const { data } = await axios.post(url, authDTO)
      const expiresIn = Number(data.expiresIn) * 1000
      const expDate = Date.now() + expiresIn

      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('expiresIn', expDate)

      setAuthTimer(context, expiresIn)

      context.commit('setUser', {
        userId: data.localId,
        token: data.idToken,
      })

      return {
        userId: data.localId,
        token: data.idToken,
      }
    } catch (error) {
      throw createAuthError(error)
    }
  },
  signup(context, payload) {
    const signupDO = {
      ...payload,
      mode: 'signup',
    }
    return context.dispatch('auth', signupDO)
  },
  signin(context, payload) {
    const signinDO = {
      ...payload,
      mode: 'signin',
    }
    return context.dispatch('auth', signinDO)
  },
  autoSignin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const expiresIn = localStorage.getItem('expiresIn')

    if (!token || !userId || !expiresIn) {
      return
    }

    const timeLeft = Number(expiresIn) - Date.now()

    if (timeLeft <= 0) {
      context.dispatch('signout')
      return
    }

    setAuthTimer(context, timeLeft)

    context.commit('setUser', {
      token,
      userId,
    })
  },
  signout(context) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expiresIn')

    clearAuthTimer()

    context.commit('setUser', {
      token: null,
      userId: null,
    })
  },
  autoSignout(context) {
    context.dispatch('signout')
  },
}

const getters = {
  isAuthenticated: (state) => !!state.token,
  token: (state) => state.token,
}

const authModule = {
  state,
  mutations,
  actions,
  getters,
}

export default authModule
