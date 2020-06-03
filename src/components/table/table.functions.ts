import {EventTargetElement} from './Table'

export function shouldResize(event: EventTargetElement): string {
  return event.target.dataset.resize
}

export function getMinResize(
  widthColumn: number,
  minWidthColumn: number,
  areaWidthResizer: number
): number {
  return -widthColumn + minWidthColumn + areaWidthResizer
}
