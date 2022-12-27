import React, {Component} from "react";
// 클래스 컴포넌트
export default class App extends Component {
  state = {
    // 속성명 : 속성값
    // 할일 목록 Mock data
    todoData: [
      { id: 1, title: "할일 1", completed: false },
      { id: 2, title: "할일 2", completed: false },
      { id: 3, title: "할일 3", completed: false },
      { id: 4, title: "할일 4", completed: false }
    ],
    todoValue : "",
  };

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px, 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  };

  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration : completed ? "line-through" : "none"
    };
  };

  deleteClick = (id) => {
    // 클릭된 id와 다른 요소들만 걸러서 새로운 배열 생성
    const nowTodo = this.state.todoData.filter((item) => item.id !== id);
    // console.log("Click", nowTodo);
    this.setState({ todoData: nowTodo })
  };

  toggleClick = (id) => {
    //  map를 통해 this.state.todoData의 complete를 업데이트
    const updateTodo = this.state.todoData.map((item) => {
      if(item.id === id) {
        item.completed = !item.completed; 
      }
      return item;
    });
    this.setState({ todoData: updateTodo});
  };

  changeTodoValue = (event) => {
    // console.log(event.target.value);
    this.setState( {todoValue:event.target.value});
  };

  addTodoSubmit = (event) => {
    event.preventDefault();
    const addTodo = {
      id: Date.now(),
      title: this.state.todoValue,
      completed: false
    };
    // todoData : []
    this.setState({ todoData: [...this.state.todoData, addTodo] });
    this.setState({todoValue: ""});
  };

  
  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1> 할일 목록</h1>
          </div>

          {this.state.todoData.map( (item) => (
            <div style={this.getStyle(item.completed)} key={item.id}>
              <input 
                type="checkbox" 
                defaultChecked={item.completed} 
                onChange={() => this.toggleClick(item.id)} />
              {item.title}
              <button 
                style={this.btnStyle} 
                onClick={() => this.deleteClick(item.id)}> 
                X
              </button>
            </div>
          ))}

            <form style= { {dispaly: "flex"} } onSubmit={this.addTodoSubmit}>
              <input 
                style= { {flex: "10"}} 
                type= "text" 
                placeholder= "할 일을 입력하세요"
                value= {this.state.todoValue}
                onChange= {this.changeTodoValue}
              />
              <input 
                style= { {flex: "1"} }
                type= "submit"
              />
            </form>

        </div>  
      </div>        
    )
  }
}