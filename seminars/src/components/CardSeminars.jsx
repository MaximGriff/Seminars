//Для отображения даннных используется библиотека элементов 'AntDesigner'
import { Card, Image, Popconfirm, message, Modal, Input, TimePicker, DatePicker } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import '@ant-design/v5-patch-for-react-19';
import { useState } from 'react'
import dayjs from 'dayjs';


const { TextArea } = Input;
const format = 'HH:mm';
const margin = {'marginBlock' : "10px"}
function CardSeminars(props) {

    const [selectedSeminar, setSelectedSeminar] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);

    const requestNoBody = (address, method) => {
        return (fetch(address, {
            method: method,
            headers: new Headers({ "Content-Type": "application/json" }),


        }))
    }
    //функция для создания запроса с передачей данных
    const request = (address, method, body) => {
        return (fetch(address, {
            method: method,
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify(body)

        }))
    }

    async function deleteSeminar(id){
        let address = 'http://localhost:3000/seminars/' + id

        const response = await requestNoBody(address, 'DELETE')
        if (response.status == 200) {
            console.log("Удалено")
            message.success("Семинар удален")
            props.updateSeminars()
        }
        else {
            message.error("Удаление не выполнено")
        }
    }

    const openEdit = (seminar) => {
        setSelectedSeminar(seminar)
        setIsModalOpen(true)
    }

    async function updateSeminar() {
        const address = 'http://localhost:3000/seminars/' + selectedSeminar.id

        
        const title = document.querySelector("#title").value
        const description = document.querySelector("#description").value 
        const date = document.querySelector("#date").value 
        const time = document.querySelector("#time").value 

        let obj = {
            title: title,
            description: description,
            date: date,
            time: time
        }

        const response = await request(address, 'PATCH', obj)
        if (response.status == 200) {
            message.success("Данные изменены")
            setIsModalOpen(false)
            props.updateSeminars()
        }
        else {
            message.error("Обновление семинара не выполнено")
        }
    }

    const actions = [
        <Popconfirm title="Удалить семинар?"
            onConfirm={() => deleteSeminar(props.seminar.id)}
            okText="Да"
            cancelText="Нет"
        >
            <DeleteOutlined key="delete" onClick={() => console.log(props.seminar)} />
        </Popconfirm>,
        <EditOutlined key="edit" onClick={() => openEdit(props.seminar)} />
    ]

    return (
        <>
            <Card title={props.seminar.title}
                
                style={{ 'width': '50%', "margin" : '20px' }}
                actions={actions}
                >
                <div style={{ 'display': 'flex' }}>
                    <Image
                        alt="Включите VPN для просмотра изображения"
                        src={props.seminar.photo}
                        width='300px'
                        heigth='300px' />
                    <div>
                        <p>{props.seminar.description}</p>
                        <h3>Дата: {props.seminar.date}</h3>
                        <h3>Время: {props.seminar.time}</h3>
                    </div>
                    
                </div>
                

            </Card>
            <Modal title="Редактирование семинара" open={isModalOpen} onOk={updateSeminar} onCancel={() => setIsModalOpen(false)} destroyOnClose={true}>
                <Input id="title" defaultValue={selectedSeminar.title} style={margin} />
                <TextArea id='description' defaultValue={selectedSeminar.description} style={margin} />
                <DatePicker id="date" defaultValue={dayjs(selectedSeminar.date, 'DD.MM.YYYY')} format='DD.MM.YYYY' style={margin} />
                <TimePicker id="time" defaultValue={dayjs(selectedSeminar.time, format)} format={format} style={margin} />
            </Modal>
        </>
    )
}
export default CardSeminars;