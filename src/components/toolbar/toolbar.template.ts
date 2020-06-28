import {IndexableString} from './../../type'
import {storage, isEmpty} from '@/core/utils'
type ToolbarButton = {
  icon: string,
  active: boolean,
  value: {[key: string]: string} | string,
}

function toButton(button: ToolbarButton) {
  const value =
    button.value === 'string' ? button.value : `${JSON.stringify(button.value)}`
  const meta = `
    data-type="button"
    data-value=${value}
  `
  return `
    <div class="button ${button.active ? 'active' : ''}"
        ${meta}
    >
        <i ${meta} class="material-icons">${button.icon}</i>
    </div>
    `
}

export function createToolbar(s: IndexableString) {
  const buttons = [
    {
      value: {textAlign: 'left'},
      icon: 'format_align_left',
      active: s['textAlign'] === 'left',
    },
    {
      value: {textAlign: 'center'},
      icon: 'format_align_justify',
      active: s['textAlign'] === 'center',
    },
    {
      value: {textAlign: 'right'},
      icon: 'format_align_right',
      active: s['textAlign'] === 'right',
    },
    {
      value: {fontWeight: s['fontWeight'] === 'bold' ? 'normal' : 'bold'},
      icon: 'format_bold',
      active: s['fontWeight'] === 'bold',
    },
    {
      value: {
        textDecoration:
          s['textDecoration'] === 'underline' ? 'none' : 'underline',
      },
      icon: 'format_underlined',
      active: s['textDecoration'] === 'underline',
    },
    {
      value: {fontStyle: s['fontStyle'] === 'italic' ? 'normal' : 'italic'},
      icon: 'format_italic',
      active: s['fontStyle'] === 'italic',
    },
    {
      value: 'prevState',
      icon: 'undo',
      active: false,
    },
    {
      value: 'nextState',
      icon: 'redo',
      active: false,
    },
  ]
  return buttons.map(toButton).join('')
}
