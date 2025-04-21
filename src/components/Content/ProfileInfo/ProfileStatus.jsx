import React, { useEffect, useState } from "react";

const ProfileStatus = React.memo(props => {

    const [editMode, setEditMode] = useState(true)

    const [status , setStatus] = useState('')

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const toggleEditMode = async () => {
        setEditMode(!editMode);
      
        if (!editMode) {
          try {
            await props.updateStatus(status);
          } catch (error) {
            console.error('Ошибка при обновлении статуса:', error);
            alert('Не удалось обновить статус. Попробуйте снова.');
          }
        }
      };

    const handleStatusChange = (e) => { 
        setStatus(e.target.value)
    }

    let content;

    if (editMode) {
        content = (
            <div>
                <span onDoubleClick={() => {setEditMode(false)}}>{status}</span>
            </div>
        )
    }
    else {
        content = (
            <div>
                <input autoFocus={true} value={status} onChange={handleStatusChange}/>
                <button onClick={toggleEditMode}>confirm</button>
            </div>
        )
    }

    return content

}
)




    export default ProfileStatus
