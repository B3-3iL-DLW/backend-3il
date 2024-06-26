// src/app/register/page.tsx

"use client";
import React, {useEffect, useState} from 'react';
import RegisterForm from './form/RegisterForm';
import {useRouter} from 'next/navigation';
import Toast from "@/app/components/toasts";
import {register} from "@/app/register/services/registerService";
import {ApiResponse} from "@/app/api/apiService";
import {verifySession} from "@/app/lib/dal";

const RegisterPage = () => {
    const router = useRouter();

    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        const checkSession = async () => {
            const session = await verifySession();
            if (session) {
                router.push('/users');
            }
        };
        checkSession().then(r => r);
    }, [router]);

    const handleRegister = async (user: {
        email: string,
        password: string,
        firstname: string,
        lastname: string,
        classGroupId: number,
    }): Promise<ApiResponse> => {
        const response = await register(user);
        if (!response.ok) {
            setToastMessage('Échec de l\'inscription');
            setToastType('error');
            setShowToast(true);
        } else {
            setToastMessage('Inscription réussie !');
            setToastType('success');
            setShowToast(true);
            router.push('/login', {scroll: false});
        }
        return response;
    };


    const handleCloseToast = () => {
        setShowToast(false);
    }

    return (
        <>
            <div className="flex absolute justify-end py-4 px-4 w-auto"> {showToast &&
                <Toast message={toastMessage} type={toastType} onClose={handleCloseToast}/>}</div>
            <div className="h-screen flex">
                <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center">
                    <div className="bg-black opacity-20 inset-0 z-0"></div>
                    <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
                        <h1 className="text-white font-bold text-4xl font-sans">My3il</h1>
                        <p className="text-white mt-1">Un empoi du temps simpliste rien que pour toi</p>
                        <div className="flex justify-center lg:justify-start mt-6">
                            <a href="#"
                               className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">Qui
                                sommes-nous ?</a>
                        </div>
                    </div>
                </div>
                <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
                    <div className="w-full px-8 md:px-32 lg:px-24">
                        <RegisterForm onSubmit={handleRegister}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;