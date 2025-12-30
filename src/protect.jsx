import React,{useState,useEffect, use} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function Protected({children,authentication=true}) {
    const navigate=useNavigate();
    const [loder,setLoder]=useState(true);
    const authStatus = useSelector((state)=>state.auth.status);

    useEffect(()=>{
        if(authentication && !authStatus){
            navigate('/login');
        }else if(!authentication && authStatus){
            navigate('/');
        }
        setLoder(false)
    },[authStatus , navigate,authentication ])


    return loder ? <h2>loading</h2> : children
}
