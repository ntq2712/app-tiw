type TClassSchedule = TApiAuth & {
  Announced: boolean
  BranchId: number
  ClassId: number
  ClassName: string
  EndTime: string
  HostId: number
  IsOpenZoom: boolean
  JoinUrl: string
  Note: string
  RateTeacher: number
  RateTeacherComment: string
  RoomCode: string
  RoomId: number
  RoomName: string
  SalaryId: any
  StartTime: string
  StartUrl: string
  Status: number
  StatusName: string
  StatusTutoring: number
  StatusTutoringName: string
  TeacherAttendanceId: number
  TeacherAvatar: string
  TeacherCode: string
  TeacherId: number
  TeacherName: string
  TeachingFee: number
  TotalRow: number
  TutorFee: any
  TutorIds: string
  ZoomConfigId: any
  ZoomId: any
  ZoomPass: any
}

type TClassNotification = TApiAuth & {
  ClassId: number
  Content: string
  IsSendMail: boolean
  Title: string
}

type TClassExam = TApiAuth & {
  ClassId: number
  Name: string
}
