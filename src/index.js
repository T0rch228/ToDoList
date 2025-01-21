import React from "react"
import * as ReactDOMClient from "react-dom/client"

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="bg-gray-50 w-80 h-96 text-black-50 mt-48 ml-96 rounded-md">
        <h3 className="ml-24 text-2xl">Список дел</h3>
        <form onSubmit={this.handleSubmit} className="mt-8">
          <label htmlFor="new-todo" className="ml-8">
            Что нужно сделать?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
            className="outline mt-2 ml-8"
          />
          <button className="bg-sky-500 rounded-full ml-4">
            Добавить
          </button>
        </form>
        <TodoList items={this.state.items} />
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    // Создаем состояние, чтобы отслеживать, какие элементы отмечены
    this.state = {
      checkedItems: {},
    };
  }

  // Метод для обработки изменения состояния checkbox
  handleCheckboxChange = (id) => {
    this.setState(prevState => ({
      checkedItems: {
        ...prevState.checkedItems,
        [id]: !prevState.checkedItems[id], // Инвертируем состояние
      },
    }));
  }

  render() {
    return (
      <ul className="ml-8 mt-8">
        {this.props.items.map(item => (
          <li key={item.id} style={{ textDecoration: this.state.checkedItems[item.id] ? 'line-through' : 'none' }}>
            {item.text}
            <input 
              type="checkbox" 
              checked={!!this.state.checkedItems[item.id]} 
              onChange={() => this.handleCheckboxChange(item.id)}
              className="ml-2 w-4 h-4"
            />
          </li>
        ))}
      </ul>
    );
  }
}

const app = ReactDOMClient.createRoot(document.getElementById('root'))

app.render(<TodoApp />)