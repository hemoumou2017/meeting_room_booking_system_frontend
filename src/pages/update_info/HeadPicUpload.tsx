import { InboxOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import Dragger, { DraggerProps } from "antd/es/upload/Dragger";
import { presignedUrl } from "../../interface/interfaces";
import axios from "axios";

/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-10-08 16:37:08
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-10-15 16:40:07
 * @FilePath: /meeting_room_booking_system_frontend/src/pages/update_info/HeadPicUpload.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
interface HeadPicUploadProps {
    value?: string,
    onChange?: Function;
}
let onChange: Function;
const props: DraggerProps = {
    name: 'file',
    multiple: false,
    action: async (file) => {
        const res = await presignedUrl(file.name)
        return res.data.data
    },
    // 默认 Dragger 是用 FormData 的格式上传的，也就是 key value 的格式
    // minio 要求直接把文件放到 body 里
    // 所以要用 customRequest 自定义请求方式
    async customRequest(options) {
        const {onSuccess, file, action} = options
        const res = await axios.put(action, file)
        onSuccess!(res.data)
    },
    onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
            onChange('http://localhost:9000/meeting-room-booking-system/' + info.file.name);
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
}


const dragger = <Dragger {...props} >
    <p className="ant-upload-drag-icon">
        <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或拖拽文件到这个区域来上传</p>
</Dragger>

export function HeadPicUpload(props: HeadPicUploadProps) {
    console.log(props);
    onChange = props.onChange!;
    return props?.value ? <div>
        <img src={props.value} alt="头像" width="100" height="100"/>
        {dragger}
    </div> :
    <div>
        {dragger}
    </div>
}