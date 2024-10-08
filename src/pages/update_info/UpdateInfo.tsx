/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-10-08 15:24:22
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-10-08 16:45:15
 * @FilePath: /meeting_room_booking_system_frontend/src/pages/update_info/UpdateInfo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useCallback, useEffect } from 'react';
import './update_info.css';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, updateInfo, updateUserInfoCaptcha } from '../../interface/interfaces';
import { constants } from 'buffer';
import { HeadPicUpload } from './HeadPicUpload';

export interface UserInfo {
    headPic: string;
    nickName: string;
    email: string;
    captcha: string;
}

const layout1 = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

export function UpdateInfo() {
    const [form] = useForm();
    const navigate = useNavigate();

    const onFinish = useCallback(async (values: UserInfo) => {
        const res = await updateInfo(values);
        if (res.status === 201 || res.status === 200) {
            const {message: msg, data} = res.data
            if (msg === 'success') {
                message.success('用户信息更新成功');
            } else {
                message.error(msg);
            }
        } else {
            message.error('系统繁忙，请稍后再试');
        }
    }, []);

    const sendCaptcha = useCallback(async function () {
        const res = await updateUserInfoCaptcha();
        if(res.status === 201 || res.status === 200) {
            message.success(res.data.data);
        } else {
            message.error('系统繁忙，请稍后再试');
        }
    }, []);

    useEffect(() => {
        async function query() {
            const res = await getUserInfo();
            const {data} = res.data
            console.log(data);
            if (res.status === 200 || res.status === 201) {
                // const data = await res.json();
                form.setFieldsValue(data);
            } else {
                message.error('获取用户信息失败');
            }
        }
        query();
    }, []);

    return <div id="updateInfo-container">
        <Form
            form={form}
            {...layout1}
            onFinish={onFinish}
            colon={false}
            autoComplete="off"
        >
            <Form.Item
                label="头像"
                name="headPic"
                rules={[
                    { required: true, message: '请输入头像!' },
                ]}
            >
                <HeadPicUpload></HeadPicUpload>
            </Form.Item>

            <Form.Item
                label="昵称"
                name="nickName"
                rules={[
                    { required: true, message: '请输入昵称!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="邮箱"
                name="email"
                rules={[
                    { required: true, message: '请输入邮箱!' },
                    { type: "email", message: '请输入合法邮箱地址!'}
                ]}
            >
                <Input disabled />
            </Form.Item>

            <div className='captcha-wrapper'>
                <Form.Item
                    label="验证码"
                    name="captcha"
                    rules={[{ required: true, message: '请输入验证码!' }]}
                >
                    <Input />
                </Form.Item>
                <Button type="primary" onClick={sendCaptcha}>发送验证码</Button>
            </div>

            <Form.Item
                {...layout1}
                label=" "
            >
                <Button className='btn' type="primary" htmlType="submit">
                    修改
                </Button>
            </Form.Item>
        </Form>
    </div>   
}
