type THeaderConfigs = {
  type?: 'white' | 'background'
}

type TGreenHeader = {
  children?: React.ReactNode | string | number
  insetPadding?: boolean
  canBack?: boolean
  backgroundColor?: string // Only for background header type
  color?: string // Only for background header type
  customRight?: React.ReactNode
}
