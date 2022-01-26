import React, {useState} from 'react'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core'
import {GoogleLogin} from 'react-google-login'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {AUTH} from '../../constants/actionTypes'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Icon from './icon'
import useStyles from './styles'
import Input from './Input'
import {signin, signup} from '../../actions/auth'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Auth = () => {
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = React.useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleShowPassword = () => setShowPassword(prev => !prev)
  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSubmit = e => {
    e.preventDefault()

    // console.log(formData)
    if (isSignUp) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  }
  const switchMode = () => {
    setIsSignUp(!isSignUp)
    setShowPassword(false)
  }

  const googleSuccess = async res => {
    const data = {result: res?.profileObj, token: res?.tokenId}

    console.log({res})
    try {
      // await localStorage.setItem('profile', JSON.stringify(data))

      dispatch({type: AUTH, data})
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const googleFailure = () => {
    console.log('Google Sign In was unsuccesful. Try Again later')
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type={'password'}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId="14479891392-3tmmn0c0mvfh3nokrgms93u9djnn43np.apps.googleusercontent.com"
            render={renderProps => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? 'Already have an account? Sing In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
