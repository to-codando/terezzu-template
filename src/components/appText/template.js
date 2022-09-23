export default ({ state, html }) => {
  return html`
    <div class="text-wrapper">
      <p>${state.text}</p>
    </div>
  `
}
