import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [user, setUser] = useState<string | null>(null);
  const [postContent, setPostContent] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('access');
    if (storedToken) {
      const decoded = parseJwt(storedToken);
      setUser(decoded?.username || null); // Define o nome de usuário se estiver presente no token
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleAddUser = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      alert('User added successfully');
      setShowAddUserModal(false);
    } else {
      alert('Error adding user');
    }
  };

  const handleLogin = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
  
    const data = await response.json();
    console.log('Login response:', data);
  
    if (response.ok) {
      alert('Login successful');
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      console.log('Access token saved to localStorage:', data.access);
  
      const decoded = parseJwt(data.access);
      
      const userResponse = await fetch(`http://127.0.0.1:8000/api/user/${decoded.user_id}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.access}`, // Adiciona o token no cabeçalho Authorization
        },
      });
  
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData.username); // Atualiza o nome do usuário
      } else {
        alert('Error fetching user data');
      }
  
      setShowLoginModal(false);
    } else {
      alert('Login failed');
    }
  };  

  const handlePostSubmit = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      alert('You must be logged in to create a post');
      return;
    }

    const response = await fetch('http://127.0.0.1:8000/api/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ content: postContent }),
    });

    if (response.ok) {
      alert('Post created successfully');
      setPostContent(''); // Limpa o campo de post após criação
    } else {
      alert('Error creating post');
    }
  };

  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);
      console.log('Decoded JWT:', decoded);
      return decoded;
    } catch (e) {
      console.error('Error decoding JWT:', e);
      return null;
    }
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="left-bar">
          <a className="nav-item home" href="#home">Home</a>
          <a className="nav-item" href="#explore">Explore</a>
          <a className="nav-item" href="#notifications">Notifications</a>
          <a className="nav-item" href="#messages">Messages</a>
          <a className="nav-item" href="#grok">Grok</a>
          <a className="nav-item" href="#bookmarks">Bookmarks</a>
          <a className="nav-item" href="#jobs">Jobs</a>
          <a className="nav-item" href="#communities">Communities</a>
          <a className="nav-item" href="#premium">Premium</a>
          <a className="nav-item" href="#verified">Verified Orgs</a>
          <a className="nav-item" href="#profile">Profile</a>
          <a className="nav-item" href="#more">More</a>
          <button className="bt-post" type="button" onClick={() => setShowAddUserModal(true)}>Post</button>
          {user && (
            <div className="user-info">
              <img
                src="https://i.pravatar.cc/40?img=5"
                alt="User Avatar"
              />
              <span>{user}</span>
              <button onClick={() => {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                setUser(null);
              }}>Logout</button>
            </div>
          )}
        </div>
        <div className="feed-area">
          <div className="select-view">
            <h1>For you</h1>
            <h1>Following</h1>
          </div>
          <div className="create-post">
            <textarea
              value={postContent}
              onChange={handlePostChange}
              placeholder="What's happening?"
            />
            <div className="send-post">
              <button onClick={handlePostSubmit}>Post</button>
            </div>
          </div>
          <div className="post">
            <div className="photo-perfil">
              <img src="" alt="logo perfil" />
            </div>
            <div className="post-content">
              <p><strong>@NetflixBrasil</strong> · 4h</p>
              <p>nós?</p>
              <img src="/path/to/your/image.png" alt="Post content" />
              <div className="post-actions">
                <span>50</span>
                <span>559</span>
                <span>2.5k</span>
                <span>85k</span>
              </div>
            </div>
          </div>
        </div>
        <div className="rigth-bar">
          <input
            className="search-rigth-bar"
            type="text"
            placeholder="Search"
          />
          <div className='subscribe-premium'>
            <h1>Subscribe to Premium</h1>
            <p>Subscribe to unlock new feature and if eligible, receive a share of revenue</p>
            <button className="bt-sub-premium" type="button">Subscribe</button>
          </div>

          <div className="happening">
            <h1>What's happening</h1>
            <div className="perfils-post-by-category">
              <h3 className="category">category</h3>
              <h2>Perfil name</h2>
            </div>
            <a href="">Show more</a>
          </div>

          <div className="who-to-follow">
            <h1>Who to follow</h1>
            <div className="perfil-to-follow">
              <img src="" alt="perfil-photo" />
              <div>
                <h1>Perfil Name</h1>
                <h2>@Perfil</h2>
              </div>
              <button className="bt-follow" type="submit">Follow</button>
            </div>
            <a href="">Show more</a>
          </div>

          <button className="bt-add-user" onClick={() => setShowAddUserModal(true)}>
            Add New User
          </button>

          {user ? (
            <div>
              <span>Olá, {user}!</span>
              <button className="bt-logout" onClick={() => {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                setUser(null);
              }}>
                Logout
              </button>
            </div>
          ) : (
            <button className="bt-login" onClick={() => setShowLoginModal(true)}>
              Login
            </button>
          )}
        </div>
      </div>

      {showAddUserModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New User</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleInputChange}
            />
            <button onClick={handleAddUser}>Create User</button>
            <button onClick={() => setShowAddUserModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Login</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={() => setShowLoginModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
