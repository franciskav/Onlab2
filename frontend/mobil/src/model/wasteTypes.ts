export interface WasteType {
  type: string
  description: string
}

export interface MainWasteType {
  mainType: string
  description?: string
  types: WasteType[]
}

export interface Type {
  type: string
  isChecked: boolean
}

export interface MainType {
  mainType: string
  isChecked: boolean
  types: Type[]
}
