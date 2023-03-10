import React, { useState } from 'react'

const ListItem = React.memo(({ item, todoData, setTodoData, deleteClick }) => {
  // console.log("ListItem Rendering");

  // 현재 편집 중인지 아닌지를 관리하는 state 생성
  // isEditing false => 목록 보여짐
  // isEditing true  => 편집 보여짐
  const [isEditing, setIsEditing] = useState(false);
  // 편집창 초기값은 타이틀이 먼저 있어야함
  const [editedTitle, setEditedTitle] = useState(item.title);
  // const deleteClick = (id) => {
  //   // 클릭된 id와 다른 요소들만 걸러서 새로운 배열 생성
  //   const nowTodo = todoData.filter((item) => item.id !== id);
  //   // console.log("Click", nowTodo);
  //   setTodoData(nowTodo)
  // };
  
  const toggleClick = (id) => {
    //  map를 통해 this.state.todoData의 complete를 업데이트
    const updateTodo = todoData.map((item) => {
      if(item.id === id) {
        item.completed = !item.completed; 
      }
      return item;
    });
    setTodoData(updateTodo);
    // 로컬에 저장한다.(DB 예정)
    localStorage.setItem("todoData", JSON.stringify(updateTodo));
  };

  const editChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const todoId = item.id;
  const updateTitle = () => {
    
    // 공백 문자열 제거 추가
    let str = editedTitle;
    str = str.replace(/^\s+|\s+$/gm, "");
    if (str.length === 0) {
      alert("할 일을 입력하세요.");
      setEditedTitle("");
      return;
    }    
    
    let tempTodo = todoData.map((item) => {
      // 모든 todoData 중에 현재 ID와 같다면
      if(item.id === todoId) {
        // 타이틀 글자를 수정
        item.title = editedTitle;
      }
      return item;
    });
    // 데이터 갱신
    setTodoData(tempTodo);
    // 로컬에 저장한다.(DB 예정)
    localStorage.setItem("todoData", JSON.stringify(tempTodo));    
    // 목록창으로 이동
    setIsEditing(false);
  };

  if(isEditing) {
    return (
      <>
        <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded">
          <div className="items-center">
            <input 
              type= "text" 
              className= "w-full px-3 py-2 mr-4 text-gray-500 bg-white border rounded"
              value={editedTitle} 
              onChange={editChange} 
            />
          </div>
          <div className="items-center">
            <button
              className="px-4 py-2" 
              onClick={updateTitle}
            >
              Update
            </button>
            <button
              className="px-4 py-2"
              onClick={() => setIsEditing(false)}
            > 
              Close
            </button>
          </div>
        </div>      
      </>
    )
  } else {
    return (
      <>
        <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded">
          <div className="items-center">
            <input 
              type="checkbox" 
              defaultChecked={item.completed} 
              onChange={() => toggleClick(item.id)} 
            />
            {" "}
            <span className={item.completed ? "line-through" : "none"}>
              {item.title}
            </span>
          </div>
          <div className="items-center">
            <button
              className="px-4 py-2" 
              onClick={() => { 
                setIsEditing(true);
                setEditedTitle(item.title);
              }}
            >
              Edit
            </button>
            <button
              className="px-4 py-2" 
              onClick={() => deleteClick(item.id)}
            > 
              X
            </button>
          </div>
        </div>      
      </>
    )
  }

})

export default ListItem