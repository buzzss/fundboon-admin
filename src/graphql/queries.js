export const GET_VISITORS = `
	query{
		getVisitors
	}
`

export const GET_ACCOUNTS_TODAY = `
	query{
		getAccountsToday
	}
`

export const GET_APPLICATIONS_TODAY = `
	query{
		getApplicationsToday
	}
`

export const GET_ENQUIRIES_TODAY = `
	query{
		getEnquiriesToday
	}
`

export const GET_APPLICATION_SERVICE_LOG = `
	query{
		getApplicationServiceLog{
			homeLoan{
				today
				monthly
				yearly
				all
			}
			personalLoan{
				today
				monthly
				yearly
				all
			}
			buisnessLoan{
				today
				monthly
				yearly
				all
			}
			overdraft{
				today
				monthly
				yearly
				all
			}
			mortgage{
				today
				monthly
				yearly
				all
			}
		}
	}
`

export const USER_EXISTS_QUERY = `
  query($email: String!) {
    userExists(email: $email)
  }
`;

export const GET_ADMIN_USER_QUERY = `
	query{
	  getAdmin{
        email
	    altEmail
    	personalDetails {
    		salutation
    		firstName
    		lastName
    		gender
    		dob
    		age
    		mobileNumber
    		nationality
    		pan
    		aadhar
    		ptype
    	},
    	contactDetails{
    		permanentAddress
    		communicationAddress
    	},
    	educationDetails{
    		qualification
    	},
    	employmentDetails{
    		officeName
    		officeAddress
    	}
	  }
	}
`;

export const GET_ALL_APPLICATIONS_QUERY = `
  query {
    getAllApplicationsRequest {
      applicationNumber
      applicantId
      policyId
	  type
	  bankName
	  loanDetails{
		loanAmount
		loanCity
		assetCity
		assetWorth
		loanTenure
		loanPurpose
		assetState
		assetType
		homeLoanCity
	  },
	  bankDetails{
		coApplicant
		coApplicantIncome
		coApplicantEMI
		coApplicantRelation
		exiloan
		exiLoanBank
		exiEMI
		chqbnc
		exiLoanType
		transfer
	  },
	  personalDetails{
		firstName
		lastName
		gender
		dob
		mob
		maritalStatus
		qualification
		pan
		aadhaar
		nation
		primaryEmail
		secondaryEmail
	  },
	  addressDetails{
		permanentAddress
		permanentAddressLandmark
		permanentAddressType
		permanentAddressPincode
		permanentAddressPincodeCity
		permanentAddressPincodeState
		permanentAddressAccomodation
		currentAddress
		currentAddressLandmark
		currentAddressType
		currentAddressPincode
		currentAddressPincodeCity
		currentAddressPincodeState
		currentAddressAccomodation
	  },
	  employmentDetails{
		emp
		income
		company
		turnover
		officeAddress
		officeAddressLandmark
		officeAddressPincode
		industryType
	  }
      appliedAt
      applicationComplete
	  reviewStatus
	  adminStatus
	  adminComments
	  files {
		addressProof
  		identityProof
  		employmentProof
  		incomeProof
	  }
    }
  }
`;

export const GET_ALL_PRODUCTS_QUERY = `
  query {
    getAllProducts {
		_id
		bankName
		bankCode
		fbBankCode
		productName
		productCode
		fbProductCode
		minAge
		maxAge
		minIncome
		minLoanAmount
		maxLoanAmount
		minLoanRatio
		maxLoanRatio
		minLoanTenure
		maxLoanTenure
		minInterestRateMen
		minInterestRateWomen
		minProcessingFee
		minPreclosureCharge
		maxPreclosureCharge
		fbProcessingFee
		minProcessingFeeSlab
		maxProcessingFeeSlab
		coApplicantMaxEMI
		coApplicantMinAge
		coApplicantMinSalary
		documents
		eligibilty
		details
		fbOffers
	}
  }
`;

export const GET_ALL_LEADS_QUERY = `
  query {
    getAllLeads {
		comment
		leadId
		refererId
		dateOfApply
		updateDate
		name
		email
		amount
		loanType
		empType
		martial
		education
		gender
		date
		income
		salaryType
		companyName
		address
		city
		state
		pinCode
		pan
		aadhaar
		status
		mobile
	}
  }
`;

export const getAllUsersForAdmin = `
query{
	getUsersAdmin{
	  createdDate,
	  updatedDate,
	  lastLoginDate,
	  id,
	  role,
	  personalDetails{
		firstName
		lastName
	  },
	  adminViewID,
	  deactivate
	}
  }
`;

export const GET_USER_QUERY = `
	query($id:ID!){
	getUser(input: $id){
		email
		role
    	personalDetails {
    		firstName
			lastName
			name
			gender
			dob
			mobileNumber
    	},
    	addressDetails{
    		houseNumber
			locality
			city
			state
			pinCode
			accomodationType
			residenceYear
			addressCheck
    	},
    	educationDetails{
    		qualification
    	},
    	employmentDetails{
    		employmentType
			income
			company
		},
		kycDetails{
			pan
			aadhaar
			nationality
		}
	  }
	}
`;

export const GET_USER_APPLICATION_QUERY = `
  query($id: ID!) {
	getUserApplications(input: $id) {
      applicationNumber
      applicantId
      policyId
	  type
	  bankName
	  loanDetails{
		loanAmount
		loanCity
		assetCity
		assetWorth
		loanTenure
		loanPurpose
		assetState
		assetType
		homeLoanCity
	  },
	  bankDetails{
		coApplicant
		coApplicantIncome
		coApplicantEMI
		coApplicantRelation
		exiloan
		exiLoanBank
		exiEMI
		chqbnc
		exiLoanType
		transfer
	  },
	  personalDetails{
		firstName
		lastName
		gender
		dob
		mob
		maritalStatus
		qualification
		pan
		aadhaar
		nation
		primaryEmail
		secondaryEmail
	  },
	  addressDetails{
		permanentAddress
		permanentAddressLandmark
		permanentAddressType
		permanentAddressPincode
		permanentAddressPincodeCity
		permanentAddressPincodeState
		permanentAddressAccomodation
		currentAddress
		currentAddressLandmark
		currentAddressType
		currentAddressPincode
		currentAddressPincodeCity
		currentAddressPincodeState
		currentAddressAccomodation
	  },
	  employmentDetails{
		emp
		income
		company
		turnover
		officeAddress
		officeAddressLandmark
		officeAddressPincode
		industryType
	  }
      appliedAt
      applicationComplete
	  reviewStatus
	  adminStatus
	  adminComments
	  files {
		addressProof
  		identityProof
  		employmentProof
  		incomeProof
	  }
    }
  }
`;

export const GET_TRANSACTIONLOG_QUERY = `
  query($applicationId: String!) {
	getTransactionLogs(applicationId: $applicationId) {
		applicationId
		bankName
		request
		response
		timeStamp
		endPoint
	}
  }
`;

export const GET_BANK_APPLICATION_QUERY = `
  query($applicationId: String!) {
	getBankApplications(applicationId: $applicationId) {
		bankName
		updatedAt
		status
	}
  }
`;