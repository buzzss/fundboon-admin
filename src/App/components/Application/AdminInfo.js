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
import { GET_TRANSACTIONLOG_QUERY } from '../../../graphql/queries';
import { UPDATE_ADMIN_APPLICATION_DATA } from '../../../graphql/mutation';
import { FULLERTON_APPLY_URL, useClient } from '../../../client';
import { post } from 'axios';

const AdminInfo = props => {
	const client = useClient();
	const [applicationStatus, setApplicationStatus] = useState("");
	const [comment, setComment] = useState("");
	const [banksToApply, setBanksToApply] = useState(['fullerton']);
	const [open, setOpen] = React.useState(false);
	const [applying, setApplying] = useState(false);;
	const [applyResponse, setApplyResponse] = useState({});
	const [transactionLogs, setTransactionLogs] = useState(null);
	console.log(props);
	useEffect(() => {
		if (transactionLogs === null) {
			client.request(GET_TRANSACTIONLOG_QUERY, {
				applicationId: props.viewApplication.applicationNumber,
			}).then(data => {
				console.log(data)
				setTransactionLogs(data.getTransactionLogs || []);
				setApplicationStatus(props.viewApplication.adminStatus);
				setComment(props.viewApplication.adminComments);
			});
		}
	});
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
		post(`${FULLERTON_APPLY_URL}?applicationId=${props.viewApplication.applicationNumber}`, { applicationId: props.viewApplication.applicationNumber })
			.then(response => {
				console.log(response)
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
				{/* <IconButton onClick={console.log}><Autorenew /></IconButton> */}
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
						{transactionLogs && transactionLogs.length && <TableRow>
							<TableCell>{1}</TableCell>
							<TableCell>{transactionLogs[transactionLogs.length - 1].bankName || 'NA'}</TableCell>
							<TableCell>{transactionLogs[transactionLogs.length - 1].timeStamp || 'NA'}</TableCell>
							<TableCell>{transactionLogs[transactionLogs.length - 1].endPoint || 'NA'}</TableCell>
							<TableCell>
								<Link href="#" onClick={() => setOpen(true)} variant="body2">logs</Link>
							</TableCell>
							{/* <TableCell align="right"><Autorenew style={{ cursor: 'pointer', marginRight: 10 }} onClick={console.log} /><DeleteForeverIcon style={{ cursor: 'pointer' }} onClick={console.log} /></TableCell> */}
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
								{transactionLogs && transactionLogs.map((transactionLog, index) => <TableRow>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{transactionLog.timeStamp || 'NA'}</TableCell>
									<TableCell>{transactionLog.endPoint || 'NA'}</TableCell>
									<TableCell>{transactionLog.request || 'NA'}</TableCell>
									<TableCell>{transactionLog.response || 'NA'}</TableCell>
								</TableRow>)}

							</TableBody>
						</Table>
					</TableContainer>
				</DialogContent>
				<DialogActions>
					<button style={{ width: 100 }} onClick={() => setOpen(false)} type="button" className="btn btn-danger btn-block">
						OK
			</button>
				</DialogActions>
			</Dialog>
		</div >
	);
}

export default AdminInfo;