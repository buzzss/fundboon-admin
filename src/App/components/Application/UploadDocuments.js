import React, { useState, useEffect, createRef } from 'react';
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
import { GET_APPLICATION_FILES_QUERY } from '../../../graphql/queries';
import { UPDATE_ADMIN_FILES_DATA } from '../../../graphql/mutation';
import { FILE_UPLOAD_URL, FILE_DOWNLOAD_URL, useClient } from '../../../client';

const UploadDocuments = props => {
    const client = useClient();
    const [documentType, setDocumentType] = useState("");
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);;
    const [uploadResponse, setUploadResponse] = useState({});

    const documentTypes = [
        { value: "addressProof", label: "Address Proof" },
        { value: "identityProof", label: "Identity Proof" },
        { value: "employmentProof", label: "Employment Proof" },
        { value: "incomeProof", label: "Income Proof" },
    ];

    const getDocumentDetail = (type) => documentTypes.find(item => item.value === type);

    useEffect(() => {
        client.request(GET_APPLICATION_FILES_QUERY, {
			applicationId: props.viewApplication.applicationNumber,
		}).then(data => {
            let fileResponse = data.getApplicationFiles || {};
            let tempFiles = [];
            let _documentType = documentType;
            Object.keys(fileResponse).forEach(key => {
                if (fileResponse[key]) {
                    let _fileNameArray = fileResponse[key].split('.');
                    let filePreview = `${FILE_DOWNLOAD_URL}?applicationId=${props.viewApplication.applicationNumber}&fileName=${key.split(/(?=[A-Z])/).join('_').toLowerCase()}.${_fileNameArray[_fileNameArray.length - 1]}`
                    tempFiles.push({ ...getDocumentDetail(key), previousUpload: true, fileName: props.viewApplication.files[key], file: fileResponse[key], filePreview })
                } else if (!_documentType) {
                    _documentType = key;
                }
            })
            setDocumentType(_documentType);
            setFiles(tempFiles);
		});
    }, [])

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
        await client.request(UPDATE_ADMIN_FILES_DATA, variables);
    }

    const fileUpload = async () => {
        setUploading(true);
        const formData = new FormData();
        files.forEach(({ value, file, previousUpload }) => {
            if (!previousUpload) {
                formData.append(value.split(/(?=[A-Z])/).join('_').toLowerCase(), file);
            }
        });
        const config = {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        }
        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        fetch(`${FILE_UPLOAD_URL}?applicationId=${props.viewApplication.applicationNumber}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setUploading(false);
                handleSaveApplication();
                setUploadResponse({ success: true, message: 'Documents Uploaded Successfully!' });
                console.log(result)
            })
            .catch(error => {
                setUploading(false);
                setUploadResponse({ success: false, message: 'Error in uploading documents, please try again later' });
                console.log('error', error)
            });

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
