// import Vue from 'vue'

const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    // ADD_VISITED_VIEWS: (state, view) => {
    //   if (state.visitedViews.some(v => v.path === view.path)) return
    //   state.visitedViews.push(Object.assign({}, view, {
    //     title: view.meta.title || 'no-name'
    //   }))
    //   if (!view.meta.noCache) {
    //     state.cachedViews.push(view.name)
    //   }
    // },
    ADD_VISITED_VIEWS: (state, view) => {
      // 如果按照旧的逻辑处理，假如path相同，直接return，现在改为替换原数组，会有的性能问题，后续可以考虑一下
      if ((state.visitedViews.some(v => v.path === view.path))) {
        var arr = []
        for (var i = 0; i < state.visitedViews.length; i++) {
          if (state.visitedViews[i].path === view.path) {
            // path是不可修改的，不能使用
            // Vue.set(state.visitedViews, i, view)
            // state.visitedViews.splice(i, 1)
            arr.push(Object.assign({}, view, {
              title: view.meta.title || 'no-name'
            }))
          } else {
            arr.push(state.visitedViews[i])
          }
        }
        state.visitedViews = arr
      } else {
        state.visitedViews.push(Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        }))
        if (!view.meta.noCache) {
          state.cachedViews.push(view.name)
        }
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    DEL_OTHERS_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, i + 1)
          break
        }
      }
    },
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = []
      state.cachedViews = []
    }
  },
  actions: {
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
      })
    }
  }
}

export default tagsView
