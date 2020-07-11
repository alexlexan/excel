import {ExcelPage} from './pages/ExcelPage';
import {DashboardPage} from './pages/DashboardPage';
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {Emmiter} from '@/core/Emmiter'
import * as actions from '@/redux/actions'


type InferValueTypes<T> = T extends { [key: string]: infer U }
    ? U
    : never;
export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type CallbackFunction = (event: EventTargetElement |
  KeyboardEvent | Event) => void

export type Indexable = {
  [key: number]: string,
  [key: string]: string,
}

export type IndexableNumber = {
  [key: string]: number,
}

export type IndexableString = {
  [key: string]: string,
}

export type IndexableObject = {
  [key: string]: IndexableString,
}

export interface ICSS extends CSSStyleDeclaration {
  [name: string]: number | string | Function | CSSRule
}

export interface EventTargetElement extends Event {
  target: HTMLElement;
  shiftKey: boolean;
  ctrlKey: boolean;
  charCode: number;
  keyCode: number;
  altKey: boolean;
  key: string;
}

export type Store = {
  subscribe(
    fn: Function
  ): {
    unsubscribe(): void,
  },
  dispatch(action: Actions): void,
  getState(): State,
}

export type Subscribe = {
  unsubscribe(): void
}

export type KeyState = keyof State

export type State = {
  title?: string
  colState?: Indexable,
  rowState?: Indexable,
  dataState?: Indexable,
  currentText?: string,
  stylesState?: IndexableObject,
  currentStyles?: Indexable,
  prevState?: boolean,
  nextState?: boolean,
  openedDate?: string
}

export type rootReducerType = (state: State, action: Actions) => State

export type ComponentNameType =
  | typeof Header
  | typeof Toolbar
  | typeof Formula
  | typeof Table

export type ComponentTypeInstance = Header | Toolbar | Formula | Table

export type componentOptionsType = {
  emmiter: Emmiter,
  store: Store,
}

export type ExcelOptions = {
  components: ComponentNameType[],
  store: Store,
}

export type ToolbarButton = {
  icon: string,
  active: boolean,
  value: {[key: string]: string} | string,
}

export type TableResizeHandler = {
  value: string
  type: string
  id: string
}

export type RoutesType = {
  dashboard: typeof DashboardPage,
  excel: typeof ExcelPage,
}

export type TableMatrix = {
  col: number,
  row: number,
}
