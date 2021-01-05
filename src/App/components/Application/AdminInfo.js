import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Autorenew from '@material-ui/icons/Autorenew';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { GET_TRANSACTIONLOG_QUERY, GET_BANK_APPLICATION_QUERY } from '../../../graphql/queries';
import { UPDATE_ADMIN_APPLICATION_DATA } from '../../../graphql/mutation';
import { FULLERTON_APPLY_URL, useClient } from '../../../client';
import { post } from 'axios';

function getSteps() {
	return ['Applying Fullerton Application'];
  }

  

const AdminInfo = props => {
	const client = useClient();
	const [applicationStatus, setApplicationStatus] = useState("");
	const [comment, setComment] = useState("");
	const [banksToApply, setBanksToApply] = useState(['fullerton']);
	const [open, setOpen] = React.useState(false);
	const [openStepper, setOpenStepper] = React.useState(false);
	const [applying, setApplying] = useState(false);;
	const [applyResponse, setApplyResponse] = useState({});
	const [transactionLogs, setTransactionLogs] = useState(null);
	const [bankApplications, setBankApplications] = useState(null);
	const [activeStep, setActiveStep] = React.useState(0);
  	const steps = getSteps();

	console.log(props);

	const getBankApplications = () => {
		client.request(GET_BANK_APPLICATION_QUERY, {
			applicationId: props.viewApplication.applicationNumber,
		}).then(data => {
			console.log(data)
			setBankApplications(data.getBankApplications || []);
			setApplicationStatus(props.viewApplication.adminStatus);
			setComment(props.viewApplication.adminComments);
		});
	}

	const getTransactionLogs = () => {
		client.request(GET_TRANSACTIONLOG_QUERY, {
			applicationId: props.viewApplication.applicationNumber,
		}).then(data => {
			console.log(data)
			setTransactionLogs(data.getTransactionLogs || []);
			setApplicationStatus(props.viewApplication.adminStatus);
			setComment(props.viewApplication.adminComments);
		});
	}

	useEffect(() => {
		if (transactionLogs === null) {
			getTransactionLogs();
		}
		if(bankApplications === null) {
			getBankApplications();
		}
	}, []);

	
	const applicationStatuses = [
		{ value: "pending", label: "Pending" },
		{ value: "in_progress", label: "In Progress" },
		{ value: "success", label: "Success" },
		{ value: "rejected", label: "Rejected" },
	];

	const banks = [
		// { value: "hdfc", label: "HDFC" },
		{ value: "fullerton", label: "Fullerton" },
	];

	const handleSaveApplication = async () => {
		const variables = {
			applicationNumber: props.viewApplication.applicationNumber,
			adminComments: comment,
			adminStatus: applicationStatus
		}
		await client.request(UPDATE_ADMIN_APPLICATION_DATA, variables);
		setApplyResponse({ success: true, message: 'Application Saved Successfully!' });
	}

	const handleBankChange = (event, value) => {
		if (event.target.checked) {
			setBanksToApply([...new Set([...banksToApply, value])])
		} else {
			setBanksToApply(banksToApply.filter(bank => bank !== value))
		}
	}

	const applyForBank = () => {
		// post(`${FULLERTON_APPLY_URL}?applicationId=FBA20200928117`, null , {
		// 	withCredentials: true,
		// 	headers: { 
		// 		'Accept': 'application/json',
		// 		'Content-Type': 'x-www-form-urlencoded'
		// 	 }
		// })
		setOpenStepper(true);
		setApplying(true);
		post(`${FULLERTON_APPLY_URL}?applicationId=${props.viewApplication.applicationNumber}`, { applicationId: props.viewApplication.applicationNumber })
			.then(response => {
				setApplying(false);
				setApplyResponse({ success: true, message: 'Applied Successfully!' });
			}).catch(error => {
				setApplying(false);
				setApplyResponse({ success: false, message: 'Error in applying, please try again later' });
			});
	}

	const closeToast = () => setApplyResponse({});

	return (
		<div>
			<br />
			<h4>Application Management </h4>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={applyResponse.message}
				message={applyResponse.message}
				autoHideDuration={5000}
				onClose={closeToast}
			/>
			<FormControl variant="outlined" style={{ width: '100%' }}>
				<InputLabel htmlFor="application-status">Application Status</InputLabel>
				<Select
					value={applicationStatus}
					onChange={(event) => { setApplicationStatus(event.target.value) }}
					label="Application Status"
				>
					{applicationStatuses.map(({ value, label }) =>
						<MenuItem key={`application-${value}`} value={value}>{label}</MenuItem>)}
				</Select>
			</FormControl>
			<br /><br />
			<TextField
				style={{ width: '100%' }}
				id="comments"
				label="Comments"
				multiline
				rows={4}
				onChange={(event) => { setComment(event.target.value) }}
				value={comment}
				variant="outlined"
			/>
			<br /><br />
			<button style={{ width: 200 }} onClick={handleSaveApplication} type="button" className="btn btn-primary btn-block">
				Save Application
			</button>
			<br />
			<h4> Banks
				{/* <IconButton onClick={console.log}><Autorenew /></IconButton> */}
			</h4>
			<FormGroup row>
				{banks.map(({ value, label }) => <FormControlLabel key={`bank-${value}`}
					control={<Checkbox checked={banksToApply.includes(value)} onChange={(event) => handleBankChange(event, value)} name={value} />}
					label={label}
				/>)}
			</FormGroup>
			<button style={{ width: 200 }} disabled={!banksToApply.length} onClick={applyForBank} type="button" className="btn btn-primary btn-block">
				Apply Bank
			</button>
			<br />
			<h4>Applications
				<IconButton onClick={getBankApplications}><Autorenew /></IconButton>
			</h4>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Sr.No</TableCell>
							<TableCell>Bank</TableCell>
							<TableCell>Date/Time</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Logs</TableCell>
							{/* <TableCell align="right">Action</TableCell> */}
						</TableRow>
					</TableHead>
					<TableBody>
						{bankApplications && Boolean(bankApplications.length) && bankApplications.map((bankApplication, index) =>  <TableRow>
							<TableCell>{1}</TableCell>
							<TableCell>{bankApplication.bankName || 'NA'}</TableCell>
							<TableCell>{bankApplication.updatedAt || 'NA'}</TableCell>
							<TableCell>{bankApplication.status || 'NA'}</TableCell>
							<TableCell>
								<Link href="#" onClick={() => setOpen(true)} variant="body2">logs</Link>
							</TableCell>
							{/* <TableCell align="right"><Autorenew style={{ cursor: 'pointer', marginRight: 10 }} onClick={console.log} /><DeleteForeverIcon style={{ cursor: 'pointer' }} onClick={console.log} /></TableCell> */}
						</TableRow>)}
						{(!bankApplications || Boolean(!bankApplications.length)) && <TableRow>
							<TableCell colSpan={5}>No Records</TableCell>
						</TableRow>}
					</TableBody>
				</Table>
			</TableContainer>
			<Dialog
				maxWidth="lg"
				fullWidth="true"
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">Transaction Logs</DialogTitle>
				<DialogContent>
					<DialogContentText>Please find the transaction logs below</DialogContentText>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Sr.No</TableCell>
									<TableCell>Date/Time</TableCell>
									<TableCell>Status</TableCell>
									<TableCell>Request</TableCell>
									<TableCell>Response</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{transactionLogs && Boolean(transactionLogs.length) && transactionLogs.map((transactionLog, index) => <TableRow>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{transactionLog.timeStamp || 'NA'}</TableCell>
									<TableCell>{transactionLog.endPoint || 'NA'}</TableCell>
									<TableCell>{transactionLog.request || 'NA'}</TableCell>
									<TableCell>{transactionLog.response || 'NA'}</TableCell>
								</TableRow>)}

							</TableBody>
							{(!transactionLogs || Boolean(!transactionLogs.length)) && <TableRow>
								<TableCell colSpan={5}>No Records</TableCell>
							</TableRow>}
						</Table>
					</TableContainer>
				</DialogContent>
				<DialogActions>
					<button style={{ width: 100 }} onClick={() => setOpen(false)} type="button" className="btn btn-danger btn-block">
						OK
			</button>
				</DialogActions>
			</Dialog>
			<Dialog
				maxWidth="md"
				open={openStepper}
				onClose={() => setOpenStepper(false)}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">Apply Bank</DialogTitle>
				<DialogContent>
					<Stepper nonLinear activeStep={activeStep}>
						{steps.map((label) => (
							<Step key={label} completed={!applying}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
				</DialogContent>
				<DialogActions>
					<button disabled={applying} style={{ width: 100 }} onClick={() => setOpenStepper(false)} type="button" className="btn btn-danger btn-block">
						OK
			</button>
				</DialogActions>
			</Dialog>
		</div >
	);
}

export default AdminInfo;