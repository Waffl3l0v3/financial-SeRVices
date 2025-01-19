const Footer = () => {
  return (
    <footer
      className="d-flex flex-wrap mb-0 justify-content-between align-items-center py-3 my-4 border-top"
      style={{ backgroundColor: '#008080' }}
    >
      {/* Footer text with company information */}
      <p className="col-md-4 mb-0 text-light ms-3" style={{ fontFamily: 'Montserrat' }}>
        <i>© 2025 Financial Services, Inc</i>
      </p>

      {/* Navigation links for footer, such as Home, Stock Data, etc. */}
      <ul className="nav col-md-4 justify-content-end" style={{ fontFamily: 'Montserrat' }}>
        <li className="nav-item">
          <a href="/" className="nav-link px-2 text-light">Home</a>
        </li>
        <li className="nav-item">
          <a href="/stockdata" className="nav-link px-2 text-light">Stock Data</a>
        </li>
        <li className="nav-item">
          <a href="/chatbot" className="nav-link px-2 text-light">Chatbot</a>
        </li>
        <li className="nav-item">
          <a href="/resources" className="nav-link px-2 text-light">Resources</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
