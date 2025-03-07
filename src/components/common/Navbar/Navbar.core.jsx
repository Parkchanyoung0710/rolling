import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <Link to="/">로고</Link>
      <Link to="/post">롤링페이퍼 만들기</Link>
    </nav>
  );
}

export default Navbar;
