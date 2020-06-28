import {EventTargetElement} from '@/type'
import {$, Dom} from '@/core/dom'
import {getMinResize} from './table.functions'

export function resizeHandler($root: Dom, event: EventTargetElement): object {
  return new Promise((resolve) => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize

    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value: number

    // смещение для линии выделения колонок
    const valuePropRightResizerCol = $parent.findProperty($resizer, 'right')
    // минимальная ширина колонки
    const valueMinWidthCol = $parent.findProperty($parent, 'min-width', 40)
    // смещение для линии выделения колонок
    const valuePropBottomResizerRow = $parent.findProperty($resizer, 'bottom')
    // минимальная высота строки
    const valueMinHeightRow = $parent.findProperty($parent, 'min-height', 20)

    $resizer.css({
      opacity: '1',
      [sideProp]: '-5000px',
    })

    document.onmousemove = (e) => {
      if (type === 'col') {
        let delta = e.clientX - coords.right + valuePropRightResizerCol
        const valueMinResizeWidthColumn = getMinResize(
          coords.width,
          valueMinWidthCol,
          valuePropRightResizerCol
        )

        if (delta < valueMinResizeWidthColumn) {
          delta = valueMinResizeWidthColumn
          value = valueMinWidthCol
        } else {
          value = coords.width + delta - valuePropRightResizerCol
        }

        $resizer.css({right: -delta + 'px'})
      } else {
        let delta = e.clientY - coords.bottom
        const valueMinResizeHeightRow = getMinResize(
          coords.height,
          valueMinHeightRow,
          valuePropBottomResizerRow
        )

        if (delta < valueMinResizeHeightRow) {
          delta = valueMinResizeHeightRow
          value = valueMinHeightRow
        } else {
          value = coords.height + delta - valuePropBottomResizerRow
        }

        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      $resizer.css({
        opacity: '0',
        [sideProp]: '0',
      })

      if (!value) return // если перемещения не было

      if (type === 'col') {
        $parent.css({width: value + 'px'})
        $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((el: HTMLElement) => (el.style.width = value + 'px'))
        $resizer.css({
          right: '-8px',
        })
      } else {
        $parent.css({height: value + 'px'})
        $resizer.css({
          bottom: '-2px',
        })
      }

      resolve({
        value,
        type,
        id: $parent.data[type],
      })
    }
  })
}
