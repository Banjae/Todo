import React, { useCallback, useState } from "react";
import Form from "./components/Form";
import List from "./components/List";
// 클래스 컴포넌트

/* 
최초에 로컬에서 todoData를 읽어와서 
todoData 라는 useState를 초기화 해주어야 한다.
초기값을 로컬에서 불러와서 채워준다.
*/
let initTodo = localStorage.getItem("todoData");
// 삼항연산자를 이용해서 초기값이 없으면
// 빈배열 [] 로 초기화한다.
// 읽어온 데이터가 있으면 JSON.stringify() 저장한 파일을
// JSON.parse() 로 다시 객체화하여 사용한다.
initTodo = initTodo ? JSON.parse(initTodo) : [] ;

export default function App() {
  // console.log("APP Rendering...");
  const [todoData, setTodoData] = useState(initTodo);
  const [todoValue, setTodoValue] = useState("");

  const deleteClick = useCallback ((id) => {
    // 클릭된 id와 다른 요소들만 걸러서 새로운 배열 생성
    const nowTodo = todoData.filter((item) => item.id !== id);
    // console.log("Click", nowTodo);
    // 목록을 갱신한다
    setTodoData(nowTodo)
    // 로컬에 저장한다 (DB 예정)
    localStorage.setItem("todoData", JSON.stringify(nowTodo));
  },
  [todoData]
  );

  const addTodoSubmit = (event) => {
    event.preventDefault();

    // 공백 문자열 제거 추가
    let str = todoValue;
    str = str.replace(/^\s+|\s+$/gm, "");
    if (str.length === 0) {
      alert("내용을 입력하세요.");
      setTodoValue("");
      return;
    }

    const addTodo = {
      id: Date.now(),
      title: todoValue,
      completed: false
    };
    // todoData : []
    setTodoData([...todoData, addTodo]);
    // 로컬에 저장한다.(DB 예정)
    localStorage.setItem("todoData", JSON.stringify([...todoData, addTodo]));
    setTodoValue("");
  };

  const deleteAllClick = () => {
    setTodoData([]);
    // 자료를 지운다.(DB 초기화)
    localStorage.clear();
  }

  return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-5xl">
          <div className="flex justify-between mb-3">
            <h1> 할일 목록</h1>
            <button onClick={deleteAllClick}>핵폭탄</button>
          </div>

          <List todoData={todoData} setTodoData={setTodoData} deleteClick={deleteClick}/>

          <Form todoValue={todoValue} setTodoValue={setTodoValue} addTodoSubmit={addTodoSubmit} />

        </div>  
      </div>        
  )

}