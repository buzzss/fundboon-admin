export const LOGIN_MUTATION = `
  mutation($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export const DELETE_MUTATION = `
  mutation($ids: [UserID]){
    deleteUser(input: $ids)
  }
`;

export const DELETE_APPLICATION_MUTATION = `
  mutation($applicationNumbers: [ApplicationNumbers]){
    deleteApplication(input: $applicationNumbers)
  }
`;

export const DELETE_PRODUCT_MUTATION = `
  mutation($productCodes: [ProductCodes]){
    deleteProduct(input: $productCodes)
  }
`;

export const DEACTIVATE_MUTATION = `
  mutation($ids: [UserID]){
    deactivateUser(input: $ids)
  }
`;

export const LOGOUT_MUTATION = `
  mutation {
    logout
  }
`;

export const UPDATE_ADMIN_USER_PROFILE = `
  mutation(
    $altEmail: String,
    $salutation: String,
    $firstName: String,
    $lastName: String,
    $gender: String,
    $dob: String,
    $age: Int,
    $mobileNumber: String,
    $nationality: String,
    $pan: String,
    $aadhar: String,
    $permanentAddress: String,
    $communicationAddress: String,
    $qualification: String,
    $officeName: String,
    $officeAddress: String,
  ) {
    updateAdminProfile(
      input : {
        altEmail: $altEmail,
        personalDetails: {
          salutation: $salutation,
          firstName: $firstName,
          lastName: $lastName,
          gender: $gender,
          dob: $dob,
          age: $age,
          mobileNumber: $mobileNumber,
          nationality: $nationality,
          pan: $pan,
          aadhar: $aadhar,
        },
        contactDetails:{
          permanentAddress: $permanentAddress,
          communicationAddress: $communicationAddress,
        },
        educationDetails:{
          qualification: $qualification
        },
        employmentDetails:{
          officeName: $officeName,
          officeAddress: $officeAddress,
        }
      }
    ){
      email
    }
  }
`;

export const UPDATE_APPLICATION_DATA = `
  mutation(
    $firstName: String, 
		$lastName: String, 
		$gender: String,
		$mob: String,
    $dob: String,
    $nation:String,
		$maritalStatus: String,
		$qualification: String,
		$pan: String, 
		$aadhaar: String ,
		$primaryEmail: String,
    $secondaryEmail: String,
    $applicationNumber: String,
    $loanAmount: String,
    $loanCity: String,
    $assetCity: String,
    $assetWorth: String,
    $loanTenure: String,
    $loanPurpose: String,
    $assetState: String,
    $assetType: String,
    $homeLoanCity: String,
    $coApplicant: String,
    $coApplicantIncome: String,
    $coApplicantEMI: String,
    $coApplicantRelation: String,
    $exiloan: String,
    $exiLoanBank: String,
    $exiEMI: String,
    $chqbnc: String,
    $exiLoanType: String,
    $transfer: String,
    $permanentAddress: String,
    $permanentAddressLandmark: String,
    $permanentAddressType: String,
    $permanentAddressPincode: String,
    $permanentAddressPincodeCity: String,
    $permanentAddressPincodeState: String,
    $permanentAddressAccomodation: String,
    $currentAddress: String,
    $currentAddressLandmark: String,
    $currentAddressType: String,
    $currentAddressPincode: String,
    $currentAddressPincodeCity: String,
    $currentAddressPincodeState: String,
    $currentAddressAccomodation: String,
    $emp: String,
    $income: String,
    $company: String,
    $turnover: String,
    $officeAddress: String,
    $officeAddressLandmark: String,
    $officeAddressPincode: String,
    $industryType: String
		) {
    updateApplicationData(input:{
      applicationNumber: $applicationNumber,
      personalDetails: {
				firstName: $firstName
				lastName: $lastName
        gender: $gender
        dob: $dob
        mob: $mob
        nation: $nation
        maritalStatus: $maritalStatus
        qualification: $qualification
        pan: $pan
        aadhaar: $aadhaar
        primaryEmail: $primaryEmail
        secondaryEmail: $secondaryEmail
      },
      loanDetails: {
        loanAmount: $loanAmount
        loanCity: $loanCity
        assetCity: $assetCity
        assetWorth: $assetWorth
        loanTenure: $loanTenure
        loanPurpose: $loanPurpose
        assetState: $assetState
        assetType: $assetType
        homeLoanCity: $homeLoanCity
      },
      bankDetails: {
        coApplicant: $coApplicant
        coApplicantIncome: $coApplicantIncome
        coApplicantEMI: $coApplicantEMI
        coApplicantRelation: $coApplicantRelation
        exiloan: $exiloan
        exiLoanBank: $exiLoanBank
        exiEMI: $exiEMI
        chqbnc: $chqbnc
        exiLoanType: $exiLoanType
        transfer: $transfer
      },
      addressDetails: {
        permanentAddress: $permanentAddress
        permanentAddressLandmark: $permanentAddressLandmark
        permanentAddressType: $permanentAddressType
        permanentAddressPincode: $permanentAddressPincode
        permanentAddressPincodeCity: $permanentAddressPincodeCity
        permanentAddressPincodeState: $permanentAddressPincodeState
        permanentAddressAccomodation: $permanentAddressAccomodation
        currentAddress: $currentAddress
        currentAddressLandmark: $currentAddressLandmark
        currentAddressType: $currentAddressType
        currentAddressPincode: $currentAddressPincode
        currentAddressPincodeCity: $currentAddressPincodeCity
        currentAddressPincodeState: $currentAddressPincodeState
        currentAddressAccomodation: $currentAddressAccomodation
      },
      employmentDetails: {
        emp: $emp
        income: $income
        company: $company
        turnover: $turnover
        officeAddress: $officeAddress
        officeAddressLandmark: $officeAddressLandmark
        officeAddressPincode: $officeAddressPincode
        industryType: $industryType
      }
    }){
      _id
    }
  }
`;

export const UPDATE_ADMIN_APPLICATION_DATA = `
mutation($applicationNumber: String, $adminStatus: String, $adminComments: String, $files: Files){
  adminSaveApplication(applicationNumber: $applicationNumber, adminStatus: $adminStatus, adminComments: $adminComments, files: $files) {
    _id
  }
}
`;

export const UPDATE_PRODUCT_DATA = `
  mutation(
    $bankName: String,
    $bankCode: String,
    $fbBankCode: String,
    $productName: String,
    $productCode: String,
    $fbProductCode: String,
    $minAge: Float,
    $maxAge: Float,
    $minIncome: Float,
    $minLoanAmount: Float,
    $maxLoanAmount: Float,
    $minLoanRatio: Float,
    $maxLoanRatio: Float,
    $minLoanTenure: Float,
    $maxLoanTenure: Float,
    $minInterestRateMen: Float,
    $minInterestRateWomen: Float,
    $minProcessingFee: Float,
    $minPreclosureCharge: Float,
    $maxPreclosureCharge: Float,
    $fbProcessingFee: Float,
    $minProcessingFeeSlab: Float,
    $maxProcessingFeeSlab: Float,
    $coApplicantMaxEMI: Float,
    $coApplicantMinAge: Float,
    $coApplicantMinSalary: Float
		) {
    updateProductData(input:{
      bankName: $bankName,
      bankCode: $bankCode,
      fbBankCode: $fbBankCode,
      productName: $productName,
      productCode: $productCode,
      fbProductCode: $fbProductCode,
      minAge: $minAge,
      maxAge: $maxAge,
      minIncome: $minIncome,
      minLoanAmount: $minLoanAmount,
      maxLoanAmount: $maxLoanAmount,
      minLoanRatio: $minLoanRatio,
      maxLoanRatio: $maxLoanRatio,
      minLoanTenure: $minLoanTenure,
      maxLoanTenure: $maxLoanTenure,
      minInterestRateMen: $minInterestRateMen,
      minInterestRateWomen: $minInterestRateWomen,
      minProcessingFee: $minProcessingFee,
      minPreclosureCharge: $minPreclosureCharge,
      maxPreclosureCharge: $maxPreclosureCharge,
      fbProcessingFee: $fbProcessingFee,
      minProcessingFeeSlab: $minProcessingFeeSlab,
      maxProcessingFeeSlab: $maxProcessingFeeSlab,
      coApplicantMaxEMI: $coApplicantMaxEMI,
      coApplicantMinAge: $coApplicantMinAge,
      coApplicantMinSalary: $coApplicantMinSalary
    }){
      _id
    }
  }
`;

export const ADD_PRODUCT_DATA = `
  mutation(
    $bankName: String,
    $bankCode: String,
    $fbBankCode: String,
    $productName: String,
    $productCode: String,
    $fbProductCode: String,
    $minAge: Float,
    $maxAge: Float,
    $minIncome: Float,
    $minLoanAmount: Float,
    $maxLoanAmount: Float,
    $minLoanRatio: Float,
    $maxLoanRatio: Float,
    $minLoanTenure: Float,
    $maxLoanTenure: Float,
    $minInterestRateMen: Float,
    $minInterestRateWomen: Float,
    $minProcessingFee: Float,
    $minPreclosureCharge: Float,
    $maxPreclosureCharge: Float,
    $fbProcessingFee: Float,
    $minProcessingFeeSlab: Float,
    $maxProcessingFeeSlab: Float,
    $coApplicantMaxEMI: Float,
    $coApplicantMinAge: Float,
    $coApplicantMinSalary: Float
		) {
    addProductData(input:{
      bankName: $bankName,
      bankCode: $bankCode,
      fbBankCode: $fbBankCode,
      productName: $productName,
      productCode: $productCode,
      fbProductCode: $fbProductCode,
      minAge: $minAge,
      maxAge: $maxAge,
      minIncome: $minIncome,
      minLoanAmount: $minLoanAmount,
      maxLoanAmount: $maxLoanAmount,
      minLoanRatio: $minLoanRatio,
      maxLoanRatio: $maxLoanRatio,
      minLoanTenure: $minLoanTenure,
      maxLoanTenure: $maxLoanTenure,
      minInterestRateMen: $minInterestRateMen,
      minInterestRateWomen: $minInterestRateWomen,
      minProcessingFee: $minProcessingFee,
      minPreclosureCharge: $minPreclosureCharge,
      maxPreclosureCharge: $maxPreclosureCharge,
      fbProcessingFee: $fbProcessingFee,
      minProcessingFeeSlab: $minProcessingFeeSlab,
      maxProcessingFeeSlab: $maxProcessingFeeSlab,
      coApplicantMaxEMI: $coApplicantMaxEMI,
      coApplicantMinAge: $coApplicantMinAge,
      coApplicantMinSalary: $coApplicantMinSalary
    })
  }
`;

export const UPDATE_LEADS_DATA = `
  mutation(
    $comment: String,
    $leadId: String,
    $refererId: String,
    $dateOfApply: String,
    $updateDate: String,
    $name: String,
    $email: String,
    $amount: String,
    $loanType: String,
    $empType: String,
    $martial: String,
    $education: String,
    $gender: String,
    $date: String,
    $income: String,
    $salaryType: String,
    $companyName: String,
    $address: String,
    $city: String,
    $state: String,
    $pinCode: String,
    $pan: String,
    $aadhaar: String,
    $status: String,
    $mobile: String
		) {
    updateLeadsData(input:{
      comment: $comment,
      leadId: $leadId,
      refererId: $refererId,
      dateOfApply: $dateOfApply,
      updateDate: $updateDate,
      name: $name,
      email: $email,
      amount: $amount,
      loanType: $loanType,
      empType: $empType,
      martial: $martial,
      education: $education,
      gender: $gender,
      date: $date,
      income: $income,
      salaryType: $salaryType,
      companyName: $companyName,
      address: $address,
      city: $city,
      state: $state,
      pinCode: $pinCode,
      pan: $pan,
      aadhaar: $aadhaar,
      status: $status,
      mobile: $mobile
    }){
      _id
    }
  }
`;

export const ADD_USER_DATA = `
  mutation(
    $email: String,
    $password: String,
    $role: String,
    $firstName: String,
    $lastName: String,
    $gender: String,
    $dob: String,
    $mobileNumber: String,
    $houseNumber: String,
    $locality: String,
    $city: String,
    $state: String,
    $pinCode: String,
    $accomodationType: String,
    $residenceYear: String,
    $addressCheck: String,
    $qualification: String,
    $employmentType: String,
    $income: String,
    $company: String,
    $pan: String
    $aadhaar: String
    $nationality: String
  ) {
    addUser(input:{
      email: $email,
      role: $role,
      password: $password,
      personalDetails: {
        firstName: $firstName,
        lastName: $lastName,
        gender: $gender,
        dob: $dob,
        mobileNumber: $mobileNumber,
      },
      addressDetails: {
        houseNumber: $houseNumber,
        locality: $locality,
        city: $city,
        state: $state,
        pinCode: $pinCode,
        accomodationType: $accomodationType,
        residenceYear: $residenceYear,
        addressCheck: $addressCheck,
      },
      educationDetails: {
        qualification: $qualification,
      },
      employeeDetails: {
        employmentType: $employmentType,
        income: $income,
        company: $company,
      },
      kycDetails: {
        pan: $pan,
        aadhaar: $aadhaar,
        nationality: $nationality,
      },
    })
  }
`;
