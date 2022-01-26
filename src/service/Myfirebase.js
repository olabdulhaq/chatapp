import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD_-wI553EfxUUJVLcF7MAt6Z31Gtcdtkc',
  authDomain: 'chatapp-b4fa6.firebaseapp.com',
  databaseURL: 'https://chatapp-b4fa6-default-rtdb.firebaseio.com',
  projectId: 'chatapp-b4fa6',
  storageBucket: 'chatapp-b4fa6.appspot.com',
  messagingSenderId: '701205197333',
  appId: '1:701205197333:web:9efcb04a5814e09232541c',
};

// firebase.firestore().settings({
//   timestampsInSnapshots: true,
// });
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
