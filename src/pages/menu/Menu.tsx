/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-10-10 15:10:20
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-10-10 15:20:41
 * @FilePath: /meeting_room_booking_system_frontend/src/pages/menu/Menu.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Menu as AntdMenu, MenuProps } from "antd"
import { MenuClickEventHandler } from "rc-menu/lib/interface"
import { Outlet, useLocation } from "react-router-dom"
import { router } from '../..'
import './menu.css'
const items: MenuProps['items'] = [
    {
        key: '1',
        label: "会议室列表"
    },
    {
        key: '2',
        label: "预定历史"
    }
]
const handleMenuItemClick: MenuClickEventHandler = (info: any) => {
    let path = '';
    switch(info.key) {
        case '1':
            path = '/meeting_room_list';
            break;
        case '2':
            path = '/booking_history';
            break;              
    }
    router.navigate(path);
}
export function Menu() {
    const location = useLocation()
    function getSelectedKeys() {
        if(location.pathname === '/meeting_room_list') {
            return ['1']
        } else if(location.pathname === '/booking_history') {
            return ['2']
        } else {
            return ['1']
        }
    }
    return <div id='menu-container'>
        <div className="menu-area">
            <AntdMenu 
                items={items} 
                selectedKeys={getSelectedKeys()} 
                onClick={handleMenuItemClick} 
            /> 
        </div>
        <div className="content-area">
            <Outlet></Outlet>
        </div>
    </div>
}