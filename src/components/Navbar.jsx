import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; 
import { useAuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { usuario } = useAuthContext();

  
  return(
    <nav>
      <ul className={styles.lista}>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>Inicio</Link>
          <Link to="/tecnologia" className={styles.link}>Tecnologia</Link>
          <Link to="/moda" className={styles.link}>Moda</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

