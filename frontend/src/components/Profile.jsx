import React from 'react'
import { useNavigate } from 'react-router-dom';
import {api} from "../utils/Api"


function Profile() {
    const navigate = useNavigate()
    const userEmail = localStorage.getItem('userEmail')
    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (err) {
            console.error(err);
        }
        localStorage.removeItem("token");
        localStorage.removeItem('userEmail')
        navigate('/')
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 flex items-center gap-3 flex-col">
            <div className="flex-1">
                <p className="text-sm text-gray-600">Hi, <span className="font-semibold text-gray-900">{userEmail}</span></p>
            </div>
            <button
                onClick={() => { logout() }}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200">
                Log out
            </button>
        </div>
    )
}

export default Profile