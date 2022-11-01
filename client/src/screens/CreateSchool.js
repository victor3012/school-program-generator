import { useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import { selecinputoptions } from '../mockdata';


export default function CreateSchool() {
    const [roomCategory, setRoomCategory] = useState('');

    return (
        <Form>
            <Input label='Name' />
            <SelectInput label='Room category'
                options={selecinputoptions}
                value={roomCategory}
                setValue={setRoomCategory}
                onChange={(newRoomCategory) => setRoomCategory(newRoomCategory)}
            />
        </Form>
    )
}