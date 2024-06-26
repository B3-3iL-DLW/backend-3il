// src/app/login/form/LoginForm.tsx

import React from 'react';
import InputField from '../../components/inputs';
import Button from '../../components/buttons';
import useLoginForm from '../hooks/useLoginForm';

interface LoginFormProps {
    onSubmit: (credentials: { email: string; password: string }) => void;
    connectionError: boolean;
}

const LoginForm = ({onSubmit, connectionError}: LoginFormProps) => {
    const {email, setEmail, password, setPassword, emailError, passwordError, handleSubmit} = useLoginForm(onSubmit);

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-2xl p-5 text-black">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Bienvenue !</h1>
            <p className="text-sm font-normal text-gray-600 mb-8">Connecte-toi pour accéder à ton emploi du temps</p>
            <InputField
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                error={emailError}
            />
            <InputField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                error={passwordError}
            />
            {connectionError && <p className="text-red-500">Identifiants incorrect</p>}
            <Button type="submit"
                    className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                Login
            </Button>
            <div className="flex justify-between mt-4">
                <span
                    className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Mot de passe oublié ?</span>
                <a href="#"
                   className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Tu
                    n'as pas encore de compte ?</a>
            </div>
        </form>
    );
};

export default LoginForm;