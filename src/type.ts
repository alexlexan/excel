import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {Emmiter} from '@/core/Emmiter'

export type Indexable = {
  [key: number]: string,
  [key: string]: string,
}

export type IndexableString = {
  [key: string]: string,
}

export type IndexableObject = {
  [key: string]: IndexableString,
}
export type Store = {
  subscribe(
    fn: Function
  ): {
    unsubscribe(): void,
  },
  dispatch(action: any): void,
  getState(): any,
}

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
}

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

export interface EventTargetElement {
  target: HTMLElement;
  shiftKey: boolean;
  ctrlKey: boolean;
  charCode: number;
  keyCode: number;
  altKey: boolean;
  key: string;
  preventDefault(): void;
}

export type ExcelOptions = {
  components: ComponentNameType[],
  store: Store,
}

export type TableMatrix = {
  col: number,
  row: number,
}
