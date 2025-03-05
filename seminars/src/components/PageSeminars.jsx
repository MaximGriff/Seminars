import { useState, useEffect } from 'react'
import CardSeminars from './CardSeminars'
function PageSeminars() {
    //Состояние для хранения семинаров
    const [seminars, setSeminars] = useState([])

    //функция для создания запроса без передачи данных
    const requestNoBody = (address, method) => {
        return (fetch(address, {
            method: method,
            headers: new Headers({ "Content-Type": "application/json" }),
            

        }))
    }

    async function getSeminars() {
        let address = 'http://localhost:3000/seminars/'

        const response = await requestNoBody(address, 'GET')
        if (response.status == 200) {
            const json = await response.json()
            setSeminars(json)
        }
    }

    //При загрузке компонента получаем все имеющиеся семинары
    useEffect(() => {
        getSeminars()
    }, [])

    

    return (
        <>
            <div style={{ 'textAlign': 'center', 'display': 'flex', 'flexDirection': 'column', 'alignItems':'center' }}>
                <h1>Семинары</h1>
                {seminars.map(item => (
                    <CardSeminars seminar={item} updateSeminars={getSeminars} />
                ))}
            </div>
            
        </>
    )
}
export default PageSeminars;