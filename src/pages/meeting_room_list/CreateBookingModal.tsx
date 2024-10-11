/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-10-11 09:47:08
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-10-11 10:17:29
 * @FilePath: /meeting_room_booking_system_frontend/src/pages/meeting_room_list/CreateBookingModal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useForm } from "antd/es/form/Form";
import { MeetingRoomSearchResult } from "./MeetingRoomList";
import { DatePicker, Form, Input, message, Modal, TimePicker } from "antd";
import { createBooking } from "../../interface/interfaces";

interface CreateBookingModalProps {
  isOpen: boolean;
  handleClose: Function;
  meetingRoom: MeetingRoomSearchResult
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export interface CreateBooking {
    meetingRoomId: number;
    rangeStartDate: Date;
    rangeStartTime: Date;
    rangeEndDate: Date;
    rangeEndTime: Date;
    note: string;
}


export function CreateBookingModal(props: CreateBookingModalProps) {
    const [form] = useForm<CreateBooking>()
    const handleOk = async function() {
        const values = form.getFieldsValue();
        values.meetingRoomId = props.meetingRoom.id;
        const res = await createBooking(values);
        if (res.status === 200 || res.status === 201) {
            message.success('预定成功')
            form.resetFields()
            props.handleClose();
        } else {
            message.error(res.data.data)
        }
        
    }
    return <Modal title="创建预定" okText="确定" open={props.isOpen} onOk={handleOk} onCancel={() => props.handleClose()}>
        <Form {...layout} form={form} colon={false}>
            <Form.Item label="会议室名称" name="meetingRoomId">
                {props.meetingRoom.name}
            </Form.Item>
            <Form.Item label="预定开始日期" name="rangeStartDate" rules={[{required: true, message: '请选择预定开始日期'}]}>
                <DatePicker />
            </Form.Item>
            <Form.Item label="预定开始时间" name="rangeStartTime" rules={[{required: true, message: '请选择预定开始时间'}]}>
                <TimePicker />
            </Form.Item>
            <Form.Item label="预定结束日期" name="rangeEndDate" rules={[{required: true, message: '请选择预定结束日期'}]}>
                <DatePicker />
            </Form.Item>
            <Form.Item label="预定结束时间" name="rangeEndTime" rules={[{required: true, message: '请选择预定结束时间'}]}>
                <TimePicker />
            </Form.Item>
            <Form.Item label="备注" name='note'>
                <Input />
            </Form.Item>
        </Form>
    </Modal>    
}
