import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Categories from "./Components/Categories";
import Items from "./Components/Items";
import ShowFullitem from "./Components/ShowFullitem";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        { id: 1, title: "Cute", img: 'dd9038413b40b181cba30941498e7c6e.jpg', desc: 'Cip Cip Cücələrim.', category: 'Chairs', price: '0.01' },
        { id: 2, title: "Ночной кошмар", img: '461923645_1031233251798457_2172682959125999006_n.jpg', desc: 'Yeah men.', category: 'Sofa', price: '69' },
        { id: 3, title: "italy -> old money", img: '506004264_731367379446911_6715262197351858455_n.jpg', desc: 'Yeah men.', category: 'tables', price: '1000000000' },
        { id: 4, title: "Michele Morrone", img: '77d54bc4a57fc932b8bdf8f2ae0b587e.jpg', desc: 'Yeah men.', category: 'Chairs', price: '1' }
      ],
      ShowFullitem: false,
      fullItem: {},
      user: JSON.parse(localStorage.getItem('currentUser')) || null,
      regUsername: '',
      regPassword: '',
      regMessage: '',
      loginUsername: '',
      loginPassword: '',
      loginMessage: ''
    };

    this.state.currentItems = this.state.items;

    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // Регистрация
  handleRegister = () => {
    const { regUsername, regPassword } = this.state;
    if (!regUsername || !regPassword) {
      this.setState({ regMessage: 'Anun u parol!' });
      return;
    }
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === regUsername)) {
      this.setState({ regMessage: 'uje goyutyun uni!' });
      return;
    }
    users.push({ username: regUsername, password: regPassword });
    localStorage.setItem('users', JSON.stringify(users));
    this.setState({ regMessage: 'Respect!', regUsername:'', regPassword:'' });
  };

  // Вход
  handleLogin = () => {
    const { loginUsername, loginPassword } = this.state;
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === loginUsername && u.password === loginPassword);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.setState({ user, loginMessage:'', loginUsername:'', loginPassword:'' });
    } else {
      this.setState({ loginMessage: 'tazvic gri!' });
    }
  };

  handleLogout() {
    localStorage.removeItem('currentUser');
    this.setState({ user: null });
  }

  // Магазин
  onShowItem(item) {
    this.setState({ fullItem: item, ShowFullitem: !this.state.ShowFullitem });
  }

  chooseCategory(category) {
    if(category === 'all') {
      this.setState({ currentItems: this.state.items });
      return;
    }
    this.setState({ currentItems: this.state.items.filter(el => el.category === category) });
  }

  deleteOrder(id) {
    this.setState({ orders: this.state.orders.filter(el => el.id !== id) });
  }

  addToOrder(item) {
    let isInArray = false;
    this.state.orders.forEach(el => { if(el.id === item.id) isInArray = true; });
    if(!isInArray) this.setState({ orders: [...this.state.orders, item] });
  }

  render() {
    const {
      user, regUsername, regPassword, regMessage,
      loginUsername, loginPassword, loginMessage
    } = this.state;

    // Супер стиль с сияющим белым
    const cardStyle = {
      maxWidth: '380px',
      margin: '50px auto',
      padding: '40px',
      borderRadius: '20px',
      textAlign: 'center',
      background: 'radial-gradient(circle at top, #0f0c29, #302b63, #24243e)',
      boxShadow: '0 0 25px #ffffff, 0 0 50px #ffffff, 0 0 75px #ffffff inset',
      color: '#fff',
      fontFamily: '"Orbitron", sans-serif',
      border: '2px solid #ffffff',
      position: 'relative',
      overflow: 'hidden'
    };

    const inputStyle = {
      display: 'block',
      width: '85%',
      margin: '15px auto',
      padding: '12px',
      borderRadius: '12px',
      border: '2px solid #ffffff',
      background: '#1a1a2e',
      color: '#fff',
      fontSize: '16px',
      outline: 'none',
      boxShadow: '0 0 10px #ffffff',
      transition: '0.3s'
    };

    const buttonStyle = {
      marginTop: '20px',
      padding: '12px 30px',
      borderRadius: '15px',
      border: 'none',
      background: 'linear-gradient(45deg, #ffffff, #ccccff)',
      color: '#000',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      textTransform: 'uppercase',
      boxShadow: '0 0 15px #ffffff, 0 0 25px #ccccff inset',
      transition: '0.3s',
    };

    const messageStyle = {
      marginTop: '15px',
      fontWeight: 'bold',
      color: '#00ffff',
      textShadow: '0 0 5px #00ffff, 0 0 10px #00ffff'
    };

    if(!user) {
      return (
        <div style={{ textAlign: 'center', background: '#8f8f8fff', minHeight: '100vh', paddingTop: '20px' }}>
          <h1 style={{ color:'#ffffff', textShadow:'0 0 10px #ffffff, 0 0 20px #ccccff', fontFamily:'"Orbitron", sans-serif' }}> Welcome </h1>
          {/* Регистрация */}
          <div style={cardStyle}>
            <h2 style={{color:'#ffffff', textShadow:'0 0 5px #ffffff'}}>Registration</h2>
            <input style={inputStyle} type="text" placeholder="Name" value={regUsername} onChange={e => this.setState({regUsername:e.target.value})} />
            <input style={inputStyle} type="password" placeholder="Password" value={regPassword} onChange={e => this.setState({regPassword:e.target.value})} />
            <button style={buttonStyle} onClick={this.handleRegister}>Registration</button>
            {regMessage && <p style={messageStyle}>{regMessage}</p>}
          </div>
          {/* Вход */}
          <div style={cardStyle}>
            <h2 style={{color:'#ffffff', textShadow:'0 0 5px #ffffff'}}>Sign in</h2>
            <input style={inputStyle} type="text" placeholder="Name" value={loginUsername} onChange={e => this.setState({loginUsername:e.target.value})} />
            <input style={inputStyle} type="password" placeholder="Password" value={loginPassword} onChange={e => this.setState({loginPassword:e.target.value})} />
            <button style={buttonStyle} onClick={this.handleLogin}>Sign in</button>
            {loginMessage && <p style={messageStyle}>{loginMessage}</p>}
          </div>
        </div>
      );
    }

    return (
      <div className="wrapper">
        <Header orders={this.state.orders} onDelete={this.deleteOrder} />
        <button onClick={this.handleLogout} style={{ margin: '10px', padding: '5px 10px', background:'#ffffff', color:'#000', border:'none', borderRadius:'8px', cursor:'pointer', boxShadow:'0 0 10px #ffffff' }}>Выйти</button>
        <Categories chooseCategory={this.chooseCategory} />
        <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder} />
        {this.state.ShowFullitem && <ShowFullitem onAdd={this.addToOrder} onShowItem={this.onShowItem} item={this.state.fullItem} />}
        <Footer />
      </div>
    );
  }
}

export default App;
