import { Outlet } from 'react-router';
import styles from './App.module.css';

function App() {
  return (
    <main className={styles.appShell}>
      <Outlet />
    </main>
  );
}

export default App;
