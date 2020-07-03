import {$} from '@/core/dom'

export function loader() {
  return $.create('div', 'loader').html(
    `<div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>`
  )
}
