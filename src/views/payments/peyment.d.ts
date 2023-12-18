type TPayment = TApiAuth & {
  Code: string
  StudentId: number
  TotalPrice: number
  DiscountId: number
  LessonDiscount: null
  LessonDiscountCode: null
  DiscountCode: string
  Reduced: number
  Paid: number
  Debt: number
  UsedMoneyReserve: number
  ClassReserveId: number
  PaymentAppointmentDate: null
  CompleteDate: null
  BranchId: number
  TuitionPackageId: number
  Note: string
  Type: number
  TypeName: string
  FullName: string
  UserCode: string
  BranchName: string
}
