/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-10-08 14:38:58
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-10-15 16:46:59
 * @FilePath: /nest学习/meeting_room_booking_system_frontend/src/pages/index/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Link, Outlet } from 'react-router-dom';
import './index.css'
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
export function Index() {
    const [headPic, setHeadPic] = useState()
    useEffect(() => {
        const userInfo = localStorage.getItem('user_info')
        if (userInfo) {
            const userInfoObj = JSON.parse(userInfo)
            setHeadPic(userInfoObj.headPic)
        }
    }, [])
    return <div id='index-container'>
        <div className='header'>
            <h1>会议室预定系统</h1>
            <Link to={'/update_info'}>
               {headPic ? 
                    <img src={headPic} width={40} height={40} className='icon' /> 
                    : <UserOutlined className="icon" />}
            </Link>
        </div>
        <div className='body'>
            <Outlet></Outlet>
        </div>
    </div>;
}