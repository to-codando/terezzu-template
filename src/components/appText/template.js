import bannerLemeJs from '../../assets/images/leme-js-banner.png'
export default ({ state, html }) => {
    return html`
    <div class="text-wrapper">
        <p>${state.text}</p>
    </div>
    `
}