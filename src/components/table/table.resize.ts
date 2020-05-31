import {EventTargetElement} from './Table'
import {$, IDom} from '@/core/dom'

export function resizeHandler($root: IDom, event: EventTargetElement) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize

  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value: number

  // смещение для линии выделения
  const propRightCol = $parent.findProperty($resizer, 'right')
  const valuepropRightCol = +/\d+/.exec(propRightCol)

  $resizer.css({
    opacity: '1',
    [sideProp]: '-5000px',
  })

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.clientX - coords.right + valuepropRightCol
      value = coords.width + delta - valuepropRightCol

      $resizer.css({right: -delta + 'px'})
    } else {
      const delta = e.clientY - coords.bottom
      value = coords.height + delta

      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      if (value < 0) value = 0
      $parent.css({width: value + 'px'})
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach((el: HTMLElement) => (el.style.width = value + 'px'))
      $resizer.css({
        right: '-8px',
      })
    } else {
      if (value < 0) value = 0
      $parent.css({height: value + 'px'})
      $resizer.css({
        bottom: '-2px',
      })
    }

    $resizer.css({
      opacity: '0',
      [sideProp]: '0',
    })
  }
}
