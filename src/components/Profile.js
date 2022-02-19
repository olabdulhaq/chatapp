import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdAdd } from 'react-icons/md';
import { auth, db, storage } from '../service/Myfirebase';

const Profile = () => {
  const [img, setImg] = useState('');
  const [user, setUser] = useState();
  // const [loading, setLoading] = useState(true);
  // const { currentUser } = getAuth();

  useEffect(() => {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });

          setImg('');
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
    }
  }, [img]);

  // const deletePhoto = async () => {
  //   try {
  //     const confirm = window.confirm('Delete avater?');
  //     if (confirm) {
  //       await deleteObject(ref(storage, user.avatarPath));

  //       await updateDoc(doc(db, 'users', auth.currentUser.uid), {
  //         avatar: '',
  //         avatarPath: '',
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return user ? (
    <div className="w-2/4 h-2/4 p-5 my-20 mx-auto border border-gray-400 rounded-md">
      <h2 className="text-center">{user.name}</h2>
      <div className="flex items-center">
        <div className="rounded-full border border-gray-200 p-1 w-32 h-32 flex items-center justify-center">
          <img
            src={user.avatar}
            alt="user"
            className="w-full h-full rounded-full"
          />
          {/* <MdAddAPhoto style={{ color: 'darkgray', fontSize: '23px' }} /> */}
        </div>
        <div className="ml-10 flex flex-col">
          <button className="py-2 px-6 text-white rounded-md bg-purple-primary mb-6 hover:scale-105 active:bg-purple-secondary">
            <label className="flex items-center justify-center" htmlFor="photo">
              <MdAdd /> Add
            </label>
            {/* {user.avatar ? } */}
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="photo"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </button>
          {user.avatar ? (
            <button
              // onClick={deletePhoto}
              className="py-2 px-6 text-white flex items-center justify-center rounded-md bg-red-700 hover:scale-105 active:bg-red-600">
              <MdDelete /> Remove
            </button>
          ) : null}
        </div>
      </div>
    </div>
  ) : null;
};

export default Profile;
