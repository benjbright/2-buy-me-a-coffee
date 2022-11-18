const Header = ({ onClick, connected }) => {
  return (
    <nav>
      <div className="logo-section">
        <h2>expresso</h2>
        <ul className="menu-items">
          <li>Home</li>
          <li>Messages</li>
        </ul>
      </div>
      <button className="connect-btn" onClick={onClick}>
        {connected ? "Connected" : "Connect"}
      </button>
    </nav>
  )
}
export default Header
