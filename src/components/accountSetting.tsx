import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import MymoAvatar from './MymoAvatar';
import Dropzone from 'react-dropzone';
import { updateUserInfo } from '../store/actions/userLogin';
import compressImage from '../utils/compressImage';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { fNameEmptyText, lNameEmptyText, nameSpaceText } from '../utils/validation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      width: '600px',
      maxHeight: '75vh',
      borderRadius: '10px',
      outline: 'none',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3, 4, 5),
      '& h2': {
        fontSize: '28px',
        fontWeight: 500,
        color: theme.palette.primary.main,
      },
    },
    form: {
      width: '100%',
    },
    avatar: {
      width: '120px',
      height: '120px',
      marginLeft: '40px',
    },
    avatarWrap: {
      display: 'flex',
      margin: '10px 0',
    },
    dropZoneWrap: {
      marginRight: '50px',
    },
    dropZone: {
      border: 'dashed grey 3px',
      fontSize: '16px',
      padding: theme.spacing(4),
      display: 'flex',
      alignItems: 'center',
      height: '120px',
      borderRadius: '10px',
      textAlign: 'center',
    },
    error: {
      color: 'red',
      fontSize: '16px',
    },
    desc: {
      width: '100%',
      margin: theme.spacing(2, 0, 3),
    },
  }),
);

interface AccountSettingProps {
  fullName: string;
  avatarSrc: string;
  description: string;
}

const AccountSetting: React.FC<AccountSettingProps> = (props) => {
  const { fullName, avatarSrc, description } = props;
  const [avatar, setAvatar] = useState(avatarSrc);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [desc, setDesc] = useState(description);
  const [file, setFile] = useState(new File([], ''));
  const [hasFile, setHasFile] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const defaultFName = { value: fullName.split(' ')[0], error: false, helperText: '' };
  const defaultLName = { value: fullName.split(' ')[1], error: false, helperText: '' };
  const [fName, setFName] = useState(defaultFName);
  const [lName, setLName] = useState(defaultLName);

  const handleFNameOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFName = e.target.value;
    if (inputFName === '') {
      setFName({ value: inputFName, error: true, helperText: fNameEmptyText });
      return;
    }
    if (inputFName.indexOf(' ') !== -1) {
      setFName({ value: inputFName, error: true, helperText: nameSpaceText });
      return;
    }
    setFName({ value: inputFName, error: false, helperText: '' });
  };

  const handleLNameOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputLName = e.target.value;
    if (inputLName === '') {
      setLName({ value: inputLName, error: true, helperText: lNameEmptyText });
    }
    if (inputLName.indexOf(' ') !== -1) {
      setFName({ value: inputLName, error: true, helperText: nameSpaceText });
      return;
    }
    setLName({ value: inputLName, error: false, helperText: '' });
  };

  const handleDescOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };
  const handleDrop = (acceptedFiles: File[]) => {
    const imageFile = acceptedFiles[0];
    if (imageFile.type !== 'image/jpeg' && imageFile.type !== 'image/jpg') {
      setError(' * You should upload a jpg or jpeg file.');
      return;
    }
    setError('');

    const callback = (result: Blob) => {
      const objectURL = URL.createObjectURL(result);
      setAvatar(objectURL);
      setFile(imageFile);
      setHasFile(true);
    };
    compressImage(imageFile, 400, 400, callback);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    const fullName = `${fName.value} ${lName.value}`;
    formData.append('avatar', file);
    formData.append('name', fullName);
    formData.append('description', desc);
    setError('');
    dispatch(updateUserInfo(formData));
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleOpen}>
        Setting
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>Account setting</h2>
            <div className={classes.avatarWrap}>
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className={classes.dropZone}>Drag and drop your avatar here, or click to select files</div>
                    </div>
                  </section>
                )}
              </Dropzone>
              <MymoAvatar avatarSrc={avatar} fullName={fullName} className={classes.avatar} />
            </div>
            {error !== '' && <p className={classes.error}>{error}</p>}
            <form className={classes.form} noValidate method="post" onSubmit={handleSubmit}>
              <Grid container spacing={2} wrap="nowrap">
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    autoComplete="firstname"
                    name="firstname"
                    variant="outlined"
                    fullWidth
                    label="First Name"
                    autoFocus
                    value={fName.value}
                    error={fName.error}
                    helperText={fName.helperText}
                    onChange={handleFNameOnchange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    value={lName.value}
                    error={lName.error}
                    helperText={lName.helperText}
                    onChange={handleLNameOnchange}
                  />
                </Grid>
              </Grid>
              <TextField
                className={classes.desc}
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={desc}
                onChange={handleDescOnChange}
                variant="outlined"
              />

              <Button type="submit" fullWidth variant="contained" size="large" color="primary">
                UPDATE NOW
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AccountSetting;
