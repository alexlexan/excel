import {EventTargetElement} from './Table'

export function shouldResize(event: EventTargetElement) {
  return event.target.dataset.resize
}
