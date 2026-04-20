import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUser, setCredentials } from '../../store/slices/authSlice';
import { Icon } from '@iconify/react';
import logo from '../../assets/logo.png';
import { acceptTermsConditions } from '../../services/customerService';
import { toast } from 'react-toastify';
import GoBackButton from '../navigation/GoBackButton';

const CustomerLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const token = useSelector((state) => state.auth.token);

    const [showTermsModal, setShowTermsModal] = useState(false);
    const [termsAccepting, setTermsAccepting] = useState(false);

    // Check if T&C needs to be shown
    useEffect(() => {
        if (user && !user?.termsAndConditionsAccepted) {
            setShowTermsModal(true);
        }
    }, [user]);

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/customer-login', { replace: true });
    };

    const handleAcceptTerms = async () => {
        setTermsAccepting(true);
        try {
            const res = await acceptTermsConditions();
            if (res?.success) {
                toast.success('Terms & Conditions accepted successfully');
                // Update user in Redux so the modal won't show again
                dispatch(setCredentials({ user: { ...user, termsAndConditionsAccepted: true }, token }));
                setShowTermsModal(false);
            } else {
                toast.error(res?.message || 'Failed to accept terms');
            }
        } catch (err) {
            toast.error(err?.message || err?.error?.message || 'Something went wrong');
        } finally {
            setTermsAccepting(false);
        }
    };

    const handleDeclineTerms = () => {
        toast.info('You must accept the Terms & Conditions to continue.');
        handleLogout();
    };

    return (
        <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#fffdf8_0%,#fffaf0_16%,#f8fafc_44%,#f7fafc_100%)] font-sans">
            {/* Navbar */}
            <header className="sticky top-0 z-20 border-b border-amber-100/70 bg-white/85 backdrop-blur-xl">
                <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
                    <div className="flex min-w-0 items-center gap-3 md:gap-4">
                        <div className="rounded-xl bg-gradient-to-br from-white to-amber-50 p-2 shadow-[0_8px_18px_rgba(251,191,36,0.14)] ring-1 ring-amber-100">
                            <img src={logo} alt="DigiOptics" className="h-8 object-contain md:h-9" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-500">Customer Portal</div>
                            <div className="truncate text-sm font-semibold text-slate-900 md:text-lg">
                                {user?.shopName || user?.ownerName || 'Customer Portal'}
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-amber-700">
                                    {user?.customerCode || 'Customer'}
                                </span>
                                <span className="hidden md:inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">
                                    {user?.Department?.name || 'Portal Access'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4">
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-500 transition-all duration-300 hover:border-red-200 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200 md:px-5"
                        >
                            <Icon icon="mdi:logout" className="text-lg" />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="custom-scrollbar flex-1 overflow-y-auto px-4 pb-8 pt-4 md:px-6 md:pb-10 md:pt-5">
                <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4">
                    <div className="rounded-[1.4rem] border border-white/70 bg-white/80 px-4 py-3 shadow-[0_14px_34px_rgba(15,23,42,0.06)] backdrop-blur-md">
                        <GoBackButton />
                    </div>
                    <div className="rounded-[1.8rem] border border-amber-100/70 bg-white/92 p-4 shadow-[0_18px_48px_rgba(15,23,42,0.07)] md:p-6">
                        <Outlet />
                    </div>
                </div>
            </main>

            {/* Terms & Conditions Modal */}
            {showTermsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6 text-white">
                            <div className="flex items-center justify-center  gap-3">
                                <Icon icon="mdi:file-document-check-outline" className="text-3xl" />
                                <div>
                                    <h2 className="text-xl font-black tracking-tight">Terms & Conditions</h2>
                                    <p className="text-erp-accent/10 text-sm font-medium">Please review and accept to continue</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto px-8 py-6 text-sm text-gray-600 leading-relaxed space-y-4 custom-scrollbar">
                            <h3 className="text-base font-black text-gray-800">Digi-Optics Customer Agreement</h3>
                            <p>By accessing and using the Digi-Optics Customer Portal, you agree to be bound by the following terms and conditions. Please read them carefully.</p>

                            <h4 className="font-black text-gray-700 pt-2">1. Account Responsibility</h4>
                            <p>You are responsible for maintaining the confidentiality of your account credentials. Any activity performed under your account will be deemed as authorized by you. Notify us immediately of any unauthorized access.</p>

                            <h4 className="font-black text-gray-700 pt-2">2. Order & Payment Terms</h4>
                            <p>All orders placed through the portal are subject to acceptance and availability. Payment must be made within the agreed credit period. Failure to comply may result in account suspension or credit limit revision.</p>

                            <h4 className="font-black text-gray-700 pt-2">3. Pricing & Discount</h4>
                            <p>Prices are subject to change without prior notice. Discounts, if any, are applied as per the approved customer profile and cannot be combined with other offers unless explicitly stated.</p>

                            <h4 className="font-black text-gray-700 pt-2">4. Returns & Warranty</h4>
                            <p>Products may be returned only in accordance with our return policy. Warranty claims must be submitted within the stipulated period with proper documentation. Damaged goods during transit must be reported within 48 hours of delivery.</p>

                            <h4 className="font-black text-gray-700 pt-2">5. Intellectual Property</h4>
                            <p>All content, trademarks, and materials on the Digi-Optics portal are the property of Digi-Optics and its licensors. Unauthorized use, reproduction, or distribution is strictly prohibited.</p>

                            <h4 className="font-black text-gray-700 pt-2">6. Data Privacy</h4>
                            <p>We collect and process your data in accordance with applicable data protection laws. Your business information is kept confidential and will not be shared with third parties without consent, except as required by law.</p>

                            <h4 className="font-black text-gray-700 pt-2">7. Limitation of Liability</h4>
                            <p>Digi-Optics shall not be liable for indirect, incidental, or consequential damages arising from the use of this portal. Our total liability shall not exceed the value of the transaction in question.</p>

                            <h4 className="font-black text-gray-700 pt-2">8. Amendments</h4>
                            <p>Digi-Optics reserves the right to modify these terms at any time. Continued use of the portal after changes constitutes acceptance of the modified terms.</p>
                        </div>

                        {/* Footer Actions */}
                        <div className="border-t border-gray-100 px-8 py-5 flex items-center mx-auto justify-end gap-4 bg-gray-50/50">
                            <button
                                onClick={handleDeclineTerms}
                                className="px-6 py-2.5 rounded-full text-gray-500 hover:bg-gray-100 font-black text-xs uppercase tracking-widest transition-all duration-300 border border-gray-200"
                            >
                                Decline & Logout
                            </button>
                            <button
                                onClick={handleAcceptTerms}
                                disabled={termsAccepting}
                                className="px-8 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-amber-500/30 disabled:opacity-50"
                            >
                                {termsAccepting ? 'Accepting...' : 'I Accept'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerLayout;

