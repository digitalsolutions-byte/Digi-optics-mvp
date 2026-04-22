import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Icon } from '@iconify/react';
import logo from '../assets/logo.png';
import loginImage from '../assets/login-image.png';
import loginMascot from '../assets/login-mascot.gif';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { loginUser } from '../services/authService';
import { setCredentials } from '../store/slices/authSlice';
import { PATHS } from '../routes/paths';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        loginId: Yup.string()
            .required('Email or Username is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            loginId: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await loginUser({ loginId: values.loginId, password: values.password });
                console.log('response', response)
                if (response.success) {
                    dispatch(setCredentials({
                        user: response.data.user,
                        token: response.data.tokens.accessToken,
                        refreshToken: response.data.tokens.refreshToken
                    }));
                    toast.success('Login Successful');
                    navigate(PATHS.WELCOME, { state: { from: 'login' } });
                } else {
                    toast.error(response.message || 'Login failed');
                }
            } catch (err) {
                toast.error(err.message || 'An error occurred during login');
            }
        },
    });

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning!';
        if (hour < 17) return 'Good Afternoon!';
        return 'Good Evening!';
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {/* Main Container Card */}
            <div className=" rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row min-h-[500px]">

                {/* Left Side - Image */}
                <div className="w-full md:w-1/2 relative ">
                    {/* Speech Bubble */}
                    <div className="absolute top-[5%] left-[5%] z-20 hidden md:block animate-bounce-slow">
                        <div className="relative bg-white border-3 border-black rounded-[2rem] p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] min-w-[280px]">
                            <h2 className="text-xl font-black text-center text-slate-800">{getGreeting()}</h2>
                            <p className="text-sm font-bold text-center text-slate-600 mt-2">Hope you have a wonderful day!</p>
                            {/* Speech Bubble Arrow */}
                            <div className="absolute -bottom-4 left-12 w-8 h-8 bg-white border-b-3 border-r-3 border-black rotate-[45deg]"></div>
                        </div>
                    </div>

                    <img src={loginMascot} alt="" className="absolute bottom-[-5px] h-70 w-70 right-0 z-10" />
                    <img
                        src={loginImage}
                        alt="Visual Lens"
                        className="absolute inset-0   w-full h-full rounded-3xl object-cover opacity-80"
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div> */}
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#ffffffad]">
                    <div className="flex justify-center mb-10">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="Digi-Optics" className="h-10 object-contain" />
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <Input
                            label="Email or Employee Name"
                            name="loginId"
                            placeholder="Enter Email or Employee Name"
                            value={formik.values.loginId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.loginId && formik.errors.loginId ? { message: formik.errors.loginId } : null}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && formik.errors.password ? { message: formik.errors.password } : null}
                            icon={
                                <Icon
                                    icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
                                    className="text-gray-500 w-5 h-5"
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            }
                        />

                        <Button type="submit" className="mt-4 shadow-lg max-w-[200px] mx-auto shadow-amber-500/30">
                            Login
                        </Button>
                        <br />
                        <Link to="/forgot-password" className="text-amber-500 text-left hover:underline">Forgot Password</Link>

                        {/* <p className="text-center text-gray-500 mt-4">
                            Don't have an account? <a href="/register" className="text-amber-500 hover:underline">Register</a>
                        </p> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
