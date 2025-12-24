import React, { Component } from 'react';

export class Login extends Component {
  state = {
    username: '',
    password: '',
    message: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = () => {
    const { username, password } = this.state;
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.setState({ message: 'Вход успешен!', username:'', password:'' });
      // Можно вызвать функцию из props для обновления состояния магазина
      if (this.props.onLogin) this.props.onLogin(user);
    } else {
      this.setState({ message: 'Неверное имя или пароль!' });
    }
  };

  render() {
    const { username, password, message } = this.state;
    return (
      <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
        <h2>Вход</h2>
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
        <button onClick={this.handleLogin} style={{ padding: '5px 10px', marginTop: '10px' }}>Войти</button>
        {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>}
      </div>
    );
  }
}

export default Login;
