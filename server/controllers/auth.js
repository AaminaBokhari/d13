import { 
  signToken, 
  registerUser, 
  verifyUserEmail, 
  initiatePasswordReset, 
  resetUserPassword 
} from '../services/authService.js';
import User from '../models/User.js';
import sendEmail from '../utils/email.js';
import { catchAsync } from '../utils/catchAsync.js';

export const register = catchAsync(async (req, res) => {
  const { user, token, verificationUrl } = await registerUser(req.body);

  await sendEmail({
    email: user.email,
    subject: 'Please verify your email',
    message: `Click here to verify your email: ${verificationUrl}`
  });

  res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  if (!user.isVerified) {
    return res.status(401).json({ message: 'Please verify your email first' });
  }

  const token = signToken(user._id);

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

export const forgotPassword = catchAsync(async (req, res) => {
  const { user, resetUrl } = await initiatePasswordReset(req.body.email);

  await sendEmail({
    email: user.email,
    subject: 'Password Reset Request',
    message: `Forgot your password? Click here to reset: ${resetUrl}\nIf you didn't request this, please ignore.`
  });

  res.json({ message: 'Password reset token sent to email' });
});

export const resetPassword = catchAsync(async (req, res) => {
  const user = await resetUserPassword(req.params.token, req.body.password);
  const token = signToken(user._id);
  res.json({ token });
});

export const verifyEmail = catchAsync(async (req, res) => {
  await verifyUserEmail(req.params.token);
  res.json({ message: 'Email verified successfully' });
});