export default {
  /**
   * Change (update) view
   */
  updateView (state, view) {
    state.view = view
  },

  /**
   * Update errors from server response
   */
  updateServerErrors (state, { error, error_message } = {}) {
    state.serverErrors = {}
    if (error && error_message) {
      state.serverErrors[error] = error_message
    }
  }
}
