import React, { useState, createRef } from 'react';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { UPDATE_ADMIN_APPLICATION_DATA } from '../../../graphql/mutation';
import { FILE_UPLOAD_URL, useClient } from '../../../client';
// import axios, { post } from 'axios';

const UploadDocuments = props => {
    const client = useClient();
    const [documentType, setDocumentType] = useState("address_proof");
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);;
    const [uploadResponse, setUploadResponse] = useState({});

    const documentTypes = [
        { value: "address_proof", label: "Address Proof" },
        { value: "identity_proof", label: "Identity Proof" },
        { value: "employment_proof", label: "Employment Proof" },
        { value: "income_proof", label: "Income Proof" },
    ];

    const getDocumentDetail = (type) => documentTypes.find(item => item.value === type);

    const fileInputRef = createRef();
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // props.setCompleted();
            props.nextStep();
        } catch (err) {
            console.log(err);
        }
    };
    const preventDefault = (event) => event.preventDefault();

    const prefillDocumentType = (items) => {
        const usedTypes = items.map(item => item.value);
        const nextType = documentTypes.find(item => !usedTypes.includes(item.value));
        if (nextType) {
            setDocumentType(nextType.value);
        }
    }

    const enableDocuments = () => {
        const types = files.map(item => item.value);
        return types.length ? Boolean(documentTypes.find(item => !types.includes(item.value))) : true;
    }

    const disableDocument = (type) => {
        return Boolean(files.find(item => item.value === type));
    }

    const removeItem = (index) => {
        const tempFiles = [...files];
        tempFiles.splice(index, 1);
        setFiles(tempFiles);
        prefillDocumentType(tempFiles)
    }

    const openFileDialog = () => {
        if (uploading) return;
        fileInputRef.current.click();
    }

    const onFilesAdded = (event) => {
        if (uploading || !event || !event.target.files || !event.target.files.length) return;
        const tempFiles = [...files, { ...getDocumentDetail(documentType), fileName: event.target.files[0].name, file: event.target.files[0], filePreview: URL.createObjectURL(event.target.files[0]) }]
        setFiles(tempFiles);
        prefillDocumentType(tempFiles);
    }

    const onDrop = (event) => {
        event.preventDefault();
        if (uploading || !event || !event.target.files || !event.target.files.length) return;
        const tempFiles = [...files, { ...getDocumentDetail(documentType), fileName: event.target.files[0].name, file: event.target.files[0] }]
        setFiles(tempFiles);
        prefillDocumentType(tempFiles);
    }

    const handleSaveApplication = async () => {
        let _files = {};
        files.forEach(({ value, fileName }) => {
            _files[value] = fileName;
        })
        const variables = {
            applicationNumber: props.viewApplication.applicationNumber,
            files: _files
        }
        await client.request(UPDATE_ADMIN_APPLICATION_DATA, variables);
    }

    const fileUpload = async () => {
        setUploading(true);
        const formData = new FormData();
        files.forEach(({ value, file }) => {
            console.log(file)
            formData.append(value, file);
        })
        //formData.append("targetFolder", "XTYS1234489");
        const config = {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data',
                'targetfolder': 'XTYS1234489'
            }
        }
        // post(FILE_UPLOAD_URL, formData, config)
        //     .then(response => {
        //         setUploading(false);
        //         setUploadResponse({ success: true, message: 'Documents Uploaded Successfully!' });
        //     }).catch(error => {
        //         setUploading(false);
        //         //setUploadResponse({ success: false, message: 'Error in uploading documents, please try again later' });
        //         setUploadResponse({ success: true, message: 'Documents Uploaded Successfully!' });
        //     });
        // const request = new XMLHttpRequest();
        // request.open("POST", FILE_UPLOAD_URL);
        // request.send(formData);
        // request.onreadystatechange = function () {
        //     if (request.readyState === XMLHttpRequest.DONE) {
        //         setUploading(false);
        //         if (request.status === 200) {
        //             setUploadResponse({ success: true, message: 'Documents Uploaded Successfully!' });
        //         } else {
        //             setUploadResponse({ success: false, message: 'Error in uploading documents, please try again later' });
        //         }
        //     }
        // }
        handleSaveApplication();
        setUploading(false);
    }

    const closeToast = () => setUploadResponse({});

    return (
        <form onSubmit={handleSubmit}>
            <Card variant="outlined">
                <CardContent>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={uploadResponse.message}
                        message={uploadResponse.message}
                        autoHideDuration={5000}
                        onClose={closeToast}
                    />
                    <Grid container spacing={3}>
                        <Grid item xs={files.length ? 4 : 12}>
                            <FormControl variant="outlined" style={{ width: '100%' }}>
                                <InputLabel htmlFor="document-type">Document Type</InputLabel>
                                <Select
                                    value={documentType}
                                    onChange={(event) => { setDocumentType(event.target.value) }}
                                    label="Document Type"
                                    disabled={!enableDocuments()}
                                >
                                    {documentTypes.map(({ value, label }) =>
                                        <MenuItem disabled={disableDocument(value)} key={`document-type-${value}`} value={value}>{label}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <div style={{
                                borderRadius: '50%',
                                border: '2px dashed darkgray',
                                width: 200,
                                height: 200,
                                margin: '20px auto'
                            }}
                                onDragOver={preventDefault}
                                onDragLeave={preventDefault}
                                onDrop={() => enableDocuments() && onDrop()}
                                onClick={() => enableDocuments() && openFileDialog()}>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    onChange={onFilesAdded}
                                    style={{ display: 'none' }}
                                />
                                <CloudUploadIcon color="action" style={{
                                    fontSize: 150, margin: '15px auto',
                                    display: 'flex'
                                }} />
                            </div>
                        </Grid>
                        {Boolean(files.length) && <Grid item xs={8}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Type</TableCell>
                                            <TableCell style={{ paddingLeft: 0, paddingRight: 0 }}>Name</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {files.map(({ value, label, fileName, filePreview }, index) => <TableRow key={value}>
                                            <TableCell component="th" scope="row">{label}</TableCell>
                                            <TableCell style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                <Link target="_blank" rel="noopener noreferrer" href={filePreview} variant="body2">
                                                    {fileName}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="right"><DeleteForeverIcon onClick={() => removeItem(index)} /></TableCell>
                                        </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <br />
                            <button onClick={fileUpload} type="button" className="btn btn-primary btn-block">
                                {uploading ? <CircularProgress size={20} /> : 'Upload Documents'}
                            </button>
                        </Grid>}

                    </Grid>
                </CardContent>
            </Card>
        </form>
    );
};

export default UploadDocuments;
