type TFolder = TApiAuth & {
  Description: string
  Name: string
  TotalDocument: number
}

type TLibFile = TApiAuth & {
  Background: string
  Description: string
  DirectoryId: number
  FileName: string
  FileType: string
  FileUrl: string
}
