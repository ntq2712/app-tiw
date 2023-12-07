type TClassDetail = TApiAuth & {
  AcademicId: number
  AcademicName: string
  BranchId: number
  BranchName: string
  CertificateTemplateId: any
  CurriculumId: number
  CurriculumName: string
  EndDay: string
  GradeId: number
  GradeName: string
  IsMonthly: boolean
  LessonCompleted: any
  MaxQuantity: number
  Name: string
  PaymentType: number
  PaymentTypeName: string
  Price: number
  ProgramId: number
  ProgramName: string
  ScoreboardTemplateId: number
  StartDay: string
  Status: number
  StatusName: string
  TeacherId: any
  TeacherName: string
  Teachers: Array<{
    TeacherCode: string
    TeacherId: number
    TeacherName: string
  }>
  Thumbnail: string
  Time: number
  TotalLesson: number
  TotalStudent: number
  Type: number
  TypeName: string
}

type TClassType = TApiAuth & {
  AcademicId: number
  AcademicName: string
  BranchId: number
  BranchName: string
  CertificateTemplateId: null
  CurriculumId: number
  CurriculumName: string
  EndDay: string
  GradeId: number
  GradeName: string
  IsMonthly: false
  LessonCompleted: number
  MaxQuantity: number
  Name: string
  PaymentType: number
  PaymentTypeName: string
  Price: number
  ProgramId: number
  ProgramName: string
  ScoreboardTemplateId: number
  StartDay: string
  Status: number
  StatusName: string
  TeacherId: number
  TeacherName: null
  Thumbnail: null
  Time: number
  TotalLesson: number
  TotalStudent: number
  Type: number
  TypeName: string
  Teachers: Array<{
    TeacherCode: string
    TeacherId: number
    TeacherName: string
  }>
}
