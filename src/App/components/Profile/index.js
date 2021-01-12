import React from 'react';
import {Row, Col, Card, Image, Button,Form} from 'react-bootstrap';
import {useClient} from '../../../client';
import DatePicker from 'react-datepicker';

import {GET_ADMIN_USER_QUERY} from '../../../graphql/queries';
import {UPDATE_ADMIN_USER_PROFILE} from '../../../graphql/mutation';

import "react-datepicker/dist/react-datepicker.css";

// todo: update cookie username, validation before updating, invalid change for altEmail

class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			editProfileSwitch: false,
			profile: null,
			imgPath: '/home/dxmxnlord/Downloads/gg.png',
			profileEdit : null,
			invalid:{
				altEmail: false,
				personalDetails: {
					salutation: false,
					firstName: false,
					lastName: false,
					gender: false,
					dob: false,
					age: false,
					mobileNumber: false,
					nationality: false,
					pan: false,
					aadhar: false,
				},
				contactDetails:{
					permanentAddress: false,
					communicationAddress: false,
				},
				educationDetails:{
					qualification: false,
				},
				employmentDetails:{
					officeName: false,
					officeAddress: false,
				}
			},
			msg: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleInvalid = this.handleInvalid.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	static calculateAge(dateString) {
	  var birthday = +new Date(dateString);
	  return ~~((Date.now() - birthday) / (31557600000));
	}

	async componentDidMount(){
		const client = useClient();
		const profile = await client.request(GET_ADMIN_USER_QUERY);
		this.setState({profile: {...profile.getAdmin}});
		let { email, ...nonEmail} = profile.getAdmin;
		let { ptype, ...nonPType} = nonEmail.personalDetails;
		nonEmail.personalDetails = nonPType;
		this.setState({profileEdit: {...nonEmail}});
	}

	handleChange(event,section,value,targetValue) {
		if(event)
			event.preventDefault();
		let newProfileEdit = this.state.profileEdit;

		if(section !== null)
			if(event)
				newProfileEdit[section][value] = event.target.value;
			else
				newProfileEdit[section][value] = targetValue;
		else
			if(event)
				newProfileEdit[value] = event.target.value;
			else
				newProfileEdit[value] = targetValue;

		this.setState({profileEdit: newProfileEdit});
	}

	handleInvalid(section,value,revert) {

		let newInvalid = this.state.invalid;

		if(section !== null)
			newInvalid[section][value] = revert ? false : true;
		else
			newInvalid[value] = revert ? false : true;

		this.setState({invalid: newInvalid});
	}

	async handleSubmit(event){
		event.preventDefault();
		const {
			profileEdit : {
				altEmail,
				personalDetails: {
					salutation,
					firstName,
					lastName,
					gender,
					dob,
					age,
					mobileNumber,
					nationality,
					pan,
					aadhar,
				},
				contactDetails:{
					permanentAddress,
					communicationAddress,
				},
				educationDetails:{
					qualification,
				},
				employmentDetails:{
					officeName,
					officeAddress,
				}
			}
		} = this.state;

		const variables = {
			altEmail,
			salutation,
			firstName,
			lastName,
			gender,
			dob,
			age,
			mobileNumber,
			nationality,
			pan,
			aadhar,
			permanentAddress,
			communicationAddress,
			qualification,
			officeName,
			officeAddress,
		}

		const client = useClient();
		try{
			await client.request(UPDATE_ADMIN_USER_PROFILE,variables);
			this.setState({msg: {type: "success", val: "Updated Your Profile"},editProfileSwitch: false })
			const profile = await client.request(GET_ADMIN_USER_QUERY);
			this.setState({profile: {...profile.getAdmin}});
		} catch(err) {
			this.setState({msg: {type: "error", val: err}})
		}
	}

	render(){

		const { editProfileSwitch } = this.state;
		console.log(this.state.profile && Profile.calculateAge(this.state.profile.personalDetails.dob))

		const showProfile = (
			<Row>
				<Col className="" sm={2}>
					<Card>
					<Card.Body className="d-flex justify-content-center">
						{ this.state.msg &&
							<Row className="mb-5">
								<Col className="mb-3">
									<h4 className={this.state.msg && this.state.msg == "error" ? "text-danger" : "text-success"}> {this.state.msg.val} </h4>
								</Col>
							</Row>
						}
						<Row>
							<Col className="">
								<Button variant="outline-primary" onClick={() => {this.setState({editProfileSwitch: true, msg: null})}}>Edit Profile</Button>{' '}
							</Col>
						</Row>
					</Card.Body>
					</Card>
				</Col>
				<Col className="mb-3">
					<Card>
						<Card.Header as="h3">Details</Card.Header>
						<Card.Body>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Email</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.email}</h4>
								</Col>
							</Row>
								<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Alternate Email</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.altEmail}</h4>
								</Col>
							</Row>
						</Card.Body>
						<Card.Header as="h3">Personal Details</Card.Header>
						<Card.Body>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Salutation</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.personalDetails.salutation}</h4>
								</Col>
							</Row>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>First Name</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.personalDetails.firstName}</h4>
								</Col>
							</Row>
							<Row className="justify-content-between">	
								<Col className="mb-3">
									<h4>Last Name</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile  && this.state.profile.personalDetails.lastName}</h4>
								</Col>
							</Row>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Gender</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.personalDetails.gender}</h4>
								</Col>
							</Row>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Date of Birth</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.personalDetails.dob.substr(4,11)}</h4>
								</Col>
							</Row>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Age</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && Profile.calculateAge(new Date(this.state.profile.personalDetails.dob))}</h4>
								</Col>
							</Row>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Mobile Number</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.personalDetails.mobileNumber}</h4>
								</Col>
							</Row>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Nationality</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.personalDetails.nationality}</h4>
								</Col>
							</Row>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Pan</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.personalDetails.pan}</h4>
								</Col>
							</Row>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Aadhar</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.personalDetails.aadhar}</h4>
								</Col>
							</Row>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Type</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.personalDetails.ptype}</h4>
								</Col>
							</Row>
						</Card.Body>
						<Card.Header as="h3">Contact Details</Card.Header>
						<Card.Body>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Permanent Address</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.contactDetails.permanentAddress}</h4>
								</Col>
							</Row>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Communication Address</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.contactDetails.communicationAddress}</h4>
								</Col>
							</Row>
						</Card.Body>
						<Card.Header as="h3">Education Details</Card.Header>
						<Card.Body>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Qualification</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.educationDetails.qualification}</h4>
								</Col>
							</Row>
						</Card.Body>
						<Card.Header as="h3">Employment Details</Card.Header>
						<Card.Body>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Office Name</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.employmentDetails.officeName}</h4>
								</Col>
							</Row>
							<Row className="justify-content-between">
								<Col className="mb-3">
									<h4>Office Address</h4>
								</Col>
								<Col className="mb-3">
									<h4 className="text-muted">{this.state.profile && this.state.profile.employmentDetails.officeAddress}</h4>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		)

		const editProfile = (
			<Row>
				<Col className="mb-3" sm={2}>
					<Card>
					<Card.Body className="d-flex justify-content-center">
						<Row>
							<Col className="mb-3">
								<Button variant="outline-primary" onClick={(e) => {this.handleSubmit(e)}}>Save Profile</Button>{' '}
							</Col>
						</Row>
						<Row>
							<Col className="mb-3">
								<Button variant="outline-primary" onClick={() => {this.setState({editProfileSwitch: false})}}>Go Back</Button>{' '}
							</Col>
						</Row>
					</Card.Body>
					</Card>
				</Col>
				<Col className="mb-3">
					<Card>
						<Card.Header as="h3">Details</Card.Header>
						<Card.Body>
							<Row className="justify-content-between mb-2">
								<Col className="mb-3">
									<h4>Alternate Email</h4>
								</Col>
								<Col className="mb-3">
									<Form.Control 
										type="email" 
										placeholder="Enter alternate email" 
										value = {this.state.profileEdit && this.state.profileEdit.altEmail}
										isInvalid = {this.state.invalid.altEmail}
										onChange = {(e) => {this.handleChange(e,null,"altEmail")}}
									/>
								</Col>
							</Row>
						</Card.Body>
						<Card.Header as="h3">Personal Details</Card.Header>
						<Card.Body>
							<Row className="justify-content-between mb-2">
								<Col className="mb-3">
									<h4>Salutation</h4>
								</Col>
								<Col className="mb-3">
									<Form.Control 
										as="select"
										custom 
										placeholder="Salutation" 
										onChange = {(e) => {this.handleChange(e,"personalDetails","salutation")}}
										value = {this.state.profileEdit && this.state.profileEdit.personalDetails.salutation}
										isInvalid = {this.state.invalid.personalDetails.salutation}
									>
										<option value="Mr.">Mr.</option>
										<option value="Ms.">Ms.</option>
										<option value="Mrs.">Mrs.</option>
									</Form.Control>
								</Col>
							</Row>
							<Row className="justify-content-between mb-2">
								<Col className="mb-3">
									<h4>First Name</h4>
								</Col>
								<Col className="mb-3">
								<Form.Control 
									type="text" 
									placeholder="First Name" 
									onChange = {(e) => {this.handleChange(e,"personalDetails","firstName")}}
									value = {this.state.profileEdit && this.state.profileEdit.personalDetails.firstName}
									isInvalid = {this.state.invalid.personalDetails.firstName}
								/>
								</Col>
							</Row>
							<Row className="justify-content-between mb-2">	
								<Col className="mb-3">
									<h4>Last Name</h4>
								</Col>
								<Col className="mb-3">
									<Form.Control 
										type="text" 
										placeholder="Last Name" 
										onChange = {(e) => {this.handleChange(e,"personalDetails","lastName")}}
										value = {this.state.profileEdit && this.state.profileEdit.personalDetails.lastName}
										isInvalid = {this.state.invalid.personalDetails.lastName}
									/>
								</Col>
							</Row>
							<Row className="justify-content-between mb-2">
								<Col className="mb-3">
									<h4>Gender</h4>
								</Col>
								<Col className="mb-3">
									<Form.Control 
										as="select"
										custom
										placeholder="Gender" 
										onChange = {(e) => {this.handleChange(e,"personalDetails","gender")}}
										value = {this.state.profileEdit && this.state.profileEdit.personalDetails.gender}
										isInvalid = {this.state.invalid.personalDetails.gender}
									>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="other">Other</option>
									</Form.Control>
								</Col>
							</Row>
							<Row className="justify-content-between mb-2">
								<Col className="mb-3">
									<h4>Date of Birth</h4>
								</Col>
								<Col className="mb-3">
									<DatePicker selected={this.state.profileEdit && this.state.profileEdit.personalDetails.dob ? new Date(this.state.profileEdit.personalDetails.dob) : new Date()} onChange={(date) => {this.handleChange(null,"personalDetails","dob",date.toString())}} />
								</Col>
							</Row>

							<Row className="justify-content-between mb-2">
								<Col className="mb-3">
									<h4>Mobile Number</h4>
								</Col>
								<Col className="mb-3">
									<Form.Control 
										type="text" 
										placeholder="Phone Number" 
										onChange = {(e) => {
											this.handleChange(e,"personalDetails","mobileNumber");
											! /^\d{10}$/.test(e.target.value) ? this.handleInvalid("personalDetails","mobileNumber") : this.handleInvalid("personalDetails","mobileNumber",true);
										}}
										value = {this.state.profileEdit && this.state.profileEdit.personalDetails.mobileNumber}
										isInvalid = {this.state.invalid.personalDetails.mobileNumber}
									/>
								</Col>
							</Row>
							<Row className="justify-content-between mb-2">
								<Col className="mb-3">
									<h4>Nationality</h4>
								</Col>
								<Col className="mb-3">
									<Form.Control 
										type="text" 
										placeholder="Nationality" 
										onChange = {(e) => {this.handleChange(e,"personalDetails","nationality")}}
										value = {this.state.profileEdit && this.state.profileEdit.personalDetails.nationality}
										isInvalid = {this.state.invalid.personalDetails.nationality}
									/>
								</Col>
							</Row>
							<Row className="justify-content-between mb-2">
								<Col className="mb-3">
									<h4>Pan</h4>
								</Col>
								<Col className="mb-3">
									<Form.Control 
										type="text" 
										placeholder="PAN" 
										onChange = {(e) => {
											this.handleChange(e,"personalDetails","pan");
											! /[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(e.target.value) ? this.handleInvalid("personalDetails","pan") : this.handleInvalid("personalDetails","pan",true)
										}}
										value = {this.state.profileEdit && this.state.profileEdit.personalDetails.pan}
										isInvalid = {this.state.invalid.personalDetails.pan}
									/>									
								</Col>
							</Row>
							<Row className="justify-content-between mb-2">
								<Col className="mb-3">
									<h4>Aadhar</h4>
								</Col>
								<Col className="mb-3">
									<Form.Control 
										type="text" 
										placeholder="Aadhar" 
										onChange = {(e) => {
											this.handleChange(e,"personalDetails","aadhar");
											! /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/.test(e.target.value) ? this.handleInvalid("personalDetails","aadhar") : this.handleInvalid("personalDetails","aadhar",true)
										}}
										value = {this.state.profileEdit && this.state.profileEdit.personalDetails.aadhar}
										isInvalid = {this.state.invalid.personalDetails.aadhar}
									/>
								</Col>
							</Row>
						</Card.Body>
						<Card.Header as="h3">Contact Details</Card.Header>
						<Card.Body>
							<Row className="justify-content-between mb-2">
								<Col className="mb-3">
									<h4>Permanent Address</h4>
								</Col>
								<Col className="mb-3">
									<Form.Control 
										type="text" 
										placeholder="Permanent Address" 
										onChange = {(e) => {this.handleChange(e,"contactDetails","permanentAddress")}}
										value = {this.state.profileEdit && this.state.profileEdit.contactDetails.permanentAddress}
										isInvalid = {this.state.invalid.contactDetails.permanentAddress}
									/>
								</Col>
							</Row>
							<Row className="justify-content-between mb-2">
								<Col className="mb-3">
									<h4>Communication Address</h4>
								</Col>
								<Col className="mb-3">
									<Form.Control 
										type="text" 
										placeholder="Contact Address" 
										onChange = {(e) => {this.handleChange(e,"contactDetails","communicationAddress")}}
										value = {this.state.profileEdit && this.state.profileEdit.contactDetails.communicationAddress}
										isInvalid = {this.state.invalid.contactDetails.communicationAddress}
									/>
								</Col>
							</Row>
						</Card.Body>
						<Card.Header as="h3">Education Details</Card.Header>
						<Card.Body>
							<Row className="justify-content-between mb-2">
								<Col className="mb-3">
									<h4>Qualification</h4>
								</Col>
								<Col className="mb-3">
									<Form.Control 
										as="select"
										custom
										placeholder="Qualification" 
										onChange = {(e) => {this.handleChange(e,"educationDetails","qualification")}}
										value = {this.state.profileEdit && this.state.profileEdit.educationDetails.qualification}
										isInvalid = {this.state.invalid.educationDetails.qualification}
									>
										<option value="Under Graduate">Under Graduate</option>
										<option value="Post Graduate">Post Graduate</option>
										<option value="Doctorate">Doctorate</option>
										<option value="Professional Degree">Professional Degree</option>
									</Form.Control>
								</Col>
							</Row>
						</Card.Body>
						<Card.Header as="h3">Employment Details</Card.Header>
						<Card.Body>
							<Row className="justify-content-between mb-2">
								<Col className="mb-3">
									<h4>Office Name</h4>
								</Col>
								<Col className="mb-3">
									<Form.Control 
										type="text" 
										placeholder="Office Name" 
										onChange = {(e) => {this.handleChange(e,"employmentDetails","officeName")}}
										value = {this.state.profileEdit && this.state.profileEdit.employmentDetails.officeName}
										isInvalid = {this.state.invalid.employmentDetails.officeName}
									/>
								</Col>
							</Row>
							<Row className="justify-content-between mb-2">
								<Col className="mb-3">
									<h4>Office Address</h4>
								</Col>
								<Col className="mb-3">
									<Form.Control 
										type="text" 
										placeholder="Office Address" 
										onChange = {(e) => {this.handleChange(e,"employmentDetails","officeAddress")}}
										value = {this.state.profileEdit && this.state.profileEdit.employmentDetails.officeAddress}
										isInvalid = {this.state.invalid.employmentDetails.officeAddress}
									/>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		)
		
		return (
			<>
				{editProfileSwitch ? editProfile : showProfile}
			</>
		);
	}
}

export default Profile;