import React, { Component } from 'react';

export class Register extends Component {
  state = {
    username: '',
    password: '',
    message: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegister = () => {
    const { username, password } = this.state;

    if (!username || !password) {
      this.setState({ message: 'Введите имя и пароль!' });
      return;
    }

    // Получаем существующих пользователей из localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Проверка на существующего пользователя
    if (users.find(u => u.username === username)) {
      this.setState({ message: 'Пользователь уже существует!' });
      return;
    }

    // Добавляем нового пользователя
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    this.setState({ message: 'Регистрация успешна!', username:'', password:'' });
  };

  render() {
    const { username, password, message } = this.state;
    return (
      <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
        <h2>Регистрация</h2>
        <input
          type="text"
          placeholder="Имя"
          name="username"
          value={username}
          onChange={this.handleChange}
          style={{ display: 'block', margin: '10px auto', width: '100%', padding: '5px' }}
        />
        <input
          type="password"
          placeholder="Пароль"
          name="password"
          value={password}
          onChange={this.handleChange}
          style={{ display: 'block', margin: '10px auto', width: '100%', padding: '5px' }}
        />
        <button onClick={this.handleRegister} style={{ padding: '5px 10px', marginTop: '10px' }}>Зарегистрироваться</button>
        {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>}
      </div>
    );
  }
}

export default Register;
