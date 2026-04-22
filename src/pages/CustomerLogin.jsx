import React, { useState } from 'react';
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
import { userCustomerLogin } from '../services/customerService';
import { setCredentials } from '../store/slices/authSlice';
import { PATHS } from '../routes/paths';

const CustomerLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        loginId: Yup.string().required('Customer ID or Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            loginId: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await userCustomerLogin({ loginId: values.loginId, password: values.password });
                if (response.success) {
                    dispatch(setCredentials({
                        user: response.data.user,
                        token: response.data.tokens.accessToken
                    }));
                    toast.success('Login Successful');
                    navigate('/customer-portal', { replace: true });
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
            <div className=" rounded-3xl shadow-2xl overflow-hidden max-w-3xl w-full flex flex-col md:flex-row min-h-[500px]">

                {/* Left Side - Image */}
                <div className="w-full md:w-1/2 relative ">
                    {/* Speech Bubble */}
                    <div className="absolute top-[5%] left-[5%] z-20 hidden md:block animate-bounce-slow">
                        <div className="relative bg-white border-3 border-black rounded-[2rem] p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] min-w-[280px]">
                            <h2 className="text-xl font-black text-center text-slate-800">{getGreeting()}</h2>
                            <p className="text-md font-bold text-center text-slate-600 mt-2">Hope you have a wonderful day!</p>
                            {/* Speech Bubble Arrow */}
                            <div className="absolute -bottom-4 left-12 w-8 h-8 bg-white border-b-3 border-r-3 border-black rotate-[45deg]"></div>
                        </div>
                    </div>

                    <img src={loginMascot} alt="" className="absolute bottom-[-5px] h-70 w-70 right-[-100px] z-10" />
                    <img
                        src={loginImage}
                        alt="Visual Lens"
                        className="absolute inset-0    h-full rounded-3xl object-cover opacity-80"
                    />
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#ffffffad]">
                    <div className="flex justify-center mb-10">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="Digi-Optics" className="h-10 object-contain" />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-black text-gray-800 tracking-tight">Customer Portal</h1>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Sign in to your account</p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <Input
                            label="Customer ID or Email"
                            name="loginId"
                            placeholder="Enter Customer ID or Email"
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
                                    className="text-gray-500 w-5 h-5 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            }
                        />

                        <Button type="submit" className="mt-4 shadow-lg max-w-[200px] mx-auto shadow-amber-500/30">
                            Customer Login
                        </Button>
                        <br />
                        <Link to={PATHS.CUSTOMER_FORGOT_PASSWORD} className="text-amber-500 text-left hover:underline">Forgot Password</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerLogin;
