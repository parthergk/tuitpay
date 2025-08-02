"use client"
import { IUser } from '@repo/types';
import React, { createContext, FC, ReactNode, useState } from 'react';

interface UserDetailContextType {
    userDetail: IUser | undefined;
    setUserDetail: (userDetail: IUser | undefined) => void;
}

export const ProfileDetailContext = createContext<UserDetailContextType>({
    userDetail: undefined,
    setUserDetail: () => {},
});

const UserProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [userDetail, setUserDetail] = useState<IUser | undefined>(undefined);
    
    return (
        <ProfileDetailContext.Provider value={{ userDetail, setUserDetail }}>
            {children}
        </ProfileDetailContext.Provider>
    );
};

export default UserProfileProvider;


export const useUserProfile = () => {
    const context = React.useContext(ProfileDetailContext);
    if (!context) {
        throw new Error("useUserProfile must be used within a UserProfileProvider");
    }
    return context;
};