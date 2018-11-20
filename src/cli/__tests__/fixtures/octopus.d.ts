import { BoundsObject, ColorObject } from './types/base'

export type Octopus = {
  version: {
    'octopus-common'?: string,
    'octopus-photoshop'?: string,
    'octopus-sketch'?: string,
    'octopus-xd'?: string
  },
  timeStamp: number,
  guides: {
    x: any[],
    y: any[]
  },
  layoutGrid?: ArtboardLayout[],
  bounds: BoundsObject,
  layers: LayerOctopus[]
}

/**
 * LayerID coming from Sketch or Photoshop, we decided that we are treating each ID as string, no
 * matter which origin it has.
 */
export type LayerId = string

/**
 * Blending modes (NORMAL, MULTIPLY, LIGHTEN...)
 */
export type BlendingModeType = string

export type SpriteCoords = {
  x: number,
  y: number
}

export type LayerEffects = {
  fills?: any
  borders?: any
  shadows?: any
  blurs?: any
}

/**
 * Artboard Layouts
 */
export type ArtboardLayout = ColumnLayout | RowLayout | GridLayout

export type AbstractLayout = {
  type?: 'grid' | 'column' | 'row',
  enabled: boolean,
  size: number,
  color: ColorObject,
}

export type ColumnLayout = AbstractLayout & {
  bounds: BoundsObject,
  count: number,
  outerOutline: boolean
}

export type RowLayout = AbstractLayout & {
  bounds: BoundsObject,
  count: number,
  drawEveryLine: boolean
}

export type GridLayout = AbstractLayout & {
  thickEvery: number
}

/**
 * Simplified Octopus layer description (since we don't need all properties)
 */
export type LayerOctopus = {
  version?: {
    'octopus-common'?: string,
    'octopus-photoshop'?: string,
    'octopus-sketch'?: string,
    'octopus-xd'?: string,
    'octopus-illustrator'?: string,
    'octopus-figma'?: string
  },
  id: LayerId,
  type: string,
  name?: string,
  bounds?: BoundsObject,
  rotatedBounds?: BoundsObject,
  layers?: LayerOctopus[],
  effects?: LayerEffects,
  visible?: boolean,
  clipped?: boolean,
  opacity?: number,
  blendMode?: string,
  maskedBy?: LayerId,
  fillOpacity?: number,
  shape?: any[],
  origin?: string,
  bitmap?: {
    spriteCoords?: SpriteCoords,
    // Used when removing SpriteCoords for rendering (so it doesn't think its spritesheet)
    // but stage requires spriteCoords for cutting bitmap
    originalSpriteCoords?: SpriteCoords,
    blank?: boolean,
    filename: string,
    originalFilename?: string,
    bounds: BoundsObject,
    effectsApplied: boolean,
    optimized?: boolean
  },
  bitmapMask?: {
    extendWithWhite: boolean,
    imageName?: string,
    bounds: BoundsObject
  },
  artboard?: {
    bounds: BoundsObject,
    color: ColorObject
  },
  text?: {}

  parent?: LayerOctopus
}

export type OctopusAsset = {
  key: string,
  filename: string
}
