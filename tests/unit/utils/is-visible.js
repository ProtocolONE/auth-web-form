export default function (wrapper) {
  let computedStyle = window.getComputedStyle(wrapper.element)
  return computedStyle.display !== 'none'
}
