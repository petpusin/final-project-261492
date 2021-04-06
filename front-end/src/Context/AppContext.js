import React, { useState } from 'react'

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {

    const [AuthLogin, setAuthLogin] = useState(false)
    // const [database, setDatabase] = useState({
    //     username: 'cust01',
    //     password: '123456',
    //     firstname: 'ใจดี',
    //     lastname: 'อาหาร',
    //     role: 'customer',
    //     gender: 'male',
    //     age: '25',
    //     career: 'ฟรีแลนซ์',
    //     careerDetail: '',
    //     phonenumber: '0999999999',
    //     email: 'cust@emailcom',
    // })
    const [database, setDatabase] = useState({
        username: 'rest',
        password: '123456',
        firstname: 'ใจดี',
        lastname: 'อาหาร',
        role: 'restaurant',
        gender: 'male',
        age: '25',
        phonenumber: '0999999999',
        email: 'cust@emailcom',
        line: 'rest001',
    })
    const [restaurant, setRestaurant] = useState({
        restaurantName: 'ข้าวมันไก่',
        address: '199/99 ซ.2',
        road: '',
        subdistrict: '',
        amphoe: 'เมือง',
        province: 'เชียงใหม่',
        postalcode: '50200',
        website: 'chicken@website.com',
    })
    const [user, setUser] = useState({
        username: '',
        password: '',
    })


    return <AppContext.Provider value={{ AuthLogin, setAuthLogin, database, setDatabase, user, setUser, restaurant, setRestaurant }}>{children}</AppContext.Provider>
};

export default AppContext